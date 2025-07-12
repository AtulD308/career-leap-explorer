
import { useState, useCallback } from 'react';
import { Upload, FileText, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { extractTextFromFile, validateResumeFile, ExtractedResumeData } from '@/utils/fileExtraction';

interface ResumeUploadProps {
  onUpload: (resumeData: ExtractedResumeData) => void;
  isAnalyzing?: boolean;
}

const ResumeUpload = ({ onUpload, isAnalyzing = false }: ResumeUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [extracting, setExtracting] = useState(false);
  const { toast } = useToast();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const validation = validateResumeFile(file);
      if (validation.valid) {
        setSelectedFile(file);
      } else {
        toast({
          title: "Invalid file",
          description: validation.error,
          variant: "destructive"
        });
      }
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validation = validateResumeFile(file);
      if (validation.valid) {
        setSelectedFile(file);
      } else {
        toast({
          title: "Invalid file",
          description: validation.error,
          variant: "destructive"
        });
      }
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setExtracting(true);
    try {
      const extractedData = await extractTextFromFile(selectedFile);
      onUpload(extractedData);
      
      toast({
        title: "Resume processed successfully!",
        description: `Extracted ${extractedData.text.length} characters from ${extractedData.fileName}`
      });
    } catch (error: any) {
      toast({
        title: "Processing failed",
        description: error.message || 'Failed to process resume',
        variant: "destructive"
      });
    } finally {
      setExtracting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Your Resume</h1>
        <p className="text-lg text-gray-600">Get AI-powered insights and job recommendations</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5" />
            <span>Resume Upload</span>
          </CardTitle>
          <CardDescription>
            Upload your resume in PDF, DOCX, or TXT format to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-blue-500 bg-blue-50' 
                : selectedFile 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {selectedFile ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2 text-green-600">
                  <FileText className="h-8 w-8" />
                  <span className="font-medium">{selectedFile.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedFile(null)}
                    disabled={isAnalyzing}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-600">
                  File size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                <div>
                  <p className="text-lg font-medium text-gray-900">
                    Drag & drop your resume here
                  </p>
                  <p className="text-sm text-gray-600">or click to browse files</p>
                </div>
                <p className="text-xs text-gray-500">
                  Supported formats: PDF, DOCX, TXT (Max size: 10MB)
                </p>
              </div>
            )}
            
            {!isAnalyzing && (
              <input
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={handleFileSelect}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={isAnalyzing}
              />
            )}
          </div>

          {selectedFile && (
            <div className="mt-6 flex justify-center">
              <Button 
                onClick={handleAnalyze}
                disabled={isAnalyzing || extracting}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8"
              >
                {extracting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Extracting Text...
                  </>
                ) : isAnalyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing Resume...
                  </>
                ) : (
                  'Analyze Resume'
                )}
              </Button>
            </div>
          )}

          {isAnalyzing && (
            <div className="mt-6 text-center">
              <div className="flex items-center justify-center space-x-2 text-blue-600">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>AI is analyzing your resume...</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumeUpload;
