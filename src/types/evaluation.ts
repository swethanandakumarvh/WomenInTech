export interface CodeSubmission {
  id: string;
  projectId: string;
  userId: string;
  milestoneId: string;
  code: string;
  files: CodeFile[];
  submittedAt: Date;
  status: 'pending' | 'evaluating' | 'completed' | 'failed';
}

export interface CodeFile {
  path: string;
  content: string;
  language: string;
  size: number;
}

export interface EvaluationResult {
  id: string;
  submissionId: string;
  overallScore: number; // 0-100
  readinessScore: number; // 0-100
  feedback: EvaluationFeedback;
  metrics: CodeMetrics;
  suggestions: Suggestion[];
  nextSteps: string[];
  evaluatedAt: Date;
}

export interface EvaluationFeedback {
  strengths: string[];
  improvements: string[];
  codeQuality: {
    score: number;
    comments: string[];
  };
  functionality: {
    score: number;
    comments: string[];
  };
  bestPractices: {
    score: number;
    comments: string[];
  };
  readability: {
    score: number;
    comments: string[];
  };
}

export interface CodeMetrics {
  linesOfCode: number;
  complexity: number;
  maintainability: number;
  testCoverage: number;
  performance: number;
  security: number;
}

export interface Suggestion {
  type: 'improvement' | 'best-practice' | 'optimization' | 'learning';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  example?: string;
  resources?: string[];
}

export interface ReadinessAssessment {
  currentLevel: 'beginner' | 'intermediate' | 'advanced';
  jobReadiness: number; // 0-100
  skillGaps: SkillGap[];
  strengths: string[];
  recommendedProjects: string[];
  estimatedTimeToJobReady: string;
}

export interface SkillGap {
  skill: string;
  currentLevel: number;
  targetLevel: number;
  priority: 'high' | 'medium' | 'low';
  resources: string[];
}