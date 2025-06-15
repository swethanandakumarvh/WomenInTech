import { CodeSubmission, EvaluationResult, CodeMetrics, EvaluationFeedback, Suggestion, ReadinessAssessment } from '../types/evaluation';

export class CodeEvaluator {
  
  // Main evaluation function
  async evaluateCode(submission: CodeSubmission): Promise<EvaluationResult> {
    try {
      // Analyze code metrics
      const metrics = await this.analyzeCodeMetrics(submission);
      
      // Generate feedback
      const feedback = await this.generateFeedback(submission, metrics);
      
      // Create suggestions
      const suggestions = await this.generateSuggestions(submission, metrics);
      
      // Calculate scores
      const overallScore = this.calculateOverallScore(metrics, feedback);
      const readinessScore = this.calculateReadinessScore(submission, metrics);
      
      // Generate next steps
      const nextSteps = this.generateNextSteps(submission, metrics, feedback);
      
      return {
        id: `eval_${Date.now()}`,
        submissionId: submission.id,
        overallScore,
        readinessScore,
        feedback,
        metrics,
        suggestions,
        nextSteps,
        evaluatedAt: new Date()
      };
    } catch (error) {
      console.error('Code evaluation failed:', error);
      throw new Error('Failed to evaluate code');
    }
  }

  // Analyze code metrics
  private async analyzeCodeMetrics(submission: CodeSubmission): Promise<CodeMetrics> {
    const metrics: CodeMetrics = {
      linesOfCode: 0,
      complexity: 0,
      maintainability: 0,
      testCoverage: 0,
      performance: 0,
      security: 0
    };

    for (const file of submission.files) {
      // Count lines of code
      metrics.linesOfCode += file.content.split('\n').filter(line => line.trim()).length;
      
      // Analyze complexity
      metrics.complexity += this.calculateComplexity(file.content);
      
      // Check maintainability
      metrics.maintainability += this.assessMaintainability(file.content);
      
      // Security analysis
      metrics.security += this.checkSecurity(file.content);
      
      // Performance analysis
      metrics.performance += this.analyzePerformance(file.content);
    }

    // Average out metrics
    const fileCount = submission.files.length || 1;
    metrics.complexity = Math.round(metrics.complexity / fileCount);
    metrics.maintainability = Math.round(metrics.maintainability / fileCount);
    metrics.security = Math.round(metrics.security / fileCount);
    metrics.performance = Math.round(metrics.performance / fileCount);
    
    // Mock test coverage (in real app, would run actual tests)
    metrics.testCoverage = this.estimateTestCoverage(submission);

    return metrics;
  }

  // Calculate code complexity
  private calculateComplexity(code: string): number {
    let complexity = 1; // Base complexity
    
    // Count decision points
    const patterns = [
      /if\s*\(/g,
      /else\s*if\s*\(/g,
      /while\s*\(/g,
      /for\s*\(/g,
      /switch\s*\(/g,
      /case\s+/g,
      /catch\s*\(/g,
      /&&/g,
      /\|\|/g
    ];
    
    patterns.forEach(pattern => {
      const matches = code.match(pattern);
      if (matches) complexity += matches.length;
    });
    
    return Math.min(complexity, 100); // Cap at 100
  }

  // Assess maintainability
  private assessMaintainability(code: string): number {
    let score = 100;
    
    // Check for long functions
    const functions = code.match(/function\s+\w+\s*\([^)]*\)\s*{[^}]*}/g) || [];
    functions.forEach(func => {
      const lines = func.split('\n').length;
      if (lines > 50) score -= 10;
      else if (lines > 30) score -= 5;
    });
    
    // Check for comments
    const commentLines = (code.match(/\/\/.*|\/\*[\s\S]*?\*\//g) || []).length;
    const codeLines = code.split('\n').filter(line => line.trim()).length;
    const commentRatio = commentLines / codeLines;
    
    if (commentRatio < 0.1) score -= 15;
    else if (commentRatio > 0.3) score += 10;
    
    // Check for consistent naming
    const variableNames = code.match(/(?:var|let|const)\s+(\w+)/g) || [];
    const camelCaseCount = variableNames.filter(name => /[a-z][A-Z]/.test(name)).length;
    const consistencyRatio = camelCaseCount / variableNames.length;
    
    if (consistencyRatio > 0.8) score += 5;
    
    return Math.max(0, Math.min(100, score));
  }

  // Check security issues
  private checkSecurity(code: string): number {
    let score = 100;
    
    // Check for common security issues
    const securityIssues = [
      { pattern: /eval\s*\(/g, penalty: 20, issue: 'eval() usage' },
      { pattern: /innerHTML\s*=/g, penalty: 10, issue: 'innerHTML assignment' },
      { pattern: /document\.write\s*\(/g, penalty: 15, issue: 'document.write usage' },
      { pattern: /\$\{[^}]*\}/g, penalty: 5, issue: 'template literal injection risk' }
    ];
    
    securityIssues.forEach(({ pattern, penalty }) => {
      const matches = code.match(pattern);
      if (matches) score -= penalty * matches.length;
    });
    
    return Math.max(0, Math.min(100, score));
  }

  // Analyze performance
  private analyzePerformance(code: string): number {
    let score = 100;
    
    // Check for performance issues
    const performanceIssues = [
      { pattern: /for\s*\([^)]*\)\s*{[^}]*for\s*\(/g, penalty: 15, issue: 'nested loops' },
      { pattern: /querySelector\s*\(/g, penalty: 5, issue: 'DOM queries in loops' },
      { pattern: /\.length/g, penalty: 2, issue: 'repeated length access' }
    ];
    
    performanceIssues.forEach(({ pattern, penalty }) => {
      const matches = code.match(pattern);
      if (matches) score -= penalty * Math.min(matches.length, 5);
    });
    
    return Math.max(0, Math.min(100, score));
  }

  // Estimate test coverage
  private estimateTestCoverage(submission: CodeSubmission): number {
    const testFiles = submission.files.filter(file => 
      file.path.includes('test') || 
      file.path.includes('spec') ||
      file.content.includes('describe(') ||
      file.content.includes('it(') ||
      file.content.includes('test(')
    );
    
    if (testFiles.length === 0) return 0;
    
    const totalFiles = submission.files.length;
    const testRatio = testFiles.length / totalFiles;
    
    return Math.min(100, Math.round(testRatio * 100));
  }

  // Generate feedback
  private async generateFeedback(submission: CodeSubmission, metrics: CodeMetrics): Promise<EvaluationFeedback> {
    const feedback: EvaluationFeedback = {
      strengths: [],
      improvements: [],
      codeQuality: { score: 0, comments: [] },
      functionality: { score: 0, comments: [] },
      bestPractices: { score: 0, comments: [] },
      readability: { score: 0, comments: [] }
    };

    // Analyze strengths
    if (metrics.maintainability > 80) {
      feedback.strengths.push("Excellent code organization and maintainability");
    }
    if (metrics.security > 90) {
      feedback.strengths.push("Good security practices implemented");
    }
    if (metrics.testCoverage > 70) {
      feedback.strengths.push("Strong test coverage");
    }

    // Analyze improvements
    if (metrics.complexity > 15) {
      feedback.improvements.push("Consider breaking down complex functions into smaller, more manageable pieces");
    }
    if (metrics.testCoverage < 50) {
      feedback.improvements.push("Add more comprehensive tests to improve code reliability");
    }
    if (metrics.security < 70) {
      feedback.improvements.push("Review and address potential security vulnerabilities");
    }

    // Calculate category scores
    feedback.codeQuality.score = Math.round((metrics.maintainability + metrics.complexity) / 2);
    feedback.functionality.score = this.assessFunctionality(submission);
    feedback.bestPractices.score = Math.round((metrics.security + metrics.performance) / 2);
    feedback.readability.score = metrics.maintainability;

    // Add specific comments
    this.addSpecificComments(feedback, submission, metrics);

    return feedback;
  }

  // Assess functionality
  private assessFunctionality(submission: CodeSubmission): number {
    let score = 100;
    
    // Check if basic requirements are met
    const hasHTML = submission.files.some(f => f.path.endsWith('.html'));
    const hasCSS = submission.files.some(f => f.path.endsWith('.css') || f.content.includes('style'));
    const hasJS = submission.files.some(f => f.path.endsWith('.js') || f.path.endsWith('.ts'));
    
    if (!hasHTML) score -= 30;
    if (!hasCSS) score -= 20;
    if (!hasJS) score -= 20;
    
    // Check for responsive design
    const responsivePatterns = ['@media', 'flex', 'grid', 'responsive'];
    const hasResponsive = submission.files.some(file => 
      responsivePatterns.some(pattern => file.content.includes(pattern))
    );
    
    if (hasResponsive) score += 10;
    
    return Math.max(0, Math.min(100, score));
  }

  // Add specific comments
  private addSpecificComments(feedback: EvaluationFeedback, submission: CodeSubmission, metrics: CodeMetrics) {
    // Code quality comments
    if (metrics.maintainability > 80) {
      feedback.codeQuality.comments.push("Code is well-structured and easy to maintain");
    } else {
      feedback.codeQuality.comments.push("Consider improving code organization and adding comments");
    }

    // Functionality comments
    const jsFiles = submission.files.filter(f => f.path.endsWith('.js') || f.path.endsWith('.ts'));
    if (jsFiles.length > 0) {
      feedback.functionality.comments.push("JavaScript functionality implemented");
    }

    // Best practices comments
    if (metrics.security > 80) {
      feedback.bestPractices.comments.push("Good security practices followed");
    } else {
      feedback.bestPractices.comments.push("Review security best practices");
    }

    // Readability comments
    if (metrics.maintainability > 70) {
      feedback.readability.comments.push("Code is readable and well-formatted");
    } else {
      feedback.readability.comments.push("Improve code formatting and add meaningful variable names");
    }
  }

  // Generate suggestions
  private async generateSuggestions(submission: CodeSubmission, metrics: CodeMetrics): Promise<Suggestion[]> {
    const suggestions: Suggestion[] = [];

    // High priority suggestions
    if (metrics.testCoverage < 30) {
      suggestions.push({
        type: 'improvement',
        priority: 'high',
        title: 'Add Unit Tests',
        description: 'Your code lacks sufficient test coverage. Adding tests will improve reliability and catch bugs early.',
        example: `
// Example test
describe('Calculator', () => {
  it('should add two numbers correctly', () => {
    expect(add(2, 3)).toBe(5);
  });
});`,
        resources: [
          'https://jestjs.io/docs/getting-started',
          'https://testing-library.com/docs/'
        ]
      });
    }

    if (metrics.security < 70) {
      suggestions.push({
        type: 'improvement',
        priority: 'high',
        title: 'Address Security Issues',
        description: 'Review your code for potential security vulnerabilities.',
        example: `
// Instead of innerHTML
element.innerHTML = userInput; // ❌ Dangerous

// Use textContent or sanitize
element.textContent = userInput; // ✅ Safe`,
        resources: [
          'https://owasp.org/www-project-top-ten/',
          'https://developer.mozilla.org/en-US/docs/Web/Security'
        ]
      });
    }

    // Medium priority suggestions
    if (metrics.complexity > 10) {
      suggestions.push({
        type: 'optimization',
        priority: 'medium',
        title: 'Reduce Code Complexity',
        description: 'Break down complex functions into smaller, more manageable pieces.',
        example: `
// Instead of one large function
function processData(data) {
  // 50+ lines of code
}

// Break into smaller functions
function validateData(data) { /* ... */ }
function transformData(data) { /* ... */ }
function saveData(data) { /* ... */ }`,
        resources: [
          'https://refactoring.guru/refactoring/techniques/extract-method'
        ]
      });
    }

    // Learning suggestions
    suggestions.push({
      type: 'learning',
      priority: 'medium',
      title: 'Learn Modern JavaScript Features',
      description: 'Explore ES6+ features to write more efficient and readable code.',
      example: `
// Use arrow functions, destructuring, template literals
const { name, age } = user;
const greeting = \`Hello, \${name}! You are \${age} years old.\`;`,
      resources: [
        'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide',
        'https://javascript.info/'
      ]
    });

    return suggestions;
  }

  // Calculate overall score
  private calculateOverallScore(metrics: CodeMetrics, feedback: EvaluationFeedback): number {
    const weights = {
      codeQuality: 0.25,
      functionality: 0.30,
      bestPractices: 0.25,
      readability: 0.20
    };

    return Math.round(
      feedback.codeQuality.score * weights.codeQuality +
      feedback.functionality.score * weights.functionality +
      feedback.bestPractices.score * weights.bestPractices +
      feedback.readability.score * weights.readability
    );
  }

  // Calculate readiness score
  private calculateReadinessScore(submission: CodeSubmission, metrics: CodeMetrics): number {
    let readinessScore = 0;

    // Base score from metrics
    readinessScore += metrics.maintainability * 0.2;
    readinessScore += metrics.security * 0.2;
    readinessScore += metrics.performance * 0.15;
    readinessScore += metrics.testCoverage * 0.15;

    // Project completion bonus
    const completionBonus = this.assessProjectCompletion(submission);
    readinessScore += completionBonus * 0.3;

    return Math.round(Math.min(100, readinessScore));
  }

  // Assess project completion
  private assessProjectCompletion(submission: CodeSubmission): number {
    let completionScore = 0;

    // Check for required files
    const hasHTML = submission.files.some(f => f.path.endsWith('.html'));
    const hasCSS = submission.files.some(f => f.path.endsWith('.css'));
    const hasJS = submission.files.some(f => f.path.endsWith('.js'));
    const hasReadme = submission.files.some(f => f.path.toLowerCase().includes('readme'));

    if (hasHTML) completionScore += 25;
    if (hasCSS) completionScore += 25;
    if (hasJS) completionScore += 25;
    if (hasReadme) completionScore += 25;

    return completionScore;
  }

  // Generate next steps
  private generateNextSteps(submission: CodeSubmission, metrics: CodeMetrics, feedback: EvaluationFeedback): string[] {
    const nextSteps: string[] = [];

    if (feedback.functionality.score < 70) {
      nextSteps.push("Complete the core functionality requirements");
    }

    if (metrics.testCoverage < 50) {
      nextSteps.push("Add comprehensive unit tests");
    }

    if (metrics.security < 80) {
      nextSteps.push("Review and fix security vulnerabilities");
    }

    if (feedback.readability.score < 70) {
      nextSteps.push("Improve code formatting and documentation");
    }

    nextSteps.push("Deploy your project to GitHub Pages or Netlify");
    nextSteps.push("Add your project to your portfolio");

    return nextSteps;
  }

  // Assess overall readiness
  async assessReadiness(userId: string, submissions: CodeSubmission[]): Promise<ReadinessAssessment> {
    const completedProjects = submissions.filter(s => s.status === 'completed').length;
    const averageScore = submissions.reduce((acc, s) => acc + (s as any).score || 0, 0) / submissions.length;

    let currentLevel: 'beginner' | 'intermediate' | 'advanced' = 'beginner';
    let jobReadiness = 0;

    if (completedProjects >= 5 && averageScore >= 80) {
      currentLevel = 'advanced';
      jobReadiness = 85;
    } else if (completedProjects >= 3 && averageScore >= 70) {
      currentLevel = 'intermediate';
      jobReadiness = 65;
    } else {
      jobReadiness = Math.min(60, completedProjects * 15 + averageScore * 0.3);
    }

    return {
      currentLevel,
      jobReadiness: Math.round(jobReadiness),
      skillGaps: this.identifySkillGaps(submissions),
      strengths: this.identifyStrengths(submissions),
      recommendedProjects: this.recommendProjects(currentLevel),
      estimatedTimeToJobReady: this.estimateTimeToJobReady(jobReadiness)
    };
  }

  private identifySkillGaps(submissions: CodeSubmission[]): any[] {
    // Analyze submissions to identify skill gaps
    return [
      {
        skill: 'Testing',
        currentLevel: 30,
        targetLevel: 80,
        priority: 'high',
        resources: ['Jest documentation', 'Testing best practices']
      }
    ];
  }

  private identifyStrengths(submissions: CodeSubmission[]): string[] {
    return ['HTML/CSS fundamentals', 'JavaScript basics', 'Problem-solving'];
  }

  private recommendProjects(level: string): string[] {
    const recommendations = {
      beginner: ['Interactive Calculator', 'Weather App', 'Todo List'],
      intermediate: ['E-commerce Cart', 'Blog Platform', 'API Integration'],
      advanced: ['Full-stack Application', 'Real-time Chat', 'Progressive Web App']
    };
    return recommendations[level as keyof typeof recommendations] || [];
  }

  private estimateTimeToJobReady(readiness: number): string {
    if (readiness >= 80) return '1-2 months';
    if (readiness >= 60) return '3-4 months';
    if (readiness >= 40) return '5-6 months';
    return '6+ months';
  }
}

export const codeEvaluator = new CodeEvaluator();