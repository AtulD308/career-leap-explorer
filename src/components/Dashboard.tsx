
import { useState } from 'react';
import { ArrowLeft, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ResumeUpload from '@/components/ResumeUpload';
import ResumeAnalysis from '@/components/ResumeAnalysis';

interface DashboardProps {
  onBack: () => void;
}

const Dashboard = ({ onBack }: DashboardProps) => {
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [resumeData, setResumeData] = useState<any>(null);

  const handleResumeUpload = (file: File) => {
    // In a real app, you would process the file here
    console.log('Resume uploaded:', file.name);
    setResumeData({
      fileName: file.name,
      uploadDate: new Date().toISOString(),
    });
    setResumeUploaded(true);
  };

  const handleNewUpload = () => {
    setResumeUploaded(false);
    setResumeData(null);
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
          <ResumeUpload onUpload={handleResumeUpload} />
        ) : (
          <ResumeAnalysis resumeData={resumeData} onNewUpload={handleNewUpload} />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
