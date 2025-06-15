// VS Code integration utilities
export const openInVSCode = async (projectPath?: string) => {
  try {
    // Method 1: Try to open with vscode:// protocol
    const vscodeUrl = projectPath 
      ? `vscode://file/${encodeURIComponent(projectPath)}`
      : 'vscode://file/' + encodeURIComponent(window.location.origin);
    
    window.open(vscodeUrl, '_blank');
    
    // Fallback: Show instructions if protocol doesn't work
    setTimeout(() => {
      showVSCodeInstructions();
    }, 2000);
    
  } catch (error) {
    console.error('Failed to open VS Code:', error);
    showVSCodeInstructions();
  }
};

export const downloadProject = () => {
  // Create a download link for the project files
  const projectData = {
    message: 'Download this project and open it in VS Code locally',
    instructions: [
      '1. Download the project files',
      '2. Extract to your desired folder',
      '3. Open VS Code',
      '4. File → Open Folder → Select the extracted folder',
      '5. Install recommended extensions when prompted',
      '6. Run "npm install" in the terminal',
      '7. Run "npm run dev" to start coding!'
    ]
  };
  
  // For now, show instructions - in a real app, this would trigger a zip download
  alert(`${projectData.message}\n\n${projectData.instructions.join('\n')}`);
};

export const showVSCodeInstructions = () => {
  const instructions = `
🚀 Open in VS Code Locally:

Option 1 - Clone from GitHub:
1. Push this project to GitHub
2. Clone: git clone <your-repo-url>
3. Open in VS Code: code <folder-name>

Option 2 - Download Project:
1. Download project files
2. Extract to folder
3. Open VS Code → File → Open Folder
4. Select the project folder

Option 3 - VS Code Protocol:
1. Install VS Code if not installed
2. Make sure VS Code is set as default for .code files
3. Try the "Start Coding" button again

Next Steps:
• Run: npm install
• Run: npm run dev
• Start coding! 🎉
  `;
  
  // Create a modal or use browser alert
  if (confirm(instructions + '\n\nWould you like to see setup instructions?')) {
    window.open('https://code.visualstudio.com/docs/setup/setup-overview', '_blank');
  }
};

export const createGitHubRepo = async () => {
  // This would integrate with GitHub API in a real app
  const repoInstructions = `
📁 Create GitHub Repository:

1. Go to github.com/new
2. Repository name: riseintech-portfolio
3. Description: My RiseInTech learning journey
4. Make it public (to showcase your work!)
5. Initialize with README: ✓

Then in your local VS Code terminal:
git remote add origin <your-repo-url>
git add .
git commit -m "Initial commit - RiseInTech project"
git push -u origin main

This will sync your local work with GitHub! 🚀
  `;
  
  alert(repoInstructions);
  window.open('https://github.com/new', '_blank');
};

// Check if VS Code is available
export const checkVSCodeAvailability = (): boolean => {
  // Check if running in a browser that supports custom protocols
  return typeof window !== 'undefined' && 'navigator' in window;
};

// Generate project export data
export const generateProjectExport = () => {
  return {
    name: 'RiseInTech Project',
    description: 'AI-powered learning platform for women in tech',
    files: [
      'package.json',
      'src/',
      'public/',
      'index.html',
      'tailwind.config.js',
      'tsconfig.json',
      'vite.config.ts'
    ],
    setupInstructions: [
      'npm install',
      'npm run dev'
    ]
  };
};