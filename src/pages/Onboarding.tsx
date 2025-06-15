import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Code, 
  Server, 
  Palette, 
  Cloud, 
  Layers,
  ArrowRight,
  ArrowLeft,
  CheckCircle
} from 'lucide-react'
import { useApp } from '../context/AppContext'

const fields = [
  {
    id: 'frontend',
    name: 'Frontend Development',
    description: 'Build beautiful, interactive user interfaces',
    icon: Code,
    technologies: ['React', 'Vue', 'JavaScript', 'CSS', 'HTML']
  },
  {
    id: 'backend',
    name: 'Backend Development',
    description: 'Create robust server-side applications',
    icon: Server,
    technologies: ['Node.js', 'Python', 'Java', 'Databases', 'APIs']
  },
  {
    id: 'fullstack',
    name: 'Full Stack Development',
    description: 'Master both frontend and backend development',
    icon: Layers,
    technologies: ['React', 'Node.js', 'Databases', 'DevOps', 'APIs']
  },
  {
    id: 'uiux',
    name: 'UI/UX Design',
    description: 'Design intuitive and beautiful user experiences',
    icon: Palette,
    technologies: ['Figma', 'Adobe XD', 'Prototyping', 'User Research', 'Design Systems']
  },
  {
    id: 'cloud',
    name: 'Cloud Development',
    description: 'Build scalable applications in the cloud',
    icon: Cloud,
    technologies: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'DevOps']
  }
]

const levels = [
  {
    id: 'beginner',
    name: 'Beginner',
    description: 'New to programming and tech',
    duration: '3-6 months to job-ready'
  },
  {
    id: 'intermediate',
    name: 'Intermediate',
    description: 'Some coding experience or bootcamp graduate',
    duration: '2-4 months to job-ready'
  },
  {
    id: 'advanced',
    name: 'Advanced',
    description: 'Experienced developer looking to specialize',
    duration: '1-2 months to job-ready'
  }
]

export default function Onboarding() {
  const [step, setStep] = useState(1)
  const [selectedField, setSelectedField] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const navigate = useNavigate()
  const { dispatch } = useApp()

  const handleComplete = () => {
    // Create user profile
    const user = {
      id: '1',
      name,
      email,
      field: selectedField,
      level: selectedLevel,
      readinessScore: 0,
      completedProjects: 0,
      githubConnected: false
    }

    dispatch({ type: 'SET_USER', payload: user })
    dispatch({ type: 'COMPLETE_ONBOARDING' })
    
    // Generate initial projects based on selection
    const mockProjects = [
      {
        id: '1',
        title: `${selectedField === 'frontend' ? 'Personal Portfolio Website' : 
                selectedField === 'backend' ? 'REST API for Todo App' :
                selectedField === 'fullstack' ? 'Full Stack Blog Platform' :
                selectedField === 'uiux' ? 'Mobile App Design System' :
                'Cloud-Deployed Web App'}`,
        description: `A ${selectedLevel}-level project to get you started with ${fields.find(f => f.id === selectedField)?.name}`,
        field: selectedField,
        level: selectedLevel,
        status: 'not-started' as const,
        progress: 0,
        estimatedHours: selectedLevel === 'beginner' ? 20 : selectedLevel === 'intermediate' ? 15 : 10,
        technologies: fields.find(f => f.id === selectedField)?.technologies.slice(0, 3) || [],
        goals: [
          'Learn fundamental concepts',
          'Build a working application',
          'Deploy your project',
          'Document your code'
        ],
        milestones: [
          'Project setup and planning',
          'Core functionality implementation',
          'Styling and user experience',
          'Testing and deployment'
        ]
      }
    ]

    dispatch({ type: 'SET_PROJECTS', payload: mockProjects })
    navigate('/dashboard')
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Welcome to RiseInTech</h1>
            <span className="text-sm text-gray-600">Step {step} of 3</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {step === 1 && (
            <div className="card">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What field interests you most?
              </h2>
              <p className="text-gray-600 mb-8">
                Choose the area of tech you'd like to focus on. Don't worry, you can always explore other fields later!
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fields.map((field) => {
                  const Icon = field.icon
                  return (
                    <div
                      key={field.id}
                      onClick={() => setSelectedField(field.id)}
                      className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        selectedField === field.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center mb-3">
                        <Icon className={`w-8 h-8 mr-3 ${
                          selectedField === field.id ? 'text-primary-600' : 'text-gray-600'
                        }`} />
                        <h3 className="text-xl font-semibold text-gray-900">
                          {field.name}
                        </h3>
                      </div>
                      <p className="text-gray-600 mb-4">{field.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {field.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="card">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What's your experience level?
              </h2>
              <p className="text-gray-600 mb-8">
                This helps us create projects that are perfectly matched to your current skills.
              </p>
              
              <div className="space-y-4">
                {levels.map((level) => (
                  <div
                    key={level.id}
                    onClick={() => setSelectedLevel(level.id)}
                    className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      selectedLevel === level.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {level.name}
                        </h3>
                        <p className="text-gray-600 mb-1">{level.description}</p>
                        <p className="text-sm text-primary-600 font-medium">{level.duration}</p>
                      </div>
                      {selectedLevel === level.id && (
                        <CheckCircle className="w-6 h-6 text-primary-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="card">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Tell us about yourself
              </h2>
              <p className="text-gray-600 mb-8">
                Just a few details to personalize your learning experience.
              </p>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Your Learning Path Summary</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>Field:</strong> {fields.find(f => f.id === selectedField)?.name}</p>
                    <p><strong>Level:</strong> {levels.find(l => l.id === selectedLevel)?.name}</p>
                    <p><strong>Timeline:</strong> {levels.find(l => l.id === selectedLevel)?.duration}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            disabled={step === 1}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              step === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </button>
          
          {step < 3 ? (
            <button
              onClick={nextStep}
              disabled={
                (step === 1 && !selectedField) ||
                (step === 2 && !selectedLevel)
              }
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          ) : (
            <button
              onClick={handleComplete}
              disabled={!name || !email}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Complete Setup
              <CheckCircle className="w-4 h-4 ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}