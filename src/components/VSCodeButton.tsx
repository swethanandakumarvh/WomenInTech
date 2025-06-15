import React, { useState } from 'react';
import { Code, Download, Github, ExternalLink, CheckCircle } from 'lucide-react';
import { openInVSCode, downloadProject, createGitHubRepo, showVSCodeInstructions } from '../utils/vscode';

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
    }, 2000);
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
          More options
        </button>
        
        {showOptions && (
          <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Development Options</h3>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    openInVSCode(projectPath);
                    setShowOptions(false);
                  }}
                  className="w-full flex items-center px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  <Code className="w-4 h-4 mr-3 text-blue-600" />
                  Open in VS Code
                </button>
                
                <button
                  onClick={() => {
                    createGitHubRepo();
                    setShowOptions(false);
                  }}
                  className="w-full flex items-center px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  <Github className="w-4 h-4 mr-3 text-gray-800" />
                  Create GitHub Repo
                </button>
                
                <button
                  onClick={() => {
                    downloadProject();
                    setShowOptions(false);
                  }}
                  className="w-full flex items-center px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  <Download className="w-4 h-4 mr-3 text-green-600" />
                  Download Project
                </button>
                
                <button
                  onClick={() => {
                    showVSCodeInstructions();
                    setShowOptions(false);
                  }}
                  className="w-full flex items-center px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  <ExternalLink className="w-4 h-4 mr-3 text-purple-600" />
                  Setup Instructions
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}