
import { ExternalLink, Heart, BookmarkPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const JobRecommendations = () => {
  const jobs = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      matchScore: 92,
      requiredSkills: ['React', 'JavaScript', 'TypeScript', 'CSS'],
      salary: '$80,000 - $120,000',
      type: 'Full-time'
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      company: 'StartupXYZ',
      location: 'Remote',
      matchScore: 85,
      requiredSkills: ['React', 'Node.js', 'Python', 'SQL'],
      salary: '$90,000 - $130,000',
      type: 'Full-time'
    },
    {
      id: 3,
      title: 'UI/UX Developer',
      company: 'Design Studio',
      location: 'New York, NY',
      matchScore: 78,
      requiredSkills: ['HTML/CSS', 'JavaScript', 'Figma', 'React'],
      salary: '$70,000 - $100,000',
      type: 'Full-time'
    },
    {
      id: 4,
      title: 'Junior Web Developer',
      company: 'WebSolutions LLC',
      location: 'Austin, TX',
      matchScore: 82,
      requiredSkills: ['JavaScript', 'React', 'Git', 'REST APIs'],
      salary: '$65,000 - $85,000',
      type: 'Full-time'
    },
    {
      id: 5,
      title: 'React Developer',
      company: 'Innovation Labs',
      location: 'Seattle, WA',
      matchScore: 88,
      requiredSkills: ['React', 'Redux', 'JavaScript', 'Testing'],
      salary: '$85,000 - $115,000',
      type: 'Contract'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Top Job Matches for You</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {jobs.map((job) => (
            <Card key={job.id} className="border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                    <p className="text-lg text-gray-600">{job.company}</p>
                    <p className="text-sm text-gray-500">{job.location} • {job.type}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{job.matchScore}%</div>
                    <div className="text-sm text-gray-500">Match</div>
                  </div>
                </div>

                <div className="mb-4">
                  <Progress value={job.matchScore} className="h-2" />
                </div>

                <div className="mb-4">
                  <p className="text-lg font-semibold text-gray-900 mb-2">{job.salary}</p>
                  <div className="flex flex-wrap gap-2">
                    {job.requiredSkills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Heart className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                    <Button variant="outline" size="sm">
                      <BookmarkPlus className="h-4 w-4 mr-1" />
                      Bookmark
                    </Button>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Apply Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default JobRecommendations;
