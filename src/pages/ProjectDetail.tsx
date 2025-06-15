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
  Users,
  Upload,
  MessageCircle,
  Send,
  ThumbsUp,
  Reply,
  Filter,
  Search,
  Plus,
  Heart,
  Share2,
  Bookmark
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
    ],
    githubRepo: 'https://github.com/riseintech/portfolio-template',
    liveDemo: 'https://portfolio-template.netlify.app',
    isBookmarked: false,
    likes: 342,
    shares: 89
  }
}

// Mock discussion data
const mockDiscussions = [
  {
    id: '1',
    user: {
      name: 'Sarah Chen',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
      level: 'Intermediate',
      badge: '🌟'
    },
    content: 'I\'m having trouble with the responsive design part. My navigation menu doesn\'t collapse properly on mobile devices. Has anyone else encountered this issue?',
    timestamp: '2 hours ago',
    likes: 12,
    replies: [
      {
        id: '1-1',
        user: {
          name: 'Maria Rodriguez',
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
          level: 'Advanced',
          badge: '🚀'
        },
        content: 'Try using CSS media queries with max-width: 768px. Also make sure you have the viewport meta tag in your HTML head section.',
        timestamp: '1 hour ago',
        likes: 8
      },
      {
        id: '1-2',
        user: {
          name: 'Alex Kim',
          avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
          level: 'Beginner',
          badge: '🌱'
        },
        content: 'I had the same issue! The hamburger menu JavaScript wasn\'t working. Check if you\'re targeting the right CSS classes.',
        timestamp: '45 minutes ago',
        likes: 5
      }
    ],
    tags: ['responsive-design', 'mobile', 'navigation'],
    isLiked: false,
    category: 'question'
  },
  {
    id: '2',
    user: {
      name: 'Jennifer Park',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
      level: 'Beginner',
      badge: '🌱'
    },
    content: 'Just finished my portfolio! 🎉 It took me 3 weeks but I learned so much. The CSS animations were challenging but totally worth it. Thanks to everyone who helped!',
    timestamp: '5 hours ago',
    likes: 28,
    replies: [
      {
        id: '2-1',
        user: {
          name: 'Lisa Wang',
          avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
          level: 'Intermediate',
          badge: '🌟'
        },
        content: 'Congratulations! 🎊 Would love to see your portfolio. Can you share the link?',
        timestamp: '4 hours ago',
        likes: 6
      }
    ],
    tags: ['success', 'portfolio', 'css-animations'],
    isLiked: true,
    category: 'success'
  },
  {
    id: '3',
    user: {
      name: 'Emma Thompson',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
      level: 'Advanced',
      badge: '🚀'
    },
    content: 'Pro tip: Use CSS Grid for the main layout and Flexbox for component-level layouts. This combination gives you the best of both worlds for responsive design!',
    timestamp: '1 day ago',
    likes: 45,
    replies: [],
    tags: ['css-grid', 'flexbox', 'layout', 'tips'],
    isLiked: false,
    category: 'tip'
  }
]

export default function ProjectDetail() {
  const { id } = useParams()
  const { state, dispatch } = useApp()
  const [activeTab, setActiveTab] = useState('overview')
  const [discussions, setDiscussions] = useState(mockDiscussions)
  const [newPost, setNewPost] = useState('')
  const [replyTo, setReplyTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState('')
  const [discussionFilter, setDiscussionFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [projectLikes, setProjectLikes] = useState(342)
  const [hasLiked, setHasLiked] = useState(false)
  
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

  const handleGitHubClick = () => {
    // Dynamic GitHub functionality
    if (project.githubRepo) {
      window.open(project.githubRepo, '_blank')
    } else {
      // Create new repository
      const repoName = project.title.toLowerCase().replace(/\s+/g, '-')
      const description = encodeURIComponent(project.description)
      const githubUrl = `https://github.com/new?name=${repoName}&description=${description}&visibility=public`
      window.open(githubUrl, '_blank')
    }
  }

  const handleLiveDemo = () => {
    if (project.liveDemo) {
      window.open(project.liveDemo, '_blank')
    } else {
      alert('Deploy your project first to see the live demo! Use GitHub Pages or Netlify for free hosting.')
    }
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    // In real app, save to user's bookmarks
  }

  const handleLike = () => {
    if (hasLiked) {
      setProjectLikes(prev => prev - 1)
    } else {
      setProjectLikes(prev => prev + 1)
    }
    setHasLiked(!hasLiked)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: project.title,
        text: project.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Project link copied to clipboard!')
    }
  }

  const handlePostSubmit = () => {
    if (!newPost.trim()) return

    const newDiscussion = {
      id: Date.now().toString(),
      user: {
        name: state.user?.name || 'You',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
        level: state.user?.level || 'Beginner',
        badge: '🌱'
      },
      content: newPost,
      timestamp: 'Just now',
      likes: 0,
      replies: [],
      tags: [],
      isLiked: false,
      category: 'question'
    }

    setDiscussions(prev => [newDiscussion, ...prev])
    setNewPost('')
  }

  const handleReplySubmit = (discussionId: string) => {
    if (!replyContent.trim()) return

    const newReply = {
      id: `${discussionId}-${Date.now()}`,
      user: {
        name: state.user?.name || 'You',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
        level: state.user?.level || 'Beginner',
        badge: '🌱'
      },
      content: replyContent,
      timestamp: 'Just now',
      likes: 0
    }

    setDiscussions(prev => prev.map(discussion => 
      discussion.id === discussionId 
        ? { ...discussion, replies: [...discussion.replies, newReply] }
        : discussion
    ))
    
    setReplyContent('')
    setReplyTo(null)
  }

  const handleLikeDiscussion = (discussionId: string) => {
    setDiscussions(prev => prev.map(discussion => 
      discussion.id === discussionId 
        ? { 
            ...discussion, 
            likes: discussion.isLiked ? discussion.likes - 1 : discussion.likes + 1,
            isLiked: !discussion.isLiked 
          }
        : discussion
    ))
  }

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesFilter = discussionFilter === 'all' || discussion.category === discussionFilter
    const matchesSearch = discussion.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discussion.user.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

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
    { id: 'resources', name: 'Resources', icon: Code },
    { id: 'discussion', name: 'Discussion', icon: MessageCircle, count: discussions.length }
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
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(project.difficulty)}`}>
                    {project.difficulty}
                  </span>
                </div>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                {project.description}
              </p>

              {/* Project Stats */}
              <div className="flex items-center space-x-6 mb-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Heart className={`w-4 h-4 mr-1 ${hasLiked ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                  <span>{projectLikes} likes</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{project.studentsCompleted} completed</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                  <span>{project.rating} rating</span>
                </div>
              </div>

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

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleStartProject}
                  className="btn-primary flex items-center"
                >
                  <Play className="w-4 h-4 mr-2" />
                  {project.status === 'in-progress' ? 'Continue Project' : 'Start Project'}
                </button>
                
                <button
                  onClick={handleGitHubClick}
                  className="btn-secondary flex items-center"
                >
                  <Github className="w-4 h-4 mr-2" />
                  {project.githubRepo ? 'View Repository' : 'Create Repository'}
                </button>

                <button
                  onClick={handleLiveDemo}
                  className="btn-secondary flex items-center"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {project.liveDemo ? 'Live Demo' : 'Deploy Project'}
                </button>

                <button
                  onClick={handleLike}
                  className={`btn-secondary flex items-center ${hasLiked ? 'bg-red-50 text-red-600 border-red-200' : ''}`}
                >
                  <Heart className={`w-4 h-4 mr-2 ${hasLiked ? 'fill-current' : ''}`} />
                  {hasLiked ? 'Liked' : 'Like'}
                </button>

                <button
                  onClick={handleBookmark}
                  className={`btn-secondary flex items-center ${isBookmarked ? 'bg-yellow-50 text-yellow-600 border-yellow-200' : ''}`}
                >
                  <Bookmark className={`w-4 h-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
                  {isBookmarked ? 'Saved' : 'Save'}
                </button>

                <button
                  onClick={handleShare}
                  className="btn-secondary flex items-center"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
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
                        {tab.count && (
                          <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                            {tab.count}
                          </span>
                        )}
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

              {activeTab === 'discussion' && (
                <div className="space-y-6">
                  {/* Discussion Header */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">Project Discussion</h3>
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          placeholder="Search discussions..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <select
                        value={discussionFilter}
                        onChange={(e) => setDiscussionFilter(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="all">All Posts</option>
                        <option value="question">Questions</option>
                        <option value="tip">Tips</option>
                        <option value="success">Success Stories</option>
                      </select>
                    </div>
                  </div>

                  {/* New Post */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <img
                        src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop"
                        alt="Your avatar"
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <textarea
                          value={newPost}
                          onChange={(e) => setNewPost(e.target.value)}
                          placeholder="Ask a question, share a tip, or celebrate your progress..."
                          className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          rows={3}
                        />
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <span>💡 Tip: Be specific about your issue for better help</span>
                          </div>
                          <button
                            onClick={handlePostSubmit}
                            disabled={!newPost.trim()}
                            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                          >
                            <Send className="w-4 h-4 mr-2" />
                            Post
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Discussion Posts */}
                  <div className="space-y-4">
                    {filteredDiscussions.map((discussion) => (
                      <motion.div
                        key={discussion.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white border border-gray-200 rounded-lg p-6"
                      >
                        {/* Post Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <img
                              src={discussion.user.avatar}
                              alt={discussion.user.name}
                              className="w-10 h-10 rounded-full"
                            />
                            <div>
                              <div className="flex items-center space-x-2">
                                <h4 className="font-semibold text-gray-900">{discussion.user.name}</h4>
                                <span className="text-lg">{discussion.user.badge}</span>
                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                  {discussion.user.level}
                                </span>
                              </div>
                              <p className="text-sm text-gray-500">{discussion.timestamp}</p>
                            </div>
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                            discussion.category === 'question' ? 'bg-blue-100 text-blue-800' :
                            discussion.category === 'tip' ? 'bg-green-100 text-green-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {discussion.category}
                          </div>
                        </div>

                        {/* Post Content */}
                        <p className="text-gray-700 mb-4">{discussion.content}</p>

                        {/* Tags */}
                        {discussion.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {discussion.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Post Actions */}
                        <div className="flex items-center space-x-4 mb-4">
                          <button
                            onClick={() => handleLikeDiscussion(discussion.id)}
                            className={`flex items-center space-x-1 text-sm ${
                              discussion.isLiked ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
                            }`}
                          >
                            <ThumbsUp className={`w-4 h-4 ${discussion.isLiked ? 'fill-current' : ''}`} />
                            <span>{discussion.likes}</span>
                          </button>
                          <button
                            onClick={() => setReplyTo(replyTo === discussion.id ? null : discussion.id)}
                            className="flex items-center space-x-1 text-sm text-gray-500 hover:text-primary-600"
                          >
                            <Reply className="w-4 h-4" />
                            <span>Reply</span>
                          </button>
                          <span className="text-sm text-gray-500">
                            {discussion.replies.length} replies
                          </span>
                        </div>

                        {/* Reply Form */}
                        {replyTo === discussion.id && (
                          <div className="border-t border-gray-200 pt-4 mb-4">
                            <div className="flex items-start space-x-3">
                              <img
                                src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop"
                                alt="Your avatar"
                                className="w-8 h-8 rounded-full"
                              />
                              <div className="flex-1">
                                <textarea
                                  value={replyContent}
                                  onChange={(e) => setReplyContent(e.target.value)}
                                  placeholder="Write your reply..."
                                  className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                  rows={2}
                                />
                                <div className="flex items-center justify-end space-x-2 mt-2">
                                  <button
                                    onClick={() => setReplyTo(null)}
                                    className="text-sm text-gray-500 hover:text-gray-700"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() => handleReplySubmit(discussion.id)}
                                    disabled={!replyContent.trim()}
                                    className="btn-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                    Reply
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Replies */}
                        {discussion.replies.length > 0 && (
                          <div className="border-t border-gray-200 pt-4 space-y-4">
                            {discussion.replies.map((reply) => (
                              <div key={reply.id} className="flex items-start space-x-3">
                                <img
                                  src={reply.user.avatar}
                                  alt={reply.user.name}
                                  className="w-8 h-8 rounded-full"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <h5 className="font-medium text-gray-900 text-sm">{reply.user.name}</h5>
                                    <span className="text-sm">{reply.user.badge}</span>
                                    <span className="text-xs text-gray-500">{reply.timestamp}</span>
                                  </div>
                                  <p className="text-gray-700 text-sm">{reply.content}</p>
                                  <div className="flex items-center space-x-2 mt-2">
                                    <button className="flex items-center space-x-1 text-xs text-gray-500 hover:text-red-600">
                                      <ThumbsUp className="w-3 h-3" />
                                      <span>{reply.likes}</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {filteredDiscussions.length === 0 && (
                    <div className="text-center py-8">
                      <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No discussions found</h3>
                      <p className="text-gray-600">
                        {searchTerm || discussionFilter !== 'all' 
                          ? 'Try adjusting your search or filter'
                          : 'Be the first to start a discussion!'
                        }
                      </p>
                    </div>
                  )}
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
                <button 
                  onClick={handleGitHubClick}
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Github className="w-4 h-4 mr-2" />
                  {project.githubRepo ? 'View Repository' : 'Create Repository'}
                </button>
                <Link
                  to={`/projects/${project.id}/evaluate/milestone-1`}
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Submit Code for Review
                </Link>
                <button 
                  onClick={() => setActiveTab('discussion')}
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Join Discussion ({discussions.length})
                </button>
              </div>
            </div>

            {/* Community Stats */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Community</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Active Learners</span>
                  <span className="font-semibold text-gray-900">234</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Questions Asked</span>
                  <span className="font-semibold text-gray-900">89</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Success Stories</span>
                  <span className="font-semibold text-gray-900">156</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Average Rating</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="font-semibold text-gray-900">{project.rating}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Help & Support */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
              <div className="space-y-3 text-sm">
                <a href="#" className="block text-primary-600 hover:text-primary-700">
                  📚 View Documentation
                </a>
                <button 
                  onClick={() => setActiveTab('discussion')}
                  className="block text-primary-600 hover:text-primary-700 w-full text-left"
                >
                  💬 Ask the Community
                </button>
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