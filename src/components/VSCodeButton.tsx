import React, { useState } from 'react';
import { Code, Download, Github, ExternalLink, CheckCircle, Globe, FolderPlus } from 'lucide-react';
import { 
  openInVSCode, 
  openVSCodeWeb, 
  createNewProject, 
  createGitHubRepo, 
  showVSCodeInstructions 
} from '../utils/vscode';

interface VSCodeButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  projectPath?: string;
  className?: string;
}

export default function VSCodeButton({ 
  variant = 'primary', 
  size = 'md', 
  projectPath,
  className = '' 
}: VSCodeButtonProps) {
  const [isClicked, setIsClicked] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const handleStartCoding = async () => {
    setIsClicked(true);
    
    // Try to open VS Code directly
    await openInVSCode(projectPath);
    
    // Show success state briefly
    setTimeout(() => {
      setIsClicked(false);
    }, 3000);
  };

  const handleShowOptions = () => {
    setShowOptions(!showOptions);
  };

  const baseClasses = `
    inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 
    transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2
  `;

  const variantClasses = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl focus:ring-primary-500',
    secondary: 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 shadow-md hover:shadow-lg focus:ring-gray-500'
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <div className="relative">
      {/* Main Button */}
      <button
        onClick={handleStartCoding}
        disabled={isClicked}
        className={`
          ${baseClasses} 
          ${variantClasses[variant]} 
          ${sizeClasses[size]} 
          ${className}
          ${isClicked ? 'opacity-75 cursor-not-allowed' : ''}
        `}
      >
        {isClicked ? (
          <>
            <CheckCircle className="w-4 h-4 mr-2 animate-pulse" />
            Opening VS Code...
          </>
        ) : (
          <>
            <Code className="w-4 h-4 mr-2" />
            Start Coding
          </>
        )}
      </button>

      {/* Options Dropdown */}
      <div className="mt-2">
        <button
          onClick={handleShowOptions}
          className="text-sm text-gray-600 hover:text-gray-800 underline"
        >
          More coding options
        </button>
        
        {showOptions && (
          <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Choose Your Coding Environment</h3>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    openInVSCode(projectPath);
                    setShowOptions(false);
                  }}
                  className="w-full flex items-center px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  <Code className="w-4 h-4 mr-3 text-blue-600" />
                  <div>
                    <div className="font-medium">Open VS Code Desktop</div>
                    <div className="text-xs text-gray-500">Best experience (requires installation)</div>
                  </div>
                </button>
                
                <button
                  onClick={() => {
                    openVSCodeWeb();
                    setShowOptions(false);
                  }}
                  className="w-full flex items-center px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  <Globe className="w-4 h-4 mr-3 text-green-600" />
                  <div>
                    <div className="font-medium">Open VS Code Web</div>
                    <div className="text-xs text-gray-500">Code in browser (no installation needed)</div>
                  </div>
                </button>
                
                <button
                  onClick={() => {
                    createNewProject();
                    setShowOptions(false);
                  }}
                  className="w-full flex items-center px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  <Download className="w-4 h-4 mr-3 text-purple-600" />
                  <div>
                    <div className="font-medium">Download Starter Project</div>
                    <div className="text-xs text-gray-500">Get template files to start coding</div>
                  </div>
                </button>
                
                <button
                  onClick={() => {
                    createGitHubRepo();
                    setShowOptions(false);
                  }}
                  className="w-full flex items-center px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  <Github className="w-4 h-4 mr-3 text-gray-800" />
                  <div>
                    <div className="font-medium">Create GitHub Repository</div>
                    <div className="text-xs text-gray-500">Set up version control and portfolio</div>
                  </div>
                </button>
                
                <button
                  onClick={() => {
                    showVSCodeInstructions();
                    setShowOptions(false);
                  }}
                  className="w-full flex items-center px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  <ExternalLink className="w-4 h-4 mr-3 text-orange-600" />
                  <div>
                    <div className="font-medium">Setup Instructions</div>
                    <div className="text-xs text-gray-500">Step-by-step coding setup guide</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}