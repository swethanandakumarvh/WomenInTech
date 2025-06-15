import { motion } from 'framer-motion';
import { TrendingUp, Target, Clock, Star, BookOpen, Award } from 'lucide-react';
import { ReadinessAssessment } from '../types/evaluation';

interface ReadinessTrackerProps {
  assessment: ReadinessAssessment;
  className?: string;
}

export default function ReadinessTracker({ assessment, className = '' }: ReadinessTrackerProps) {
  const getReadinessColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getReadinessMessage = (score: number) => {
    if (score >= 80) return "You're job-ready! Start applying to positions.";
    if (score >= 60) return "Almost there! Focus on the skill gaps below.";
    if (score >= 40) return "Good progress! Keep building your skills.";
    return "Just getting started. Follow your learning path.";
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'advanced': return '🚀';
      case 'intermediate': return '📈';
      default: return '🌱';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Main Readiness Score */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card text-center"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Readiness Score</h2>
        
        <div className="relative w-32 h-32 mx-auto mb-4">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
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
              strokeDashoffset={`${2 * Math.PI * 40 * (1 - assessment.jobReadiness / 100)}`}
              className={getReadinessColor(assessment.jobReadiness)}
              initial={{ strokeDashoffset: `${2 * Math.PI * 40}` }}
              animate={{ strokeDashoffset: `${2 * Math.PI * 40 * (1 - assessment.jobReadiness / 100)}` }}
              transition={{ duration: 2, delay: 0.5 }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-3xl font-bold ${getReadinessColor(assessment.jobReadiness)}`}>
              {assessment.jobReadiness}%
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center mb-4">
          <span className="text-2xl mr-2">{getLevelIcon(assessment.currentLevel)}</span>
          <span className="text-lg font-semibold text-gray-900 capitalize">
            {assessment.currentLevel} Level
          </span>
        </div>

        <p className="text-gray-600 mb-4">{getReadinessMessage(assessment.jobReadiness)}</p>
        
        <div className="flex items-center justify-center text-sm text-gray-500">
          <Clock className="w-4 h-4 mr-2" />
          <span>Estimated time to job-ready: {assessment.estimatedTimeToJobReady}</span>
        </div>
      </motion.div>

      {/* Strengths */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="card"
      >
        <div className="flex items-center mb-4">
          <Star className="w-6 h-6 text-yellow-500 mr-3" />
          <h3 className="text-xl font-bold text-gray-900">Your Strengths</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {assessment.strengths.map((strength, index) => (
            <div key={index} className="flex items-center p-3 bg-green-50 rounded-lg">
              <Award className="w-5 h-5 text-green-600 mr-3" />
              <span className="text-green-800 font-medium">{strength}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Skill Gaps */}
      {assessment.skillGaps.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="card"
        >
          <div className="flex items-center mb-4">
            <Target className="w-6 h-6 text-red-500 mr-3" />
            <h3 className="text-xl font-bold text-gray-900">Skill Gaps to Address</h3>
          </div>
          <div className="space-y-4">
            {assessment.skillGaps.map((gap, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">{gap.skill}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    gap.priority === 'high' ? 'bg-red-100 text-red-800' :
                    gap.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {gap.priority} priority
                  </span>
                </div>
                
                <div className="mb-3">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Current Level</span>
                    <span>Target Level</span>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-red-400 h-2 rounded-full"
                        style={{ width: `${gap.currentLevel}%` }}
                      ></div>
                    </div>
                    <div 
                      className="absolute top-0 h-2 w-1 bg-green-600 rounded"
                      style={{ left: `${gap.targetLevel}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{gap.currentLevel}%</span>
                    <span>Target: {gap.targetLevel}%</span>
                  </div>
                </div>

                {gap.resources.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-2">Recommended Resources:</p>
                    <ul className="space-y-1">
                      {gap.resources.map((resource, resourceIndex) => (
                        <li key={resourceIndex} className="text-sm text-primary-600 hover:text-primary-700">
                          • {resource}
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

      {/* Recommended Projects */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="card"
      >
        <div className="flex items-center mb-4">
          <BookOpen className="w-6 h-6 text-blue-500 mr-3" />
          <h3 className="text-xl font-bold text-gray-900">Recommended Next Projects</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {assessment.recommendedProjects.map((project, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
              <div className="flex items-center mb-2">
                <TrendingUp className="w-5 h-5 text-primary-600 mr-2" />
                <h4 className="font-semibold text-gray-900">{project}</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Perfect for your current skill level and learning goals.
              </p>
              <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                Start Project →
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Progress Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="card"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4">Your Learning Journey</h3>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          
          <div className="space-y-6">
            {/* Current Level */}
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4">
                ✓
              </div>
              <div>
                <p className="font-semibold text-gray-900 capitalize">{assessment.currentLevel} Level</p>
                <p className="text-sm text-gray-600">Current position - {assessment.jobReadiness}% job ready</p>
              </div>
            </div>

            {/* Next Milestone */}
            <div className="flex items-center">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4">
                ⚡
              </div>
              <div>
                <p className="font-semibold text-gray-900">Next Milestone</p>
                <p className="text-sm text-gray-600">
                  {assessment.jobReadiness < 60 ? 'Reach 60% readiness' : 
                   assessment.jobReadiness < 80 ? 'Reach 80% readiness' : 
                   'Start job applications'}
                </p>
              </div>
            </div>

            {/* Job Ready */}
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 ${
                assessment.jobReadiness >= 80 ? 'bg-green-600' : 'bg-gray-300'
              }`}>
                🎯
              </div>
              <div>
                <p className="font-semibold text-gray-900">Job Ready</p>
                <p className="text-sm text-gray-600">
                  {assessment.jobReadiness >= 80 ? 'Congratulations! You\'re ready to apply.' : 
                   `Estimated: ${assessment.estimatedTimeToJobReady}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}