
import { useState } from 'react';
import { ArrowLeft, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import ResumeUpload from '@/components/ResumeUpload';
import ResumeAnalysis from '@/components/ResumeAnalysis';
import { ExtractedResumeData } from '@/utils/fileExtraction';
import { analyzeResume } from '@/utils/resumeScoring';

interface DashboardProps {
  onBack: () => void;
}

const Dashboard = ({ onBack }: DashboardProps) => {
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [resumeData, setResumeData] = useState<ExtractedResumeData | null>(null);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleResumeUpload = async (extractedData: ExtractedResumeData) => {
    setIsAnalyzing(true);
    setResumeData(extractedData);
    
    try {
      // Analyze the extracted text
      console.log('Analyzing resume text:', extractedData.text.substring(0, 100) + '...');
      
      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Analyze the resume using our scoring system
      const analysis = analyzeResume(extractedData.text);
      
      setAnalysisData(analysis);
      setResumeUploaded(true);
      
      toast({
        title: "Resume analyzed successfully!",
        description: `Score: ${analysis.overallScore}/100 - ${analysis.feedback.length} recommendations generated`,
      });
      
    } catch (error) {
      console.error('Error analyzing resume:', error);
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing your resume. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleNewUpload = () => {
    setResumeUploaded(false);
    setResumeData(null);
    setAnalysisData(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onBack}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </Button>
              <div className="flex items-center space-x-2">
                <Target className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">ResumeAI Dashboard</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                U
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!resumeUploaded ? (
          <ResumeUpload onUpload={handleResumeUpload} isAnalyzing={isAnalyzing} />
        ) : (
          <ResumeAnalysis resumeData={resumeData} analysisData={analysisData} onNewUpload={handleNewUpload} />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
