import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Trophy, 
  Github, 
  TrendingUp, 
  Clock, 
  Target,
  ArrowRight,
  CheckCircle,
  Play,
  Star
} from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function Dashboard() {
  const { state } = useApp()
  const { user, projects } = state

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to RiseInTech</h2>
          <p className="text-gray-600 mb-6">Please complete onboarding to get started</p>
          <Link to="/onboarding" className="btn-primary">
            Start Onboarding
          </Link>
        </div>
      </div>
    )
  }

  const currentProject = projects.find(p => p.status === 'in-progress') || projects[0]
  const completedProjects = projects.filter(p => p.status === 'completed').length
  const totalHours = projects.reduce((acc, p) => acc + (p.estimatedHours * (p.progress / 100)), 0)

  const stats = [
    {
      label: 'Readiness Score',
      value: `${user.readinessScore}%`,
      icon: Target,
      color: 'text-primary-600',
      bgColor: 'bg-primary-50'
    },
    {
      label: 'Projects Completed',
      value: completedProjects,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      label: 'Hours Learned',
      value: Math.round(totalHours),
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'GitHub Connected',
      value: user.githubConnected ? 'Yes' : 'No',
      icon: Github,
      color: user.githubConnected ? 'text-green-600' : 'text-gray-600',
      bgColor: user.githubConnected ? 'bg-green-50' : 'bg-gray-50'
    }
  ]

  const achievements = [
    { name: 'First Project', description: 'Completed your first project', earned: completedProjects > 0 },
    { name: 'GitHub Connected', description: 'Connected your GitHub account', earned: user.githubConnected },
    { name: 'Fast Learner', description: 'Completed 3 projects', earned: completedProjects >= 3 },
    { name: 'Portfolio Builder', description: 'Built your first portfolio', earned: false }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-gray-600">
            Continue your journey in {user.field} development
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card"
              >
                <div className="flex items-center">
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center mr-4`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Project */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Current Project</h2>
                <Link to="/projects" className="text-primary-600 hover:text-primary-700 font-medium">
                  View All
                </Link>
              </div>

              {currentProject ? (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {currentProject.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      currentProject.status === 'completed' ? 'bg-green-100 text-green-800' :
                      currentProject.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {currentProject.status.replace('-', ' ')}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{currentProject.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Progress</span>
                      <span>{currentProject.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${currentProject.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {currentProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-4">
                    <Link 
                      to={`/projects/${currentProject.id}`}
                      className="btn-primary flex items-center"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Continue Project
                    </Link>
                    {!user.githubConnected && (
                      <button className="btn-secondary flex items-center">
                        <Github className="w-4 h-4 mr-2" />
                        Connect GitHub
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Projects Yet</h3>
                  <p className="text-gray-600 mb-4">Start your first project to begin learning</p>
                  <Link to="/projects" className="btn-primary">
                    Browse Projects
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Readiness Score */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Readiness</h3>
              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-gray-200"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - user.readinessScore / 100)}`}
                      className="text-primary-600 transition-all duration-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900">{user.readinessScore}%</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  {user.readinessScore < 30 ? 'Just getting started' :
                   user.readinessScore < 60 ? 'Making good progress' :
                   user.readinessScore < 80 ? 'Almost job-ready' :
                   'Ready for interviews!'}
                </p>
              </div>
            </div>

            {/* Achievements */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      achievement.earned ? 'bg-yellow-100' : 'bg-gray-100'
                    }`}>
                      <Star className={`w-4 h-4 ${
                        achievement.earned ? 'text-yellow-600 fill-current' : 'text-gray-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${
                        achievement.earned ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {achievement.name}
                      </p>
                      <p className="text-xs text-gray-500">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link 
                  to="/projects" 
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center">
                    <BookOpen className="w-5 h-5 text-gray-600 mr-3" />
                    <span className="text-sm font-medium text-gray-900">Browse Projects</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </Link>
                
                <Link 
                  to="/portfolio" 
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center">
                    <Trophy className="w-5 h-5 text-gray-600 mr-3" />
                    <span className="text-sm font-medium text-gray-900">View Portfolio</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </Link>
                
                <button className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center">
                    <TrendingUp className="w-5 h-5 text-gray-600 mr-3" />
                    <span className="text-sm font-medium text-gray-900">Track Progress</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}