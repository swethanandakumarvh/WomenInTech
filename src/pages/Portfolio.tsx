import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Github, 
  ExternalLink, 
  Download, 
  Share2, 
  Eye,
  Star,
  Code,
  Calendar,
  Trophy,
  Plus
} from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function Portfolio() {
  const { state } = useApp()
  const [activeTab, setActiveTab] = useState('projects')

  // Mock portfolio data
  const portfolioProjects = [
    {
      id: '1',
      title: 'Personal Portfolio Website',
      description: 'A responsive portfolio website built with HTML, CSS, and JavaScript',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      githubUrl: 'https://github.com/username/portfolio',
      liveUrl: 'https://username.github.io/portfolio',
      status: 'completed',
      completedDate: '2024-01-15',
      stars: 12,
      views: 234
    },
    {
      id: '2',
      title: 'Task Management App',
      description: 'A React-based todo application with local storage',
      image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
      githubUrl: 'https://github.com/username/task-app',
      liveUrl: 'https://task-app-demo.netlify.app',
      status: 'in-progress',
      completedDate: null,
      stars: 8,
      views: 156
    }
  ]

  const achievements = [
    {
      title: 'First Project Completed',
      description: 'Successfully completed your first coding project',
      icon: '🎉',
      date: '2024-01-15',
      earned: true
    },
    {
      title: 'GitHub Master',
      description: 'Connected GitHub and made your first commit',
      icon: '🐙',
      date: '2024-01-10',
      earned: true
    },
    {
      title: 'Fast Learner',
      description: 'Completed 3 projects in one month',
      icon: '⚡',
      date: null,
      earned: false
    },
    {
      title: 'Portfolio Builder',
      description: 'Built and deployed your portfolio website',
      icon: '🏆',
      date: '2024-01-15',
      earned: true
    }
  ]

  const skills = [
    { name: 'HTML', level: 85, category: 'Frontend' },
    { name: 'CSS', level: 80, category: 'Frontend' },
    { name: 'JavaScript', level: 75, category: 'Frontend' },
    { name: 'React', level: 60, category: 'Frontend' },
    { name: 'TypeScript', level: 45, category: 'Frontend' },
    { name: 'Git', level: 70, category: 'Tools' }
  ]

  const handleSharePortfolio = () => {
    if (navigator.share) {
      navigator.share({
        title: `${state.user?.name}'s Portfolio`,
        text: 'Check out my coding portfolio!',
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      // You could show a toast notification here
    }
  }

  const tabs = [
    { id: 'projects', name: 'Projects', icon: Code },
    { id: 'skills', name: 'Skills', icon: Star },
    { id: 'achievements', name: 'Achievements', icon: Trophy }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="card mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mr-6">
                <span className="text-2xl font-bold text-white">
                  {state.user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {state.user?.name}'s Portfolio
                </h1>
                <p className="text-gray-600 mb-2">
                  {state.user?.field} Developer • {state.user?.level} Level
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>🎯 {state.user?.readinessScore}% Job Ready</span>
                  <span>📚 {state.projects?.length || 0} Projects</span>
                  <span>⭐ {achievements.filter(a => a.earned).length} Achievements</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={handleSharePortfolio}
                className="btn-secondary flex items-center"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </button>
              <button className="btn-secondary flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </button>
              <a
                href={state.user?.githubConnected ? '#' : '/profile'}
                className="btn-primary flex items-center"
              >
                <Github className="w-4 h-4 mr-2" />
                {state.user?.githubConnected ? 'View GitHub' : 'Connect GitHub'}
              </a>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">
              {portfolioProjects.filter(p => p.status === 'completed').length}
            </div>
            <div className="text-gray-600">Completed Projects</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {portfolioProjects.reduce((acc, p) => acc + p.stars, 0)}
            </div>
            <div className="text-gray-600">GitHub Stars</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {portfolioProjects.reduce((acc, p) => acc + p.views, 0)}
            </div>
            <div className="text-gray-600">Project Views</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {achievements.filter(a => a.earned).length}
            </div>
            <div className="text-gray-600">Achievements</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="card">
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {tab.name}
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">My Projects</h2>
                <button className="btn-primary flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Project
                </button>
              </div>

              {portfolioProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {portfolioProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="relative">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-4 right-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            project.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {project.status === 'completed' ? 'Completed' : 'In Progress'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                          {project.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                            <span>{project.stars}</span>
                          </div>
                          <div className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            <span>{project.views}</span>
                          </div>
                          {project.completedDate && (
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              <span>{new Date(project.completedDate).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex space-x-2">
                          <a
                            href={project.githubUrl}
                            className="flex-1 flex items-center justify-center px-3 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                          >
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </a>
                          <a
                            href={project.liveUrl}
                            className="flex-1 flex items-center justify-center px-3 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Code className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Projects Yet</h3>
                  <p className="text-gray-600 mb-4">
                    Complete your first project to start building your portfolio
                  </p>
                  <button className="btn-primary">
                    Start Your First Project
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === 'skills' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Technical Skills</h2>
              <div className="space-y-6">
                {['Frontend', 'Tools'].map((category) => (
                  <div key={category}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{category}</h3>
                    <div className="space-y-4">
                      {skills.filter(skill => skill.category === category).map((skill) => (
                        <div key={skill.name} className="flex items-center justify-between">
                          <div className="flex items-center flex-1">
                            <span className="text-gray-900 font-medium w-24">{skill.name}</span>
                            <div className="flex-1 mx-4">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <motion.div
                                  className="bg-primary-600 h-2 rounded-full"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${skill.level}%` }}
                                  transition={{ duration: 1, delay: 0.2 }}
                                />
                              </div>
                            </div>
                            <span className="text-gray-600 text-sm w-12 text-right">
                              {skill.level}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === 'achievements' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Achievements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`p-6 rounded-lg border-2 transition-all ${
                      achievement.earned
                        ? 'border-yellow-200 bg-yellow-50'
                        : 'border-gray-200 bg-gray-50 opacity-60'
                    }`}
                  >
                    <div className="flex items-start">
                      <div className="text-3xl mr-4">{achievement.icon}</div>
                      <div className="flex-1">
                        <h3 className={`text-lg font-semibold mb-2 ${
                          achievement.earned ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {achievement.title}
                        </h3>
                        <p className={`text-sm mb-2 ${
                          achievement.earned ? 'text-gray-700' : 'text-gray-500'
                        }`}>
                          {achievement.description}
                        </p>
                        {achievement.earned && achievement.date && (
                          <p className="text-xs text-gray-500">
                            Earned on {new Date(achievement.date).toLocaleDateString()}
                          </p>
                        )}
                        {!achievement.earned && (
                          <p className="text-xs text-gray-500">Not earned yet</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}