
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ResumeScore from '@/components/ResumeScore';
import FeedbackSummary from '@/components/FeedbackSummary';
import SkillsGapAnalysis from '@/components/SkillsGapAnalysis';
import JobRecommendations from '@/components/JobRecommendations';

interface ResumeAnalysisProps {
  resumeData: any;
  analysisData: any;
  onNewUpload: () => void;
}

const ResumeAnalysis = ({ resumeData, analysisData, onNewUpload }: ResumeAnalysisProps) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Resume Analysis</h1>
          <p className="text-gray-600">Analysis for {resumeData?.fileName}</p>
        </div>
        <Button 
          onClick={onNewUpload}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <Upload className="h-4 w-4" />
          <span>Upload New Resume</span>
        </Button>
      </div>

      {/* Resume Score Overview */}
      <ResumeScore scoreData={analysisData} />

      {/* Feedback Summary */}
      <FeedbackSummary />

      {/* Skills Gap Analysis */}
      <SkillsGapAnalysis />

      {/* Job Recommendations */}
      <JobRecommendations />
    </div>
  );
};

export default ResumeAnalysis;
