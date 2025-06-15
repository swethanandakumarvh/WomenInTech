import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Search, 
  Clock, 
  Star, 
  Play, 
  CheckCircle,
  Code,
  Plus
} from 'lucide-react'
import { useApp } from '../context/AppContext'

const allProjects = [
  {
    id: '1',
    title: 'Personal Portfolio Website',
    description: 'Build a responsive portfolio website to showcase your projects and skills',
    field: 'frontend',
    level: 'beginner',
    status: 'not-started' as const,
    progress: 0,
    estimatedHours: 20,
    technologies: ['HTML', 'CSS', 'JavaScript'],
    goals: ['Learn HTML structure', 'Master CSS styling', 'Add interactivity with JavaScript'],
    milestones: ['Setup project structure', 'Create responsive layout', 'Add animations', 'Deploy to GitHub Pages'],
    difficulty: 'Easy',
    rating: 4.8
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'Create a full-featured todo application with local storage',
    field: 'frontend',
    level: 'intermediate',
    status: 'not-started' as const,
    progress: 0,
    estimatedHours: 25,
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    goals: ['Master React hooks', 'Implement state management', 'Create reusable components'],
    milestones: ['Setup React project', 'Build components', 'Add CRUD operations', 'Implement filtering'],
    difficulty: 'Medium',
    rating: 4.9
  },
  {
    id: '3',
    title: 'REST API for Blog',
    description: 'Build a RESTful API with authentication and CRUD operations',
    field: 'backend',
    level: 'intermediate',
    status: 'not-started' as const,
    progress: 0,
    estimatedHours: 30,
    technologies: ['Node.js', 'Express', 'MongoDB'],
    goals: ['Learn API design', 'Implement authentication', 'Database integration'],
    milestones: ['Setup Express server', 'Create routes', 'Add authentication', 'Deploy to cloud'],
    difficulty: 'Medium',
    rating: 4.7
  },
  {
    id: '4',
    title: 'E-commerce Platform',
    description: 'Full-stack e-commerce application with payment integration',
    field: 'fullstack',
    level: 'advanced',
    status: 'not-started' as const,
    progress: 0,
    estimatedHours: 60,
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    goals: ['Full-stack development', 'Payment processing', 'Advanced state management'],
    milestones: ['Frontend setup', 'Backend API', 'Database design', 'Payment integration'],
    difficulty: 'Hard',
    rating: 4.6
  },
  {
    id: '5',
    title: 'Mobile App Design System',
    description: 'Create a comprehensive design system for mobile applications',
    field: 'uiux',
    level: 'intermediate',
    status: 'not-started' as const,
    progress: 0,
    estimatedHours: 35,
    technologies: ['Figma', 'Design Tokens', 'Prototyping'],
    goals: ['Design system principles', 'Component library', 'User testing'],
    milestones: ['Research phase', 'Component design', 'Documentation', 'Prototype testing'],
    difficulty: 'Medium',
    rating: 4.8
  },
  {
    id: '6',
    title: 'Cloud-Native Web App',
    description: 'Deploy a scalable web application using cloud services',
    field: 'cloud',
    level: 'advanced',
    status: 'not-started' as const,
    progress: 0,
    estimatedHours: 45,
    technologies: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
    goals: ['Cloud architecture', 'Container orchestration', 'DevOps practices'],
    milestones: ['Containerization', 'Cloud deployment', 'Monitoring setup', 'CI/CD pipeline'],
    difficulty: 'Hard',
    rating: 4.5
  }
]

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedField, setSelectedField] = useState('all')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const { state, dispatch } = useApp()

  const filteredProjects = allProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesField = selectedField === 'all' || project.field === selectedField
    const matchesLevel = selectedLevel === 'all' || project.level === selectedLevel
    const matchesDifficulty = selectedDifficulty === 'all' || project.difficulty === selectedDifficulty

    return matchesSearch && matchesField && matchesLevel && matchesDifficulty
  })

  const handleStartProject = (project: any) => {
    const updatedProject = { ...project, status: 'in-progress' as const }
    dispatch({ type: 'SET_CURRENT_PROJECT', payload: updatedProject })
    
    // Add to user's projects if not already there
    const existingProject = state.projects.find(p => p.id === project.id)
    if (!existingProject) {
      dispatch({ type: 'SET_PROJECTS', payload: [...state.projects, updatedProject] })
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100'
      case 'Medium': return 'text-yellow-600 bg-yellow-100'
      case 'Hard': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getFieldIcon = (field: string) => {
    switch (field) {
      case 'frontend': return '🎨'
      case 'backend': return '⚙️'
      case 'fullstack': return '🔧'
      case 'uiux': return '✨'
      case 'cloud': return '☁️'
      default: return '💻'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Projects</h1>
          <p className="text-gray-600">
            Discover hands-on projects tailored to your learning goals
          </p>
        </div>

        {/* Search and Filters */}
        <div className="card mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Field Filter */}
            <select
              value={selectedField}
              onChange={(e) => setSelectedField(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Fields</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="fullstack">Full Stack</option>
              <option value="uiux">UI/UX</option>
              <option value="cloud">Cloud</option>
            </select>

            {/* Level Filter */}
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            {/* Difficulty Filter */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card hover:shadow-xl transition-all duration-300"
            >
              {/* Project Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{getFieldIcon(project.field)}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {project.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500 capitalize">{project.field}</span>
                      <span className="text-xs text-gray-300">•</span>
                      <span className="text-xs text-gray-500 capitalize">{project.level}</span>
                    </div>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(project.difficulty)}`}>
                  {project.difficulty}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    +{project.technologies.length - 3} more
                  </span>
                )}
              </div>

              {/* Project Stats */}
              <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{project.estimatedHours}h</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                  <span>{project.rating}</span>
                </div>
              </div>

              {/* Progress Bar (if started) */}
              {project.progress > 0 && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-2">
                {project.status === 'completed' ? (
                  <Link
                    to={`/projects/${project.id}`}
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-green-100 text-green-800 rounded-lg font-medium hover:bg-green-200 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Completed
                  </Link>
                ) : project.status === 'in-progress' ? (
                  <Link
                    to={`/projects/${project.id}`}
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-medium hover:bg-blue-200 transition-colors"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Continue
                  </Link>
                ) : (
                  <button
                    onClick={() => handleStartProject(project)}
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Start Project
                  </button>
                )}
                
                <Link
                  to={`/projects/${project.id}`}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <Code className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or filters
            </p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedField('all')
                setSelectedLevel('all')
                setSelectedDifficulty('all')
              }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}