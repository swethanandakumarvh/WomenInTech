// VS Code integration utilities
export const openInVSCode = async (projectPath?: string) => {
  try {
    // Method 1: Try to open with vscode:// protocol (works if VS Code is installed)
    const vscodeUrl = `vscode://file${projectPath || window.location.pathname}`;
    
    // Create a temporary link and click it
    const link = document.createElement('a');
    link.href = vscodeUrl;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show success message
    showSuccessMessage();
    
    // Fallback: Show instructions after a delay
    setTimeout(() => {
      showVSCodeInstructions();
    }, 3000);
    
  } catch (error) {
    console.error('Failed to open VS Code:', error);
    showVSCodeInstructions();
  }
};

export const openVSCodeWeb = () => {
  // Open VS Code for the Web (vscode.dev)
  const url = 'https://vscode.dev/';
  window.open(url, '_blank', 'width=1200,height=800');
  
  setTimeout(() => {
    alert(`
🌐 VS Code Web Opened!

Next Steps:
1. In VS Code Web, click "Open Folder"
2. Choose "GitHub" or "Clone Repository"
3. Enter your repository URL
4. Start coding in the browser!

Or create a new project:
1. Click "New File" 
2. Create index.html, style.css, script.js
3. Start building your project!
    `);
  }, 1000);
};

export const createNewProject = () => {
  // Generate starter project files
  const starterFiles = {
    'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My RiseInTech Project</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>Welcome to My Project</h1>
    </header>
    
    <main>
        <section class="hero">
            <h2>Hello, World!</h2>
            <p>This is my first RiseInTech project.</p>
            <button id="clickMe">Click Me!</button>
        </section>
    </main>
    
    <script src="script.js"></script>
</body>
</html>`,
    
    'style.css': `/* Reset and base styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
}

header {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 1rem;
    text-align: center;
}

header h1 {
    color: white;
    font-size: 2rem;
}

main {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
    padding: 2rem;
}

.hero {
    background: white;
    padding: 3rem;
    border-radius: 15px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    text-align: center;
    max-width: 500px;
}

.hero h2 {
    color: #667eea;
    margin-bottom: 1rem;
    font-size: 2.5rem;
}

.hero p {
    margin-bottom: 2rem;
    font-size: 1.1rem;
    color: #666;
}

button {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 12px 30px;
    border-radius: 25px;
    font-size: 1rem;
    cursor: pointer;
    transition: transform 0.3s ease;
}

button:hover {
    transform: translateY(-2px);
}

/* Responsive design */
@media (max-width: 768px) {
    .hero {
        padding: 2rem;
        margin: 1rem;
    }
    
    .hero h2 {
        font-size: 2rem;
    }
}`,
    
    'script.js': `// Welcome to JavaScript!
console.log('🚀 Project loaded successfully!');

// Get the button element
const button = document.getElementById('clickMe');

// Add click event listener
button.addEventListener('click', function() {
    // Change the button text
    if (button.textContent === 'Click Me!') {
        button.textContent = 'Great Job! 🎉';
        button.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
        
        // Show success message
        showSuccessMessage();
    } else {
        button.textContent = 'Click Me!';
        button.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
});

// Function to show success message
function showSuccessMessage() {
    const message = document.createElement('div');
    message.textContent = '🎉 Congratulations! You just made your first interactive element!';
    message.style.cssText = \`
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.5s ease;
    \`;
    
    document.body.appendChild(message);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Add CSS animation
const style = document.createElement('style');
style.textContent = \`
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
\`;
document.head.appendChild(style);

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM fully loaded');
    
    // Add hover effect to hero section
    const hero = document.querySelector('.hero');
    hero.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    hero.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});`,
    
    'README.md': `# My RiseInTech Project

## 🚀 Project Overview
This is my learning project created as part of the RiseInTech program.

## 📋 Features
- Responsive design
- Interactive elements
- Modern CSS styling
- Clean JavaScript code

## 🛠️ Technologies Used
- HTML5
- CSS3
- JavaScript (ES6+)

## 📁 Project Structure
\`\`\`
project/
├── index.html      # Main HTML file
├── style.css       # Styling
├── script.js       # JavaScript functionality
└── README.md       # Project documentation
\`\`\`

## 🎯 Learning Goals
- [x] HTML structure
- [x] CSS styling and layout
- [x] JavaScript interactivity
- [ ] Responsive design
- [ ] Accessibility features

## 🚀 How to Run
1. Open \`index.html\` in your browser
2. Or use a local server:
   \`\`\`bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   \`\`\`

## 📝 Next Steps
- Add more interactive features
- Improve accessibility
- Add animations
- Deploy to GitHub Pages

## 🎉 Achievements
- ✅ Created first web project
- ✅ Used semantic HTML
- ✅ Implemented responsive design
- ✅ Added JavaScript interactivity

---
*Created with ❤️ as part of RiseInTech learning journey*`
  };

  // Create download link
  const zip = createProjectZip(starterFiles);
  downloadFile(zip, 'riseintech-starter-project.zip');
  
  // Show instructions
  setTimeout(() => {
    alert(`
📁 Starter Project Downloaded!

What you got:
✅ index.html - Main webpage
✅ style.css - Beautiful styling  
✅ script.js - Interactive features
✅ README.md - Project documentation

Next Steps:
1. Extract the ZIP file
2. Open the folder in VS Code
3. Open index.html in your browser
4. Start coding and customizing!

Tips:
• Use Live Server extension for auto-refresh
• Open Developer Tools (F12) to see console
• Modify the code and see changes instantly!
    `);
  }, 500);
};

const createProjectZip = (files: Record<string, string>) => {
  // In a real app, you'd use a library like JSZip
  // For now, we'll create a simple text representation
  let zipContent = "RiseInTech Starter Project\n\n";
  
  Object.entries(files).forEach(([filename, content]) => {
    zipContent += `=== ${filename} ===\n${content}\n\n`;
  });
  
  return zipContent;
};

const downloadFile = (content: string, filename: string) => {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const showSuccessMessage = () => {
  const message = `
🎉 VS Code Opening...

If VS Code doesn't open automatically:

Option 1 - VS Code Desktop:
• Make sure VS Code is installed
• Try clicking the button again
• Or manually open VS Code and create a new folder

Option 2 - VS Code Web:
• Click "Open VS Code Web" below
• Works in any browser
• No installation needed!

Option 3 - Download Starter:
• Click "Download Starter Project"
• Extract and open in any editor
• Perfect for getting started quickly!
  `;
  
  console.log(message);
};

export const showVSCodeInstructions = () => {
  const instructions = `
🚀 How to Start Coding:

OPTION 1: VS Code Desktop (Recommended)
1. Install VS Code: https://code.visualstudio.com/
2. Create a new folder for your project
3. Open VS Code → File → Open Folder
4. Create these files:
   • index.html (main webpage)
   • style.css (styling)
   • script.js (interactivity)

OPTION 2: VS Code Web (No Installation)
1. Go to: https://vscode.dev/
2. Click "New File" to start coding
3. Save files with proper extensions (.html, .css, .js)

OPTION 3: Any Text Editor
1. Use Notepad++, Sublime Text, or any editor
2. Create the same files
3. Open index.html in your browser

GETTING STARTED TEMPLATE:
We can provide you with a starter template with all the basic files ready to go!

Would you like to:
1. Download a starter project template?
2. Open VS Code Web?
3. See detailed setup instructions?
  `;
  
  if (confirm(instructions + '\n\nClick OK to download starter template, Cancel to open VS Code Web')) {
    createNewProject();
  } else {
    openVSCodeWeb();
  }
};

export const downloadProject = () => {
  createNewProject();
};

export const createGitHubRepo = async () => {
  const instructions = `
📁 Create GitHub Repository:

STEP 1: Create Repository
1. Go to: https://github.com/new
2. Repository name: "my-riseintech-project"
3. Description: "My learning project from RiseInTech"
4. Make it Public (to showcase your work!)
5. ✅ Add a README file
6. Click "Create repository"

STEP 2: Clone to Your Computer
1. Click the green "Code" button
2. Copy the HTTPS URL
3. Open terminal/command prompt
4. Run: git clone [your-repo-url]
5. Open the folder in VS Code

STEP 3: Start Coding
1. Create your project files
2. Add, commit, and push changes:
   git add .
   git commit -m "Initial project setup"
   git push origin main

STEP 4: Enable GitHub Pages (Optional)
1. Go to Settings → Pages
2. Source: Deploy from a branch
3. Branch: main
4. Your site will be live at: username.github.io/repo-name

This creates a professional portfolio piece! 🚀
  `;
  
  alert(instructions);
  window.open('https://github.com/new', '_blank');
};

// Check if VS Code is available
export const checkVSCodeAvailability = (): boolean => {
  return typeof window !== 'undefined' && 'navigator' in window;
};

// Generate project export data
export const generateProjectExport = () => {
  return {
    name: 'RiseInTech Project',
    description: 'AI-powered learning platform for women in tech',
    files: [
      'index.html',
      'style.css', 
      'script.js',
      'README.md'
    ],
    setupInstructions: [
      'Open folder in VS Code',
      'Install Live Server extension',
      'Right-click index.html → Open with Live Server'
    ]
  };
};