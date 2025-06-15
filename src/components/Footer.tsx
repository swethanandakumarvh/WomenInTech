import { Link } from 'react-router-dom'
import { Sparkles, Heart, Github, Twitter, Linkedin, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Women in Tech
                </span>
                <span className="text-sm text-gray-400 font-medium">Empowering Future Leaders</span>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Empowering women to break into tech through hands-on, project-based learning. 
              Build real skills, create a portfolio, and launch your tech career with confidence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-pink-600 transition-all duration-200">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-500 transition-all duration-200">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 transition-all duration-200">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-pink-500 transition-all duration-200">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-pink-400">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/dashboard" className="text-gray-300 hover:text-pink-400 transition-colors">Dashboard</Link></li>
              <li><Link to="/projects" className="text-gray-300 hover:text-pink-400 transition-colors">Projects</Link></li>
              <li><Link to="/portfolio" className="text-gray-300 hover:text-pink-400 transition-colors">Portfolio</Link></li>
              <li><Link to="/profile" className="text-gray-300 hover:text-pink-400 transition-colors">Profile</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-purple-400">Support</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">Community</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm flex items-center">
            © 2025 Women in Tech. Made with <Heart className="w-4 h-4 inline text-pink-500 mx-1" /> for women in tech.
          </p>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">
            Empowering the next generation of female developers
          </p>
        </div>
      </div>
    </footer>
  )
}