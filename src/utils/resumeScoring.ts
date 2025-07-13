
interface ResumeSection {
  contactInfo: boolean;
  education: boolean;
  experience: boolean;
  projects: boolean;
  skills: boolean;
}

interface ScoreBreakdown {
  sectionCompleteness: number;
  keywordRelevance: number;
  atsCompliance: number;
  quantifiedAchievements: number;
  grammarQuality: number;
  resumeLength: number;
}

interface ResumeScore {
  overallScore: number;
  breakdown: ScoreBreakdown;
  subscores: Array<{
    name: string;
    score: number;
    color: string;
  }>;
  feedback: string[];
}

// Predefined list of in-demand tech skills
const TECH_SKILLS = [
  'JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'MongoDB', 'AWS', 'Docker',
  'TypeScript', 'Vue.js', 'Angular', 'Express', 'PostgreSQL', 'Redis', 'Kubernetes',
  'Git', 'REST API', 'GraphQL', 'Machine Learning', 'TensorFlow', 'Django', 'Flask',
  'Spring Boot', 'Java', 'C++', 'C#', '.NET', 'PHP', 'Laravel', 'Ruby', 'Rails',
  'Go', 'Rust', 'Swift', 'Kotlin', 'Flutter', 'React Native', 'Azure', 'GCP',
  'Jenkins', 'Linux', 'Bash', 'HTML', 'CSS', 'Sass', 'Webpack', 'Figma'
];

const SOFT_SKILLS = [
  'Communication', 'Leadership', 'Problem Solving', 'Team Collaboration',
  'Project Management', 'Agile', 'Scrum', 'Critical Thinking', 'Adaptability'
];

export class ResumeScorer {
  private extractedText: string;
  private wordCount: number;

  constructor(resumeText: string) {
    this.extractedText = resumeText.toLowerCase();
    this.wordCount = resumeText.split(/\s+/).length;
  }

  // 1. Section Completeness (25 pts)
  private calculateSectionScore(): { score: number; feedback: string[] } {
    const feedback: string[] = [];
    const sections: ResumeSection = {
      contactInfo: this.hasContactInfo(),
      education: this.hasSection('education'),
      experience: this.hasSection('experience'),
      projects: this.hasSection('project'),
      skills: this.hasSection('skill')
    };

    let score = 0;
    if (sections.contactInfo) score += 5;
    else feedback.push('Add clear contact information section');
    
    if (sections.education) score += 5;
    else feedback.push('Include education section');
    
    if (sections.experience) score += 5;
    else feedback.push('Add work experience section');
    
    if (sections.projects) score += 5;
    else feedback.push('Include a projects section to showcase your work');
    
    if (sections.skills) score += 5;
    else feedback.push('Add a dedicated skills section');

    return { score, feedback };
  }

  // 2. Keyword Relevance (30 pts)
  private calculateKeywordScore(): { score: number; feedback: string[] } {
    const feedback: string[] = [];
    const foundTechSkills = this.findMatchingSkills(TECH_SKILLS);
    const foundSoftSkills = this.findMatchingSkills(SOFT_SKILLS);
    
    const totalRelevantSkills = TECH_SKILLS.length + SOFT_SKILLS.length;
    const foundSkills = foundTechSkills.length + foundSoftSkills.length;
    const matchPercentage = (foundSkills / totalRelevantSkills) * 100;

    let score = 0;
    if (matchPercentage > 80) score = 30;
    else if (matchPercentage > 60) score = 25;
    else if (matchPercentage > 40) score = 20;
    else score = 10;

    if (foundTechSkills.length < 5) {
      feedback.push('Add more technical skills like Python, SQL, React, or Node.js');
    }
    if (foundSoftSkills.length < 3) {
      feedback.push('Include soft skills like communication and leadership');
    }

    return { score, feedback };
  }

  // 3. ATS Compliance (20 pts)
  private calculateATSScore(): { score: number; feedback: string[] } {
    const feedback: string[] = [];
    let score = 0;

    // Check for minimal tables/images (simulate)
    if (!this.hasComplexFormatting()) {
      score += 5;
    } else {
      feedback.push('Avoid complex tables and images for better ATS compatibility');
    }

    // Check for simple structure
    if (this.hasSimpleStructure()) {
      score += 5;
    } else {
      feedback.push('Use clear section headers and simple formatting');
    }

    // Check for chronological order
    if (this.hasChronologicalOrder()) {
      score += 5;
    } else {
      feedback.push('Organize experience in reverse chronological order');
    }

    // Assume PDF/DOCX format is correct (file type check would be done at upload)
    score += 5;

    return { score, feedback };
  }

  // 4. Quantified Achievements (10 pts)
  private calculateAchievementScore(): { score: number; feedback: string[] } {
    const feedback: string[] = [];
    const quantifiedPattern = /(\d+%|\d+k|\d+\+?\s*(users|clients|requests|revenue|performance|improvement|increase|decrease|growth))/gi;
    const matches = this.extractedText.match(quantifiedPattern);

    let score = 0;
    if (matches && matches.length > 0) {
      score = 10;
    } else {
      feedback.push('Add quantifiable achievements (e.g., "Improved performance by 30%")');
    }

    return { score, feedback };
  }

  // 5. Grammar Quality (10 pts) - Simplified version
  private calculateGrammarScore(): { score: number; feedback: string[] } {
    const feedback: string[] = [];
    // Simplified grammar check - look for common issues
    const commonErrors = [
      /\bi\s/gi, // Lowercase 'i'
      /\.\s*[a-z]/g, // Lowercase after period
      /\s{2,}/g, // Multiple spaces
    ];

    let errorCount = 0;
    commonErrors.forEach(pattern => {
      const matches = this.extractedText.match(pattern);
      if (matches) errorCount += matches.length;
    });

    let score = 0;
    if (errorCount <= 2) score = 10;
    else if (errorCount <= 5) score = 5;
    else score = 2;

    if (errorCount > 2) {
      feedback.push('Review grammar and formatting for professional presentation');
    }

    return { score, feedback };
  }

  // 6. Resume Length (5 pts)
  private calculateLengthScore(): { score: number; feedback: string[] } {
    const feedback: string[] = [];
    let score = 0;

    if (this.wordCount >= 400 && this.wordCount <= 800) {
      score = 5;
    } else if (this.wordCount > 1000) {
      score = 2;
      feedback.push('Resume is too long - aim for 1-2 pages (400-800 words)');
    } else if (this.wordCount < 300) {
      score = 1;
      feedback.push('Resume is too short - add more details about your experience');
    } else {
      score = 3;
    }

    return { score, feedback };
  }

  // Helper methods
  private hasContactInfo(): boolean {
    return /email|phone|linkedin|github/.test(this.extractedText);
  }

  private hasSection(sectionName: string): boolean {
    const pattern = new RegExp(`\\b${sectionName}\\b`, 'i');
    return pattern.test(this.extractedText);
  }

  private findMatchingSkills(skillsList: string[]): string[] {
    return skillsList.filter(skill => 
      new RegExp(`\\b${skill.toLowerCase().replace(/[+]/g, '\\+')}\\b`, 'i').test(this.extractedText)
    );
  }

  private hasComplexFormatting(): boolean {
    // Simplified check - in real implementation, this would analyze PDF structure
    return /table|chart|image/.test(this.extractedText);
  }

  private hasSimpleStructure(): boolean {
    // Check for clear section headers
    const headers = /^(education|experience|skills|projects|summary)/gm;
    return headers.test(this.extractedText);
  }

  private hasChronologicalOrder(): boolean {
    // Simplified check for date patterns
    const datePattern = /\d{4}|\d{1,2}\/\d{4}/g;
    const dates = this.extractedText.match(datePattern);
    return dates ? dates.length >= 2 : false;
  }

  // Main scoring method
  public calculateScore(): ResumeScore {
    const sectionResult = this.calculateSectionScore();
    const keywordResult = this.calculateKeywordScore();
    const atsResult = this.calculateATSScore();
    const achievementResult = this.calculateAchievementScore();
    const grammarResult = this.calculateGrammarScore();
    const lengthResult = this.calculateLengthScore();

    const breakdown: ScoreBreakdown = {
      sectionCompleteness: sectionResult.score,
      keywordRelevance: keywordResult.score,
      atsCompliance: atsResult.score,
      quantifiedAchievements: achievementResult.score,
      grammarQuality: grammarResult.score,
      resumeLength: lengthResult.score
    };

    const overallScore = Math.round(
      breakdown.sectionCompleteness +
      breakdown.keywordRelevance +
      breakdown.atsCompliance +
      breakdown.quantifiedAchievements +
      breakdown.grammarQuality +
      breakdown.resumeLength
    );

    const subscores = [
      {
        name: 'ATS Friendly',
        score: Math.round((breakdown.atsCompliance / 20) * 100),
        color: 'bg-green-500'
      },
      {
        name: 'Keywords Match',
        score: Math.round((breakdown.keywordRelevance / 30) * 100),
        color: 'bg-yellow-500'
      },
      {
        name: 'Section Coverage',
        score: Math.round((breakdown.sectionCompleteness / 25) * 100),
        color: 'bg-blue-500'
      }
    ];

    const allFeedback = [
      ...sectionResult.feedback,
      ...keywordResult.feedback,
      ...atsResult.feedback,
      ...achievementResult.feedback,
      ...grammarResult.feedback,
      ...lengthResult.feedback
    ];

    return {
      overallScore,
      breakdown,
      subscores,
      feedback: allFeedback
    };
  }
}

// Export utility function
export const analyzeResume = (resumeText: string): ResumeScore => {
  const scorer = new ResumeScorer(resumeText);
  return scorer.calculateScore();
};
