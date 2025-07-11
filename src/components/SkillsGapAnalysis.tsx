
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X } from 'lucide-react';

const SkillsGapAnalysis = () => {
  const presentSkills = [
    'React', 'JavaScript', 'HTML/CSS', 'Git', 'Agile', 'Problem Solving',
    'Communication', 'Team Collaboration', 'REST APIs', 'Responsive Design'
  ];

  const missingSkills = [
    'TypeScript', 'Node.js', 'Python', 'SQL', 'Machine Learning', 
    'Docker', 'AWS', 'GraphQL', 'Testing', 'DevOps'
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Skills Gap Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Present Skills */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Check className="h-5 w-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">Present Skills</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {presentSkills.map((skill, index) => (
                <Badge key={index} variant="default" className="bg-green-100 text-green-800">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Missing Skills */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <X className="h-5 w-5 text-red-600" />
              <h3 className="text-lg font-semibold text-gray-900">Missing Skills</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {missingSkills.map((skill, index) => (
                <Badge key={index} variant="outline" className="border-red-200 text-red-700">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Recommendations</h4>
          <ul className="text-blue-800 space-y-1">
            <li>• Focus on learning TypeScript and Node.js for full-stack development</li>
            <li>• Consider adding cloud skills like AWS to stay competitive</li>
            <li>• Python and SQL are highly valued in the current job market</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsGapAnalysis;
