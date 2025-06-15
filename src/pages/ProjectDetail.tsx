import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Play, 
  Github, 
  ExternalLink, 
  Clock, 
  Target, 
  CheckCircle,
  Star,
  Code,
  BookOpen,
  Users
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import VSCodeButton from '../components/VSCodeButton'

// Mock project data - in a real app, this would come from an API
const projectData = {
  '1': {
    id: '1',
    title: 'Personal Portfolio Website',
    description: 'Build a responsive portfolio website to showcase your projects and skills. This project will teach you the fundamentals of web development including HTML structure, CSS styling, and JavaScript interactivity.',
    field: 'frontend',
    level: 'beginner',
    status: 'not-started' as const,
    progress: 0,
    estimatedHours: 20,
    technologies: ['HTML', 'CSS', 'JavaScript', 'Git', 'GitHub Pages'],
    goals: [
      'Learn HTML structure and semantic elements',
      'Master CSS styling and responsive design',
      'Add interactivity with JavaScript',
      'Deploy your website to GitHub Pages',
      'Create a professional online presence'
    ],
    milestones: [
      {
        title: 'Project Setup',
        description: 'Set up your development environment and create the basic project structure',
        completed: false,
        estimatedHours: 2
      },
      {
        title: 'HTML Structure',
        description: 'Create the HTML structure for all pages including header, navigation, and content sections',
        completed: false,
        estimatedHours: 4
      },
      {
        title: 'CSS Styling',
        description: 'Style your website with CSS, including responsive design for mobile devices',
        completed: false,
        estimatedHours: 8
      },
      {
        title: 'JavaScript Interactivity',
        description: 'Add interactive elements like smooth scrolling, form validation, and animations',
        completed: false,
        estimatedHours: 4
      },
      {
        title: 'Deployment',
        description: 'Deploy your website to GitHub Pages and make it live on the internet',
        completed: false,
        estimatedHours: 2
      }
    ],
    difficulty: 'Easy',
    rating: 4.8,
    studentsCompleted: 1247,
    prerequisites: ['Basic computer skills', 'Text editor installed'],
    learningOutcomes: [
      'Understand HTML document structure',
      'Create responsive layouts with CSS',
      'Add interactivity with JavaScript',
      'Deploy websites to the internet',
      'Use version control with Git'
    ],
    resources: [
      { title: 'HTML & CSS Crash Course', type: 'video', url: '#' },
      { title: 'JavaScript Fundamentals', type: 'article', url: '#' },
      { title: 'Git & GitHub Guide', type: 'documentation', url: '#' },
      { title: 'Responsive Design Patterns', type: 'examples', url: '#' }
    ]
  }
}

export default function ProjectDetail() {
  const { id } = useParams()
  const { state, dispatch } = useApp()
  const [activeTab, setActiveTab] = useState('overview')
  
  const project = projectData[id as keyof typeof projectData]
  
  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h2>
          <Link to="/projects" className="btn-primary">
            Back to Projects
          </Link>
        </div>
      </div>
    )
  }

  const handleStartProject = () => {
    const updatedProject = { ...project, status: 'in-progress' as const }
    dispatch({ type: 'SET_CURRENT_PROJECT', payload: updatedProject })
    
    // Add to user's projects if not already there
    const existingProject = state.projects.find(p => p.id === project.id)
    if (!existingProject) {
      dispatch({ type: 'SET_PROJECTS', payload: [...state.projects, updatedProject] })
    }
  }

  const completedMilestones = project.milestones.filter(m => m.completed).length
  const progressPercentage = (completedMilestones / project.milestones.length) * 100

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100'
      case 'Medium': return 'text-yellow-600 bg-yellow-100'
      case 'Hard': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BookOpen },
    { id: 'milestones', name: 'Milestones', icon: Target },
    { id: 'resources', name: 'Resources', icon: Code }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link 
          to="/projects"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Project Header */}
            <div className="card mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {project.title}
                  </h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="capitalize">{project.field}</span>
                    <span>•</span>
                    <span className="capitalize">{project.level}</span>
                    <span>•</span>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{project.estimatedHours} hours</span>
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(project.difficulty)}`}>
                  {project.difficulty}
                </span>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Technologies You'll Learn</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  </div>
                  <div className="text-lg font-bold text-gray-900">{project.rating}</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-lg font-bold text-gray-900">{project.studentsCompleted}</div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <Target className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-lg font-bold text-gray-900">{project.milestones.length}</div>
                  <div className="text-sm text-gray-600">Milestones</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={handleStartProject}
                  className="btn-primary flex items-center"
                >
                  <Play className="w-4 h-4 mr-2" />
                  {project.status === 'in-progress' ? 'Continue Project' : 'Start Project'}
                </button>
                <button className="btn-secondary flex items-center">
                  <Github className="w-4 h-4 mr-2" />
                  View on GitHub
                </button>
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

              {/* Tab Content */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Learning Goals</h3>
                    <ul className="space-y-2">
                      {project.goals.map((goal, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Prerequisites</h3>
                    <ul className="space-y-2">
                      {project.prerequisites.map((prereq, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{prereq}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Learning Outcomes</h3>
                    <ul className="space-y-2">
                      {project.learningOutcomes.map((outcome, index) => (
                        <li key={index} className="flex items-start">
                          <Target className="w-5 h-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'milestones' && (
                <div className="space-y-4">
                  {project.milestones.map((milestone, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        milestone.completed
                          ? 'border-green-200 bg-green-50'
                          : 'border-gray-200 bg-white hover:border-primary-200'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 ${
                            milestone.completed
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-200 text-gray-600'
                          }`}>
                            {milestone.completed ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <span className="text-sm font-bold">{index + 1}</span>
                            )}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">
                              {milestone.title}
                            </h4>
                            <p className="text-gray-600 text-sm mb-2">
                              {milestone.description}
                            </p>
                            <div className="flex items-center text-xs text-gray-500">
                              <Clock className="w-3 h-3 mr-1" />
                              <span>{milestone.estimatedHours}h estimated</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'resources' && (
                <div className="space-y-4">
                  {project.resources.map((resource, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                          <BookOpen className="w-5 h-5 text-primary-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{resource.title}</h4>
                          <p className="text-sm text-gray-600 capitalize">{resource.type}</p>
                        </div>
                      </div>
                      <a
                        href={resource.url}
                        className="flex items-center text-primary-600 hover:text-primary-700 font-medium"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Open
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Card */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Progress</h3>
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-primary-600 mb-1">
                  {Math.round(progressPercentage)}%
                </div>
                <p className="text-sm text-gray-600">
                  {completedMilestones} of {project.milestones.length} milestones completed
                </p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div 
                  className="bg-primary-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 text-center">
                Estimated time remaining: {project.estimatedHours - Math.round(project.estimatedHours * progressPercentage / 100)}h
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <VSCodeButton 
                  variant="primary" 
                  size="md" 
                  className="w-full"
                  projectPath="/home/project"
                />
                <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Github className="w-4 h-4 mr-2" />
                  Create Repository
                </button>
                <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Users className="w-4 h-4 mr-2" />
                  Join Discussion
                </button>
              </div>
            </div>

            {/* Help & Support */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
              <div className="space-y-3 text-sm">
                <a href="#" className="block text-primary-600 hover:text-primary-700">
                  📚 View Documentation
                </a>
                <a href="#" className="block text-primary-600 hover:text-primary-700">
                  💬 Ask the Community
                </a>
                <a href="#" className="block text-primary-600 hover:text-primary-700">
                  🎥 Watch Tutorial Videos
                </a>
                <a href="#" className="block text-primary-600 hover:text-primary-700">
                  📧 Contact Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}