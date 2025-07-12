
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface ResumeScoreProps {
  scoreData?: {
    overallScore: number;
    subscores: Array<{
      name: string;
      score: number;
      color: string;
    }>;
    breakdown?: {
      sectionCompleteness: number;
      keywordRelevance: number;
      atsCompliance: number;
      quantifiedAchievements: number;
      grammarQuality: number;
      resumeLength: number;
    };
  };
}

const ResumeScore = ({ scoreData }: ResumeScoreProps) => {
  // Use provided data or fallback to mock data
  const overallScore = scoreData?.overallScore || 78;
  const subscores = scoreData?.subscores || [
    { name: 'ATS Friendly', score: 85, color: 'bg-green-500' },
    { name: 'Keywords Match', score: 72, color: 'bg-yellow-500' },
    { name: 'Section Coverage', score: 76, color: 'bg-blue-500' },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#3b82f6'; // blue
    if (score >= 60) return '#eab308'; // yellow
    return '#ef4444'; // red
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return { variant: 'default' as const, text: 'Excellent' };
    if (score >= 60) return { variant: 'secondary' as const, text: 'Good' };
    return { variant: 'destructive' as const, text: 'Needs Improvement' };
  };

  const badge = getScoreBadge(overallScore);
  const strokeColor = getScoreColor(overallScore);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Your Resume Score</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Overall Score */}
          <div className="space-y-4">
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                  {/* Background circle */}
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth="8"
                    strokeDasharray={`${overallScore * 3.14} 314`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">{overallScore}</div>
                    <div className="text-sm text-gray-600">Overall</div>
                  </div>
                </div>
              </div>
              <Badge variant={badge.variant} className="mt-4">
                {badge.text}
              </Badge>
            </div>
          </div>

          {/* Sub-scores */}
          <div className="space-y-6">
            {subscores.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">{item.name}</span>
                  <span className="font-bold text-gray-900">{item.score}%</span>
                </div>
                <Progress value={item.score} className="h-3" />
              </div>
            ))}
          </div>
        </div>

        {/* Score Breakdown */}
        {scoreData && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Score Breakdown</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="font-medium text-gray-900">Section Complete</div>
                <div className="text-blue-600 font-bold">{scoreData.breakdown?.sectionCompleteness || 0}/25</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-gray-900">Keywords</div>
                <div className="text-green-600 font-bold">{scoreData.breakdown?.keywordRelevance || 0}/30</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-gray-900">ATS Friendly</div>
                <div className="text-purple-600 font-bold">{scoreData.breakdown?.atsCompliance || 0}/20</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-gray-900">Achievements</div>
                <div className="text-orange-600 font-bold">{scoreData.breakdown?.quantifiedAchievements || 0}/10</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-gray-900">Grammar</div>
                <div className="text-red-600 font-bold">{scoreData.breakdown?.grammarQuality || 0}/10</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-gray-900">Length</div>
                <div className="text-indigo-600 font-bold">{scoreData.breakdown?.resumeLength || 0}/5</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResumeScore;
