import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  Target, 
  Star,
  Code,
  Shield,
  Zap,
  Eye
} from 'lucide-react';
import { EvaluationResult } from '../types/evaluation';

interface EvaluationResultsProps {
  result: EvaluationResult;
  onNextStep?: () => void;
}

export default function EvaluationResults({ result, onNextStep }: EvaluationResultsProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const ScoreCircle = ({ score, label }: { score: number; label: string }) => (
    <div className="text-center">
      <div className="relative w-20 h-20 mx-auto mb-2">
        <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-200"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={`${2 * Math.PI * 40}`}
            strokeDashoffset={`${2 * Math.PI * 40 * (1 - score / 100)}`}
            className={getScoreColor(score)}
            initial={{ strokeDashoffset: `${2 * Math.PI * 40}` }}
            animate={{ strokeDashoffset: `${2 * Math.PI * 40 * (1 - score / 100)}` }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-xl font-bold ${getScoreColor(score)}`}>{score}</span>
        </div>
      </div>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card text-center"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Evaluation Complete! 🎉</h2>
        <div className="grid grid-cols-2 gap-8 mb-6">
          <ScoreCircle score={result.overallScore} label="Overall Score" />
          <ScoreCircle score={result.readinessScore} label="Job Readiness" />
        </div>
        <p className="text-gray-600">
          {result.overallScore >= 80 
            ? "Excellent work! Your code demonstrates strong programming skills."
            : result.overallScore >= 60
            ? "Good progress! There are some areas for improvement."
            : "Keep learning! Focus on the feedback below to improve your skills."
          }
        </p>
      </motion.div>

      {/* Detailed Scores */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4">Detailed Assessment</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Code Quality */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Code className="w-6 h-6 text-blue-600 mr-3" />
              <div>
                <p className="font-semibold text-gray-900">Code Quality</p>
                <p className="text-sm text-gray-600">Structure & Maintainability</p>
              </div>
            </div>
            <div className={`text-2xl font-bold ${getScoreColor(result.feedback.codeQuality.score)}`}>
              {result.feedback.codeQuality.score}
            </div>
          </div>

          {/* Functionality */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Zap className="w-6 h-6 text-green-600 mr-3" />
              <div>
                <p className="font-semibold text-gray-900">Functionality</p>
                <p className="text-sm text-gray-600">Features & Requirements</p>
              </div>
            </div>
            <div className={`text-2xl font-bold ${getScoreColor(result.feedback.functionality.score)}`}>
              {result.feedback.functionality.score}
            </div>
          </div>

          {/* Best Practices */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Shield className="w-6 h-6 text-purple-600 mr-3" />
              <div>
                <p className="font-semibold text-gray-900">Best Practices</p>
                <p className="text-sm text-gray-600">Security & Performance</p>
              </div>
            </div>
            <div className={`text-2xl font-bold ${getScoreColor(result.feedback.bestPractices.score)}`}>
              {result.feedback.bestPractices.score}
            </div>
          </div>

          {/* Readability */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Eye className="w-6 h-6 text-orange-600 mr-3" />
              <div>
                <p className="font-semibold text-gray-900">Readability</p>
                <p className="text-sm text-gray-600">Clarity & Documentation</p>
              </div>
            </div>
            <div className={`text-2xl font-bold ${getScoreColor(result.feedback.readability.score)}`}>
              {result.feedback.readability.score}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Strengths & Improvements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <div className="flex items-center mb-4">
            <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
            <h3 className="text-lg font-bold text-gray-900">Strengths</h3>
          </div>
          {result.feedback.strengths.length > 0 ? (
            <ul className="space-y-2">
              {result.feedback.strengths.map((strength, index) => (
                <li key={index} className="flex items-start">
                  <Star className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{strength}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">Keep working to develop your strengths!</p>
          )}
        </motion.div>

        {/* Improvements */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3" />
            <h3 className="text-lg font-bold text-gray-900">Areas for Improvement</h3>
          </div>
          {result.feedback.improvements.length > 0 ? (
            <ul className="space-y-2">
              {result.feedback.improvements.map((improvement, index) => (
                <li key={index} className="flex items-start">
                  <Target className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{improvement}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">Great job! No major improvements needed.</p>
          )}
        </motion.div>
      </div>

      {/* Suggestions */}
      {result.suggestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">Personalized Suggestions</h3>
          <div className="space-y-4">
            {result.suggestions.map((suggestion, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{suggestion.title}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    suggestion.priority === 'high' ? 'bg-red-100 text-red-800' :
                    suggestion.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {suggestion.priority} priority
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{suggestion.description}</p>
                {suggestion.example && (
                  <div className="bg-gray-50 rounded-md p-3 mb-3">
                    <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                      {suggestion.example}
                    </pre>
                  </div>
                )}
                {suggestion.resources && suggestion.resources.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-2">Helpful Resources:</p>
                    <ul className="space-y-1">
                      {suggestion.resources.map((resource, resourceIndex) => (
                        <li key={resourceIndex}>
                          <a 
                            href={resource} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-primary-600 hover:text-primary-700 underline"
                          >
                            {resource}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Next Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="card"
      >
        <div className="flex items-center mb-4">
          <TrendingUp className="w-6 h-6 text-primary-600 mr-3" />
          <h3 className="text-xl font-bold text-gray-900">Next Steps</h3>
        </div>
        <ul className="space-y-2 mb-6">
          {result.nextSteps.map((step, index) => (
            <li key={index} className="flex items-start">
              <div className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                {index + 1}
              </div>
              <span className="text-gray-700">{step}</span>
            </li>
          ))}
        </ul>
        {onNextStep && (
          <button onClick={onNextStep} className="btn-primary">
            Continue Learning Journey
          </button>
        )}
      </motion.div>

      {/* Code Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="card"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4">Code Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{result.metrics.linesOfCode}</div>
            <div className="text-sm text-gray-600">Lines of Code</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{result.metrics.complexity}</div>
            <div className="text-sm text-gray-600">Complexity</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{result.metrics.testCoverage}%</div>
            <div className="text-sm text-gray-600">Test Coverage</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{result.metrics.maintainability}%</div>
            <div className="text-sm text-gray-600">Maintainability</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{result.metrics.security}%</div>
            <div className="text-sm text-gray-600">Security</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{result.metrics.performance}%</div>
            <div className="text-sm text-gray-600">Performance</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}