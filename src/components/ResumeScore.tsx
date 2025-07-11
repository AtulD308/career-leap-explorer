
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const ResumeScore = () => {
  const overallScore = 78;
  const subscores = [
    { name: 'ATS Friendly', score: 85, color: 'bg-green-500' },
    { name: 'Keywords Match', score: 72, color: 'bg-yellow-500' },
    { name: 'Section Coverage', score: 76, color: 'bg-blue-500' },
  ];

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
                    stroke="#3b82f6"
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
              <Badge 
                variant={overallScore >= 80 ? 'default' : overallScore >= 60 ? 'secondary' : 'destructive'}
                className="mt-4"
              >
                {overallScore >= 80 ? 'Excellent' : overallScore >= 60 ? 'Good' : 'Needs Improvement'}
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
      </CardContent>
    </Card>
  );
};

export default ResumeScore;
