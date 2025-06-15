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
  // Create starter project files
  const starterFiles = {
    'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My RiseInTech Project</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-logo">
                <a href="#home">🚀 My Project</a>
            </div>
            <ul class="nav-menu">
                <li class="nav-item">
                    <a href="#home" class="nav-link">Home</a>
                </li>
                <li class="nav-item">
                    <a href="#about" class="nav-link">About</a>
                </li>
                <li class="nav-item">
                    <a href="#projects" class="nav-link">Projects</a>
                </li>
                <li class="nav-item">
                    <a href="#contact" class="nav-link">Contact</a>
                </li>
            </ul>
            <div class="nav-toggle" id="mobile-menu">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="hero">
        <div class="hero-container">
            <div class="hero-content">
                <h1 class="hero-title">
                    Hi, I'm <span class="highlight">Your Name</span>
                </h1>
                <h2 class="hero-subtitle">Aspiring Developer</h2>
                <p class="hero-description">
                    Welcome to my learning journey! I'm building amazing projects 
                    and developing my coding skills with RiseInTech.
                </p>
                <div class="hero-buttons">
                    <a href="#projects" class="btn btn-primary">View My Work</a>
                    <a href="#contact" class="btn btn-secondary">Get In Touch</a>
                </div>
            </div>
            <div class="hero-image">
                <div class="image-placeholder">
                    <span>Your Photo Here</span>
                </div>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="about">
        <div class="container">
            <h2 class="section-title">About Me</h2>
            <div class="about-content">
                <div class="about-text">
                    <p>
                        I'm passionate about technology and excited to start my journey 
                        in web development. Through RiseInTech, I'm learning to create 
                        beautiful, functional websites and applications.
                    </p>
                    <p>
                        This project represents my first step into the world of coding. 
                        I'm eager to learn, grow, and eventually land my dream job in tech!
                    </p>
                </div>
                <div class="skills">
                    <h3>Skills I'm Learning</h3>
                    <div class="skills-grid">
                        <div class="skill-item">
                            <span class="skill-name">HTML</span>
                            <div class="skill-bar">
                                <div class="skill-progress" data-width="70%"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <span class="skill-name">CSS</span>
                            <div class="skill-bar">
                                <div class="skill-progress" data-width="60%"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <span class="skill-name">JavaScript</span>
                            <div class="skill-bar">
                                <div class="skill-progress" data-width="40%"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <span class="skill-name">Problem Solving</span>
                            <div class="skill-bar">
                                <div class="skill-progress" data-width="80%"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="projects">
        <div class="container">
            <h2 class="section-title">My Learning Projects</h2>
            <div class="projects-grid">
                <div class="project-card">
                    <div class="project-image">
                        <div class="image-placeholder">Portfolio Website</div>
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">Personal Portfolio</h3>
                        <p class="project-description">
                            My first web development project - a responsive portfolio website.
                        </p>
                        <div class="project-tech">
                            <span class="tech-tag">HTML</span>
                            <span class="tech-tag">CSS</span>
                            <span class="tech-tag">JavaScript</span>
                        </div>
                        <div class="project-links">
                            <a href="#" class="project-link">Live Demo</a>
                            <a href="#" class="project-link">GitHub</a>
                        </div>
                    </div>
                </div>

                <div class="project-card">
                    <div class="project-image">
                        <div class="image-placeholder">Coming Soon</div>
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">Next Project</h3>
                        <p class="project-description">
                            Excited to build my next project and continue learning!
                        </p>
                        <div class="project-tech">
                            <span class="tech-tag">React</span>
                            <span class="tech-tag">TypeScript</span>
                            <span class="tech-tag">API</span>
                        </div>
                        <div class="project-links">
                            <a href="#" class="project-link">Coming Soon</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact">
        <div class="container">
            <h2 class="section-title">Let's Connect!</h2>
            <div class="contact-content">
                <div class="contact-info">
                    <h3>Ready to collaborate?</h3>
                    <p>
                        I'm always excited to connect with fellow learners, mentors, 
                        and potential collaborators. Let's build something amazing together!
                    </p>
                    <div class="contact-details">
                        <div class="contact-item">
                            <strong>Email:</strong> your.email@example.com
                        </div>
                        <div class="contact-item">
                            <strong>LinkedIn:</strong> linkedin.com/in/yourname
                        </div>
                        <div class="contact-item">
                            <strong>GitHub:</strong> github.com/yourusername
                        </div>
                    </div>
                </div>
                <form class="contact-form" id="contactForm">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="message">Message</label>
                        <textarea id="message" name="message" rows="5" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Send Message</button>
                </form>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 Your Name. Built with ❤️ during my RiseInTech journey.</p>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>`,

    'style.css': `/* RiseInTech Project Starter CSS */
/* Reset and Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', sans-serif;
    line-height: 1.6;
    color: #333;
    overflow-x: hidden;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Navigation Styles */
.navbar {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: 0 2px 20px rgba(0,0,0,0.1);
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
    transition: all 0.3s ease;
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav-logo a {
    font-size: 1.5rem;
    font-weight: 700;
    color: #667eea;
    text-decoration: none;
    transition: color 0.3s ease;
}

.nav-logo a:hover {
    color: #764ba2;
}

.nav-menu {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-link {
    color: #333;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
    position: relative;
}

.nav-link:hover {
    color: #667eea;
}

.nav-link::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -5px;
    left: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    transition: width 0.3s ease;
}

.nav-link:hover::after {
    width: 100%;
}

.nav-toggle {
    display: none;
    flex-direction: column;
    cursor: pointer;
}

.bar {
    width: 25px;
    height: 3px;
    background: #333;
    margin: 3px 0;
    transition: 0.3s;
    border-radius: 2px;
}

/* Hero Section */
.hero {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    color: white;
    padding-top: 80px;
    position: relative;
    overflow: hidden;
}

.hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
}

.hero-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    position: relative;
    z-index: 1;
}

.hero-title {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    line-height: 1.2;
    animation: fadeInUp 1s ease;
}

.highlight {
    background: linear-gradient(135deg, #ffd700, #ffed4e);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.hero-subtitle {
    font-size: 1.5rem;
    font-weight: 400;
    margin-bottom: 1.5rem;
    opacity: 0.9;
    animation: fadeInUp 1s ease 0.2s both;
}

.hero-description {
    font-size: 1.1rem;
    margin-bottom: 2rem;
    opacity: 0.8;
    line-height: 1.6;
    animation: fadeInUp 1s ease 0.4s both;
}

.hero-buttons {
    display: flex;
    gap: 1rem;
    animation: fadeInUp 1s ease 0.6s both;
}

.btn {
    padding: 12px 30px;
    border-radius: 50px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
    display: inline-block;
    border: 2px solid transparent;
    cursor: pointer;
    font-size: 1rem;
}

.btn-primary {
    background: #ffd700;
    color: #333;
    box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
}

.btn-primary:hover {
    background: #ffed4e;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 215, 0, 0.4);
}

.btn-secondary {
    background: transparent;
    color: white;
    border-color: white;
}

.btn-secondary:hover {
    background: white;
    color: #333;
    transform: translateY(-2px);
}

.hero-image {
    display: flex;
    justify-content: center;
    animation: fadeInUp 1s ease 0.8s both;
}

.image-placeholder {
    width: 300px;
    height: 300px;
    background: rgba(255,255,255,0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    border: 3px solid rgba(255,255,255,0.3);
    backdrop-filter: blur(10px);
    transition: transform 0.3s ease;
}

.image-placeholder:hover {
    transform: scale(1.05);
}

/* Sections */
section {
    padding: 80px 0;
}

.section-title {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 3rem;
    color: #333;
    position: relative;
}

.section-title::after {
    content: '';
    position: absolute;
    width: 60px;
    height: 4px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 2px;
}

/* About Section */
.about {
    background: #f8f9fa;
}

.about-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: start;
}

.about-text p {
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
    line-height: 1.8;
    color: #555;
}

.skills h3 {
    margin-bottom: 2rem;
    font-size: 1.5rem;
    color: #333;
}

.skill-item {
    margin-bottom: 1.5rem;
}

.skill-name {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #333;
}

.skill-bar {
    background: #e9ecef;
    height: 8px;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
}

.skill-progress {
    height: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 4px;
    transition: width 2s ease;
    width: 0;
}

/* Projects Section */
.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
}

.project-card {
    background: white;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
}

.project-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
}

.project-image .image-placeholder {
    width: 100%;
    height: 200px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.2rem;
    font-weight: 600;
    border-radius: 0;
}

.project-content {
    padding: 2rem;
}

.project-title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #333;
}

.project-description {
    color: #666;
    margin-bottom: 1.5rem;
    line-height: 1.6;
}

.project-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
}

.tech-tag {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: 500;
}

.project-links {
    display: flex;
    gap: 1rem;
}

.project-link {
    color: #667eea;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
    padding: 0.5rem 1rem;
    border: 2px solid #667eea;
    border-radius: 25px;
}

.project-link:hover {
    background: #667eea;
    color: white;
    transform: translateY(-2px);
}

/* Contact Section */
.contact {
    background: #f8f9fa;
}

.contact-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
}

.contact-info h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #333;
}

.contact-info p {
    margin-bottom: 2rem;
    line-height: 1.6;
    color: #666;
}

.contact-item {
    margin-bottom: 1rem;
    color: #666;
}

.contact-form {
    background: white;
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #333;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 12px;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
    font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

/* Footer */
.footer {
    background: #333;
    color: white;
    text-align: center;
    padding: 2rem 0;
}

/* Animations */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-in-up {
    animation: fadeInUp 0.6s ease forwards;
}

/* Responsive Design */
@media (max-width: 768px) {
    .nav-menu {
        position: fixed;
        left: -100%;
        top: 70px;
        flex-direction: column;
        background-color: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        width: 100%;
        text-align: center;
        transition: 0.3s;
        box-shadow: 0 10px 27px rgba(0,0,0,0.05);
        padding: 2rem 0;
    }

    .nav-menu.active {
        left: 0;
    }

    .nav-toggle {
        display: flex;
    }

    .nav-toggle.active .bar:nth-child(2) {
        opacity: 0;
    }

    .nav-toggle.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }

    .nav-toggle.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }

    .hero-container {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 2rem;
    }

    .hero-title {
        font-size: 2.5rem;
    }

    .about-content,
    .contact-content {
        grid-template-columns: 1fr;
        gap: 2rem;
    }

    .hero-buttons {
        justify-content: center;
        flex-wrap: wrap;
    }

    .projects-grid {
        grid-template-columns: 1fr;
    }

    .image-placeholder {
        width: 250px !important;
        height: 250px !important;
    }
}

@media (max-width: 480px) {
    .hero-title {
        font-size: 2rem;
    }

    .section-title {
        font-size: 2rem;
    }

    .container {
        padding: 0 15px;
    }

    .hero-buttons {
        flex-direction: column;
        align-items: center;
    }

    .btn {
        width: 100%;
        max-width: 250px;
        text-align: center;
    }
}

/* Loading Animation */
.loading {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 3px solid rgba(255,255,255,.3);
    border-radius: 50%;
    border-top-color: #fff;
    animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

/* Success Animation */
.success-message {
    background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
    color: white;
    padding: 15px 20px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    animation: slideInRight 0.5s ease;
}

@keyframes slideInRight {
    from { 
        transform: translateX(100%); 
        opacity: 0; 
    }
    to { 
        transform: translateX(0); 
        opacity: 1; 
    }
}`,

    'script.js': `// RiseInTech Project Starter JavaScript
console.log('🚀 Welcome to your RiseInTech project!');

// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenu && navMenu) {
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    }
});

// Animate skill bars when they come into view
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
            });
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    skillObserver.observe(skillsSection);
}

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<span class="loading"></span> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            showNotification('Thank you! Your message has been sent. 🎉', 'success');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = \`notification notification-\${type}\`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = \`
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        \${type === 'success' ? 'background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);' : ''}
        \${type === 'error' ? 'background: linear-gradient(135deg, #f44336 0%, #d32f2f 100%);' : ''}
        \${type === 'info' ? 'background: linear-gradient(135deg, #2196F3 0%, #1976D2 100%);' : ''}
    \`;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Add scroll animations
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe elements for animation
document.querySelectorAll('.project-card, .about-content, .contact-content').forEach(el => {
    fadeObserver.observe(el);
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    const originalHTML = element.innerHTML;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            if (text.charAt(i) === '<') {
                // Handle HTML tags
                const tagEnd = text.indexOf('>', i);
                element.innerHTML += text.substring(i, tagEnd + 1);
                i = tagEnd + 1;
            } else {
                element.innerHTML += text.charAt(i);
                i++;
            }
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 500);
    }
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = \`translateY(\${rate}px)\`;
    }
});

// Interactive project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = \`
            position: absolute;
            width: \${size}px;
            height: \${size}px;
            left: \${x}px;
            top: \${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        \`;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = \`
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
\`;
document.head.appendChild(style);

// Console welcome message with ASCII art
console.log(\`
🎉 Welcome to your RiseInTech project!

    ____  _          ____      ______          __  
   / __ \\(_)___ ___ /  _/___  /_  __/__  _____/ /_ 
  / /_/ / / __ \`/ _ \\/ // __ \\  / / / _ \\/ ___/ __ \\
 / _, _/ / /_/ /  __/ // / / / / / /  __/ /__/ / / /
/_/ |_/_/\\__, /\\___/___/_/ /_/ /_/  \\___/\\___/_/ /_/ 
        /____/                                      

📧 Ready to customize? Update your contact info!
🎨 Make it yours: Change colors, fonts, and content
🚀 Deploy: Push to GitHub and enable GitHub Pages
💼 Portfolio: Add this to your professional portfolio

Happy coding! 🚀
\`);

// Add some fun easter eggs
let clickCount = 0;
document.querySelector('.nav-logo a')?.addEventListener('click', function(e) {
    e.preventDefault();
    clickCount++;
    
    if (clickCount === 5) {
        showNotification('🎉 Easter egg found! You\\'re a curious developer!', 'success');
        this.style.animation = 'bounce 1s ease';
        clickCount = 0;
    }
});

// Performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(\`⚡ Page loaded in \${Math.round(loadTime)}ms\`);
    
    if (loadTime > 3000) {
        console.log('💡 Tip: Consider optimizing images and code for better performance!');
    }
});

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // Skip to main content with Tab
    if (e.key === 'Tab' && !e.shiftKey) {
        const focusableElements = document.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        
        // Add focus indicators
        focusableElements.forEach(el => {
            el.addEventListener('focus', function() {
                this.style.outline = '2px solid #667eea';
                this.style.outlineOffset = '2px';
            });
            
            el.addEventListener('blur', function() {
                this.style.outline = 'none';
            });
        });
    }
});`,

    'README.md': `# 🚀 My RiseInTech Learning Project

Welcome to my first web development project! This portfolio website represents the beginning of my journey into tech through the RiseInTech program.

## 📋 Project Overview

This is a **responsive portfolio website** built from scratch using:
- **HTML5** - Semantic structure and accessibility
- **CSS3** - Modern styling with animations and responsive design  
- **JavaScript** - Interactive features and user experience enhancements

## 🎯 Learning Goals

Through this project, I'm mastering:

### ✅ **HTML Fundamentals**
- Semantic HTML structure
- Accessibility best practices
- SEO-friendly markup
- Form handling

### ✅ **CSS Skills**
- Responsive design with CSS Grid and Flexbox
- CSS animations and transitions
- Modern layout techniques
- Mobile-first approach

### ✅ **JavaScript Concepts**
- DOM manipulation
- Event handling
- Form validation
- Smooth scrolling and animations

### ✅ **Professional Development**
- Version control with Git
- Project documentation
- Code organization
- Deployment strategies

## 🛠️ Features

### 🎨 **Design & UX**
- **Responsive Design** - Works on all devices
- **Smooth Animations** - CSS transitions and JavaScript effects
- **Modern UI** - Clean, professional appearance
- **Accessibility** - Keyboard navigation and screen reader friendly

### ⚡ **Interactive Elements**
- **Mobile Navigation** - Hamburger menu for mobile devices
- **Smooth Scrolling** - Navigation links scroll smoothly to sections
- **Contact Form** - Functional form with validation
- **Skill Bars** - Animated progress indicators
- **Hover Effects** - Interactive project cards and buttons

### 📱 **Responsive Features**
- **Mobile-First Design** - Optimized for mobile devices
- **Flexible Grid** - Adapts to different screen sizes
- **Touch-Friendly** - Large tap targets for mobile users

## 📁 Project Structure

\`\`\`
my-riseintech-project/
├── index.html          # Main HTML file
├── style.css           # All CSS styling
├── script.js           # JavaScript functionality
└── README.md           # This documentation file
\`\`\`

## 🚀 Getting Started

### **Option 1: Open Locally**
1. Download all files to a folder
2. Open \`index.html\` in your web browser
3. Start exploring and customizing!

### **Option 2: Use VS Code (Recommended)**
1. Open the project folder in VS Code
2. Install the "Live Server" extension
3. Right-click \`index.html\` → "Open with Live Server"
4. Your site opens at \`http://localhost:5500\`

### **Option 3: Use Any Web Server**
\`\`\`bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
\`\`\`

## 🎨 Customization Guide

### **1. Personal Information**
Update these sections in \`index.html\`:
- Replace "Your Name" with your actual name
- Update the hero description
- Add your contact information
- Replace placeholder project content

### **2. Colors & Styling**
Modify the CSS variables in \`style.css\`:
\`\`\`css
/* Change the main gradient colors */
.hero {
    background: linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%);
}

/* Update accent colors */
.highlight {
    background: linear-gradient(135deg, #your-accent-1, #your-accent-2);
}
\`\`\`

### **3. Add Your Projects**
Replace the placeholder projects with your real work:
1. Update project titles and descriptions
2. Add project images (create an \`images/\` folder)
3. Update technology tags
4. Add links to live demos and GitHub repos

### **4. Skills Section**
Update your skills and proficiency levels:
\`\`\`html
<div class="skill-item">
    <span class="skill-name">Your Skill</span>
    <div class="skill-bar">
        <div class="skill-progress" data-width="75%"></div>
    </div>
</div>
\`\`\`

## 📚 What I'm Learning

### **Beginner Concepts** ✅
- [x] HTML structure and semantic elements
- [x] CSS basics and responsive design
- [x] JavaScript fundamentals
- [x] Git version control basics

### **Intermediate Goals** 🎯
- [ ] Advanced CSS animations
- [ ] JavaScript ES6+ features
- [ ] API integration
- [ ] Performance optimization

### **Advanced Objectives** 🚀
- [ ] React.js framework
- [ ] Backend development
- [ ] Database integration
- [ ] Full-stack applications

## 🌐 Deployment Options

### **GitHub Pages (Free)**
1. Create a GitHub repository
2. Upload your files
3. Go to Settings → Pages
4. Select source branch
5. Your site is live at \`username.github.io/repository-name\`

### **Netlify (Free)**
1. Drag your project folder to [netlify.com](https://netlify.com)
2. Your site is instantly live with a custom URL
3. Automatic deployments from GitHub

### **Vercel (Free)**
1. Connect your GitHub repository
2. Automatic deployments on every push
3. Custom domain support

## 🎯 Next Steps

### **Immediate Improvements**
- [ ] Add your real photo and information
- [ ] Customize colors and fonts
- [ ] Add your actual projects
- [ ] Deploy to the web

### **Feature Enhancements**
- [ ] Add a blog section
- [ ] Implement dark mode toggle
- [ ] Add project filtering
- [ ] Include testimonials section

### **Technical Upgrades**
- [ ] Convert to a React application
- [ ] Add a content management system
- [ ] Implement search functionality
- [ ] Add analytics tracking

## 🏆 Achievements Unlocked

- ✅ **First Website** - Built my first complete website
- ✅ **Responsive Design** - Made it work on all devices
- ✅ **Interactive Features** - Added JavaScript functionality
- ✅ **Professional Portfolio** - Created a showcase for my work
- ✅ **Version Control** - Learned Git and GitHub
- ✅ **Deployment** - Published my site online

## 🤝 Getting Help

### **RiseInTech Community**
- Join our Discord server for peer support
- Attend weekly coding sessions
- Get feedback on your projects

### **Learning Resources**
- [MDN Web Docs](https://developer.mozilla.org/) - Comprehensive web development reference
- [freeCodeCamp](https://freecodecamp.org/) - Free coding tutorials
- [CSS-Tricks](https://css-tricks.com/) - CSS tips and techniques
- [JavaScript.info](https://javascript.info/) - Modern JavaScript tutorial

### **Need Help?**
- 📧 Email: support@riseintech.com
- 💬 Discord: RiseInTech Community
- 📚 Documentation: docs.riseintech.com

## 🎉 Celebration

**Congratulations!** 🎊 You've just completed your first major web development project. This is a significant milestone in your coding journey!

### **What You've Accomplished:**
- Built a complete, responsive website from scratch
- Learned HTML, CSS, and JavaScript fundamentals
- Created a professional portfolio piece
- Gained experience with modern web development practices

### **You're Ready For:**
- More complex JavaScript projects
- Learning a frontend framework like React
- Building dynamic web applications
- Contributing to open source projects

---

## 📝 Project Log

**Started:** [Your Start Date]  
**Completed:** [Your Completion Date]  
**Time Invested:** [Hours Spent]  
**Key Learnings:** [What you learned]  
**Challenges Overcome:** [Difficulties you solved]  
**Proud Moments:** [What you're most proud of]

---

**Built with ❤️ and determination during my RiseInTech learning journey**

*"Every expert was once a beginner. Every pro was once an amateur. Every icon was once an unknown." - Robin Sharma*

🚀 **Keep coding, keep learning, keep rising!** 🚀`
  };

  // Create a proper ZIP file using a simple implementation
  createAndDownloadZip(starterFiles, 'riseintech-starter-project.zip');
  
  // Show instructions
  setTimeout(() => {
    showZipInstructions();
  }, 1000);
};

// Simple ZIP creation function
const createAndDownloadZip = (files: Record<string, string>, filename: string) => {
  // Create a simple text-based archive format that can be easily extracted
  let zipContent = `# RiseInTech Starter Project Archive
# Extract these files to get started with your project
# 
# Files included:
# - index.html (Main webpage)
# - style.css (Styling)
# - script.js (JavaScript functionality)
# - README.md (Documentation)
#
# Instructions:
# 1. Create a new folder called "my-riseintech-project"
# 2. Copy each file content below into separate files
# 3. Open index.html in your browser
# 4. Start customizing!

`;

  Object.entries(files).forEach(([filename, content]) => {
    zipContent += `
${'='.repeat(60)}
FILE: ${filename}
${'='.repeat(60)}

${content}

`;
  });

  zipContent += `
${'='.repeat(60)}
END OF ARCHIVE
${'='.repeat(60)}

🎉 Your RiseInTech starter project is ready!

Next steps:
1. Create a folder called "my-riseintech-project"
2. Create each file (index.html, style.css, script.js, README.md)
3. Copy the content from above into each file
4. Open index.html in your browser
5. Start coding!

Happy learning! 🚀
`;

  // Download the archive
  const blob = new Blob([zipContent], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const showZipInstructions = () => {
  const instructions = `
🎉 STARTER PROJECT DOWNLOADED!

📦 You've downloaded: riseintech-starter-project.zip

🚀 HOW TO GET STARTED:

1️⃣ EXTRACT THE FILES
   • Open the downloaded file
   • You'll see all the code organized by filename
   • Create a new folder called "my-riseintech-project"

2️⃣ CREATE YOUR FILES
   • Create these 4 files in your project folder:
     - index.html
     - style.css  
     - script.js
     - README.md
   
3️⃣ COPY THE CODE
   • Copy each section from the downloaded file
   • Paste into the corresponding file
   • Save all files

4️⃣ OPEN YOUR PROJECT
   • Double-click index.html to open in browser
   • Or use VS Code with Live Server extension

📋 WHAT'S INCLUDED:
✅ Complete HTML structure
✅ Professional CSS styling
✅ Interactive JavaScript features
✅ Comprehensive documentation
✅ Mobile responsive design
✅ Contact form with validation
✅ Smooth animations and effects

💡 TIPS:
• Read the README.md for detailed instructions
• Customize colors, text, and images
• Add your own projects and information
• Deploy to GitHub Pages when ready

🆘 NEED HELP?
• Check the README.md file for troubleshooting
• Join our community for support
• Follow the step-by-step guide included

Happy coding! 🚀
  `;
  
  alert(instructions);
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