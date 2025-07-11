
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FeedbackSummary = () => {
  const feedback = [
    {
      type: 'success',
      message: 'Great use of action verbs in your experience section',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      type: 'warning',
      message: 'Add more technical skills like SQL, Python, and Machine Learning',
      icon: AlertCircle,
      color: 'text-yellow-600'
    },
    {
      type: 'error',
      message: 'Include a dedicated projects section to showcase your work',
      icon: XCircle,
      color: 'text-red-600'
    },
    {
      type: 'warning',
      message: 'Your summary section is too generic - make it more specific to your field',
      icon: AlertCircle,
      color: 'text-yellow-600'
    },
    {
      type: 'success',
      message: 'Good formatting and ATS-friendly structure',
      icon: CheckCircle,
      color: 'text-green-600'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">AI Feedback Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {feedback.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                <Icon className={`h-5 w-5 mt-0.5 ${item.color}`} />
                <p className="text-gray-700 flex-1">{item.message}</p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedbackSummary;
