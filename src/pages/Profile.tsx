import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Mail, 
  Github, 
  Settings, 
  Bell, 
  Shield, 
  Trash2,
  Edit,
  Save,
  X,
  CheckCircle
} from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function Profile() {
  const { state, dispatch } = useApp()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: state.user?.name || '',
    email: state.user?.email || '',
    field: state.user?.field || '',
    level: state.user?.level || ''
  })
  const [notifications, setNotifications] = useState({
    projectUpdates: true,
    achievements: true,
    weeklyProgress: false,
    communityUpdates: true
  })

  const handleSave = () => {
    if (state.user) {
      const updatedUser = { ...state.user, ...formData }
      dispatch({ type: 'SET_USER', payload: updatedUser })
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      name: state.user?.name || '',
      email: state.user?.email || '',
      field: state.user?.field || '',
      level: state.user?.level || ''
    })
    setIsEditing(false)
  }

  const handleConnectGitHub = () => {
    // In a real app, this would initiate OAuth flow
    dispatch({ type: 'CONNECT_GITHUB' })
  }

  const stats = [
    { label: 'Projects Completed', value: state.user?.completedProjects || 0 },
    { label: 'Readiness Score', value: `${state.user?.readinessScore || 0}%` },
    { label: 'Days Active', value: '15' },
    { label: 'Streak', value: '7 days' }
  ]

  const fields = [
    { id: 'frontend', name: 'Frontend Development' },
    { id: 'backend', name: 'Backend Development' },
    { id: 'fullstack', name: 'Full Stack Development' },
    { id: 'uiux', name: 'UI/UX Design' },
    { id: 'cloud', name: 'Cloud Development' }
  ]

  const levels = [
    { id: 'beginner', name: 'Beginner' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'advanced', name: 'Advanced' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center text-primary-600 hover:text-primary-700 font-medium"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      className="flex items-center text-green-600 hover:text-green-700 font-medium"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center text-gray-600 hover:text-gray-700 font-medium"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {state.user?.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Profile Picture</h3>
                    <p className="text-sm text-gray-600 mb-2">Update your profile picture</p>
                    <button className="btn-secondary text-sm">
                      Upload New Photo
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{state.user?.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{state.user?.email}</p>
                    )}
                  
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Field of Interest
                    </label>
                    {isEditing ? (
                      <select
                        value={formData.field}
                        onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        {fields.map((field) => (
                          <option key={field.id} value={field.id}>
                            {field.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <p className="text-gray-900 capitalize">
                        {fields.find(f => f.id === state.user?.field)?.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Experience Level
                    </label>
                    {isEditing ? (
                      <select
                        value={formData.level}
                        onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        {levels.map((level) => (
                          <option key={level.id} value={level.id}>
                            {level.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <p className="text-gray-900 capitalize">
                        {levels.find(l => l.id === state.user?.level)?.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Connected Accounts */}
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Connected Accounts</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <Github className="w-8 h-8 text-gray-700 mr-4" />
                    <div>
                      <h3 className="font-medium text-gray-900">GitHub</h3>
                      <p className="text-sm text-gray-600">
                        {state.user?.githubConnected 
                          ? 'Connected - Sync your projects automatically' 
                          : 'Connect to sync your projects and build your portfolio'
                        }
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {state.user?.githubConnected ? (
                      <>
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <button className="btn-secondary text-sm">
                          Disconnect
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={handleConnectGitHub}
                        className="btn-primary text-sm"
                      >
                        Connect
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Notification Preferences</h2>
              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {key === 'projectUpdates' && 'Project Updates'}
                        {key === 'achievements' && 'Achievement Notifications'}
                        {key === 'weeklyProgress' && 'Weekly Progress Reports'}
                        {key === 'communityUpdates' && 'Community Updates'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {key === 'projectUpdates' && 'Get notified about new projects and updates'}
                        {key === 'achievements' && 'Celebrate your milestones and achievements'}
                        {key === 'weeklyProgress' && 'Receive weekly summaries of your progress'}
                        {key === 'communityUpdates' && 'Stay updated with community news and events'}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => setNotifications({ ...notifications, [key]: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Danger Zone */}
            <div className="card border-red-200">
              <h2 className="text-xl font-bold text-red-900 mb-6">Danger Zone</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div>
                    <h3 className="font-medium text-red-900">Delete Account</h3>
                    <p className="text-sm text-red-700">
                      Permanently delete your account and all associated data
                    </p>
                  </div>
                  <button className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Stats</h3>
              <div className="space-y-4">
                {stats.map((stat, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-600">{stat.label}</span>
                    <span className="font-semibold text-gray-900">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center px-4 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <Settings className="w-4 h-4 mr-3" />
                  Account Settings
                </button>
                <button className="w-full flex items-center px-4 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <Bell className="w-4 h-4 mr-3" />
                  Notification Center
                </button>
                <button className="w-full flex items-center px-4 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <Shield className="w-4 h-4 mr-3" />
                  Privacy Settings
                </button>
              </div>
            </div>

            {/* Help & Support */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Help & Support</h3>
              <div className="space-y-3 text-sm">
                <a href="#" className="block text-primary-600 hover:text-primary-700">
                  📚 Help Center
                </a>
                <a href="#" className="block text-primary-600 hover:text-primary-700">
                  💬 Contact Support
                </a>
                <a href="#" className="block text-primary-600 hover:text-primary-700">
                  🐛 Report a Bug
                </a>
                <a href="#" className="block text-primary-600 hover:text-primary-700">
                  💡 Feature Request
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}