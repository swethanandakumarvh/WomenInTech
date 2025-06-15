// Enhanced project starter with comprehensive templates for all skill levels
export interface ProjectTemplate {
  name: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  field: string;
  files: Record<string, string>;
  instructions: string[];
  learningGoals: string[];
  estimatedHours: number;
}

export const projectTemplates: Record<string, ProjectTemplate> = {
  'portfolio-beginner': {
    name: 'Personal Portfolio Website',
    description: 'Build a responsive portfolio website to showcase your projects and skills',
    level: 'beginner',
    field: 'frontend',
    estimatedHours: 20,
    learningGoals: [
      'Learn HTML structure and semantic elements',
      'Master CSS styling and responsive design',
      'Add interactivity with JavaScript',
      'Deploy your website to GitHub Pages'
    ],
    instructions: [
      '1. Set up your development environment',
      '2. Create the HTML structure',
      '3. Style with CSS and make it responsive',
      '4. Add JavaScript interactivity',
      '5. Test across different devices',
      '6. Deploy to GitHub Pages'
    ],
    files: {
      'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Name - Portfolio</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-logo">
                <a href="#home">Your Name</a>
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
                <h2 class="hero-subtitle">Frontend Developer</h2>
                <p class="hero-description">
                    I create beautiful, responsive websites and web applications 
                    using modern technologies like HTML, CSS, and JavaScript.
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
                        I'm a passionate frontend developer with a love for creating 
                        user-friendly and visually appealing web experiences. I enjoy 
                        turning complex problems into simple, beautiful designs.
                    </p>
                    <p>
                        When I'm not coding, you can find me learning new technologies, 
                        contributing to open source projects, or exploring the outdoors.
                    </p>
                </div>
                <div class="skills">
                    <h3>Skills</h3>
                    <div class="skills-grid">
                        <div class="skill-item">
                            <span class="skill-name">HTML</span>
                            <div class="skill-bar">
                                <div class="skill-progress" data-width="90%"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <span class="skill-name">CSS</span>
                            <div class="skill-bar">
                                <div class="skill-progress" data-width="85%"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <span class="skill-name">JavaScript</span>
                            <div class="skill-bar">
                                <div class="skill-progress" data-width="75%"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <span class="skill-name">React</span>
                            <div class="skill-bar">
                                <div class="skill-progress" data-width="70%"></div>
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
            <h2 class="section-title">My Projects</h2>
            <div class="projects-grid">
                <div class="project-card">
                    <div class="project-image">
                        <div class="image-placeholder">Project 1</div>
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">Project One</h3>
                        <p class="project-description">
                            A responsive website built with HTML, CSS, and JavaScript.
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
                        <div class="image-placeholder">Project 2</div>
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">Project Two</h3>
                        <p class="project-description">
                            An interactive web application with modern design.
                        </p>
                        <div class="project-tech">
                            <span class="tech-tag">React</span>
                            <span class="tech-tag">CSS</span>
                            <span class="tech-tag">API</span>
                        </div>
                        <div class="project-links">
                            <a href="#" class="project-link">Live Demo</a>
                            <a href="#" class="project-link">GitHub</a>
                        </div>
                    </div>
                </div>

                <div class="project-card">
                    <div class="project-image">
                        <div class="image-placeholder">Project 3</div>
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">Project Three</h3>
                        <p class="project-description">
                            A full-stack application with database integration.
                        </p>
                        <div class="project-tech">
                            <span class="tech-tag">Node.js</span>
                            <span class="tech-tag">MongoDB</span>
                            <span class="tech-tag">Express</span>
                        </div>
                        <div class="project-links">
                            <a href="#" class="project-link">Live Demo</a>
                            <a href="#" class="project-link">GitHub</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact">
        <div class="container">
            <h2 class="section-title">Get In Touch</h2>
            <div class="contact-content">
                <div class="contact-info">
                    <h3>Let's work together!</h3>
                    <p>
                        I'm always interested in new opportunities and exciting projects. 
                        Feel free to reach out if you'd like to collaborate!
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
            <p>&copy; 2024 Your Name. All rights reserved.</p>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>`,

      'styles.css': `/* Reset and Base Styles */
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

/* Navigation */
.navbar {
    background: #fff;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
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
    transition: color 0.3s ease;
}

.nav-link:hover {
    color: #667eea;
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
}

/* Hero Section */
.hero {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    color: white;
    padding-top: 80px;
}

.hero-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
}

.hero-title {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    line-height: 1.2;
}

.highlight {
    color: #ffd700;
}

.hero-subtitle {
    font-size: 1.5rem;
    font-weight: 400;
    margin-bottom: 1.5rem;
    opacity: 0.9;
}

.hero-description {
    font-size: 1.1rem;
    margin-bottom: 2rem;
    opacity: 0.8;
    line-height: 1.6;
}

.hero-buttons {
    display: flex;
    gap: 1rem;
}

.btn {
    padding: 12px 30px;
    border-radius: 50px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
    display: inline-block;
    border: 2px solid transparent;
}

.btn-primary {
    background: #ffd700;
    color: #333;
}

.btn-primary:hover {
    background: #ffed4e;
    transform: translateY(-2px);
}

.btn-secondary {
    background: transparent;
    color: white;
    border-color: white;
}

.btn-secondary:hover {
    background: white;
    color: #333;
}

.hero-image {
    display: flex;
    justify-content: center;
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
}

.skills h3 {
    margin-bottom: 2rem;
    font-size: 1.5rem;
}

.skill-item {
    margin-bottom: 1.5rem;
}

.skill-name {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
}

.skill-bar {
    background: #e9ecef;
    height: 8px;
    border-radius: 4px;
    overflow: hidden;
}

.skill-progress {
    height: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 4px;
    transition: width 2s ease;
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
    transition: transform 0.3s ease;
}

.project-card:hover {
    transform: translateY(-10px);
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
    background: #e9ecef;
    color: #495057;
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
    transition: color 0.3s ease;
}

.project-link:hover {
    color: #764ba2;
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
}

.form-group input:focus,
.form-group textarea:focus {
    outline: none;
    border-color: #667eea;
}

/* Footer */
.footer {
    background: #333;
    color: white;
    text-align: center;
    padding: 2rem 0;
}

/* Responsive Design */
@media (max-width: 768px) {
    .nav-menu {
        position: fixed;
        left: -100%;
        top: 70px;
        flex-direction: column;
        background-color: white;
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
    }

    .projects-grid {
        grid-template-columns: 1fr;
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
}`,

      'script.js': `// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

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
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '#fff';
        navbar.style.backdropFilter = 'none';
    }
});

// Animate skill bars when they come into view
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
            });
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    observer.observe(skillsSection);
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
        
        // Simulate form submission
        showNotification('Thank you! Your message has been sent.', 'success');
        this.reset();
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = \`notification notification-\${type}\`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = \`
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        \${type === 'success' ? 'background: #28a745;' : ''}
        \${type === 'error' ? 'background: #dc3545;' : ''}
        \${type === 'info' ? 'background: #17a2b8;' : ''}
    \`;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add scroll animations
const animateOnScroll = new IntersectionObserver((entries) => {
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
    animateOnScroll.observe(el);
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = \`translateY(\${scrolled * 0.5}px)\`;
    }
});

// Console welcome message
console.log(\`
🎉 Welcome to my portfolio!
📧 Contact: your.email@example.com
🔗 GitHub: github.com/yourusername
💼 LinkedIn: linkedin.com/in/yourname

Built with ❤️ using HTML, CSS, and JavaScript
\`);`,

      'README.md': `# Personal Portfolio Website

A modern, responsive portfolio website built with HTML, CSS, and JavaScript as part of the RiseInTech learning program.

## 🚀 Features

- **Responsive Design**: Works perfectly on all devices
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Interactive Elements**: Smooth scrolling, mobile navigation, contact form
- **Performance Optimized**: Fast loading and efficient code
- **SEO Friendly**: Semantic HTML structure

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript**: Interactive functionality and animations
- **Google Fonts**: Typography enhancement

## 📁 Project Structure

\`\`\`
portfolio/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
\`\`\`

## 🎯 Learning Goals Achieved

- ✅ **HTML Structure**: Semantic elements, accessibility
- ✅ **CSS Styling**: Flexbox, Grid, responsive design
- ✅ **JavaScript**: DOM manipulation, event handling
- ✅ **Responsive Design**: Mobile-first approach
- ✅ **User Experience**: Smooth animations, intuitive navigation

## 🚀 Getting Started

### Prerequisites
- A modern web browser
- Text editor (VS Code recommended)
- Basic knowledge of HTML, CSS, and JavaScript

### Installation
1. Download or clone this repository
2. Open \`index.html\` in your browser
3. Start customizing with your own content!

### Development Setup
1. Open the project folder in VS Code
2. Install the "Live Server" extension
3. Right-click on \`index.html\` and select "Open with Live Server"
4. Your site will open at \`http://localhost:5500\`

## 📝 Customization Guide

### 1. Personal Information
Update the following in \`index.html\`:
- Replace "Your Name" with your actual name
- Update the hero description
- Add your contact information
- Replace placeholder project content

### 2. Styling
Customize colors and fonts in \`styles.css\`:
\`\`\`css
/* Change primary colors */
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #ffd700;
}
\`\`\`

### 3. Projects Section
Add your own projects:
1. Replace project placeholders with real content
2. Add project images to an \`images/\` folder
3. Update project links and descriptions

### 4. Skills Section
Update your skills and proficiency levels:
\`\`\`html
<div class="skill-item">
    <span class="skill-name">Your Skill</span>
    <div class="skill-bar">
        <div class="skill-progress" data-width="85%"></div>
    </div>
</div>
\`\`\`

## 🎨 Design Features

### Color Scheme
- **Primary**: Purple gradient (#667eea to #764ba2)
- **Accent**: Gold (#ffd700)
- **Text**: Dark gray (#333)
- **Background**: Light gray (#f8f9fa)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Headings**: Bold, large sizes for hierarchy
- **Body**: Regular weight, good line height for readability

### Animations
- Smooth scrolling navigation
- Hover effects on cards and buttons
- Skill bar animations on scroll
- Fade-in animations for sections

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px to 1199px
- **Mobile**: Below 768px

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📈 Performance Tips

1. **Optimize Images**: Use WebP format for better compression
2. **Minify CSS/JS**: Use build tools for production
3. **Enable Caching**: Add proper cache headers
4. **Use CDN**: For external resources

## 🚀 Deployment Options

### GitHub Pages
1. Push your code to a GitHub repository
2. Go to Settings → Pages
3. Select source branch (usually \`main\`)
4. Your site will be live at \`username.github.io/repository-name\`

### Netlify
1. Drag and drop your project folder to Netlify
2. Your site will be live instantly with a custom URL

### Vercel
1. Connect your GitHub repository
2. Deploy with zero configuration

## 🎓 What You'll Learn

### Beginner Level
- HTML semantic structure
- CSS basics and responsive design
- JavaScript fundamentals
- Git version control

### Intermediate Level
- Advanced CSS animations
- JavaScript ES6+ features
- Performance optimization
- Accessibility best practices

### Advanced Level
- Build tools and workflows
- Testing and debugging
- SEO optimization
- Progressive Web App features

## 🤝 Contributing

This is a learning project, but suggestions are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📚 Resources

- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS-Tricks](https://css-tricks.com/)
- [JavaScript.info](https://javascript.info/)
- [Web.dev](https://web.dev/)

## 🏆 Achievements

- ✅ Built first responsive website
- ✅ Implemented smooth animations
- ✅ Created interactive contact form
- ✅ Deployed to the web
- ✅ Used semantic HTML
- ✅ Applied CSS Grid and Flexbox

## 📞 Support

If you need help with this project:
- Check the [Issues](https://github.com/yourusername/portfolio/issues) page
- Join the RiseInTech community
- Contact: your.email@example.com

---

**Built with ❤️ as part of the RiseInTech learning journey**

*This project demonstrates fundamental web development skills and serves as a foundation for more advanced projects.*`
    }
  },

  'todo-intermediate': {
    name: 'Task Management App',
    description: 'Build a full-featured todo application with React and TypeScript',
    level: 'intermediate',
    field: 'frontend',
    estimatedHours: 25,
    learningGoals: [
      'Master React hooks and state management',
      'Learn TypeScript for type safety',
      'Implement CRUD operations',
      'Create reusable components',
      'Add local storage persistence'
    ],
    instructions: [
      '1. Set up React project with TypeScript',
      '2. Design component architecture',
      '3. Implement state management',
      '4. Add CRUD functionality',
      '5. Style with modern CSS',
      '6. Add local storage',
      '7. Test and deploy'
    ],
    files: {
      'package.json': `{
  "name": "task-management-app",
  "version": "1.0.0",
  "description": "A modern task management application built with React and TypeScript",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext ts,tsx",
    "test": "vitest"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.294.0",
    "clsx": "^2.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.37",
    "@types/react-dom": "^18.2.15",
    "@typescript-eslint/eslint-plugin": "^6.10.0",
    "@typescript-eslint/parser": "^6.10.0",
    "@vitejs/plugin-react": "^4.1.1",
    "eslint": "^8.53.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "typescript": "^5.2.2",
    "vite": "^4.5.0",
    "vitest": "^0.34.6"
  }
}`,

      'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TaskMaster - Manage Your Tasks Efficiently</title>
    <meta name="description" content="A modern task management application to boost your productivity">
</head>
<body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
</body>
</html>`,

      'src/main.tsx': `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`,

      'README.md': `# TaskMaster - Task Management App

A modern, feature-rich task management application built with React, TypeScript, and Vite.

## 🚀 Features

- ✅ **Create, Read, Update, Delete** tasks
- 🏷️ **Categories and Tags** for organization
- 📅 **Due dates and priorities**
- 🔍 **Search and filter** functionality
- 💾 **Local storage** persistence
- 📱 **Responsive design**
- 🎨 **Modern UI/UX** with smooth animations
- ⚡ **Fast performance** with React 18

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **CSS3** - Styling with custom properties
- **Lucide React** - Icons
- **Local Storage** - Data persistence

## 📁 Project Structure

\`\`\`
src/
├── components/          # Reusable UI components
│   ├── TaskForm.tsx
│   ├── TaskList.tsx
│   ├── TaskItem.tsx
│   └── FilterBar.tsx
├── hooks/              # Custom React hooks
│   ├── useLocalStorage.ts
│   └── useTasks.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions
│   └── helpers.ts
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
\`\`\`

## 🎯 Learning Objectives

### React Concepts
- ✅ Functional components and hooks
- ✅ State management with useState
- ✅ Side effects with useEffect
- ✅ Custom hooks for reusable logic
- ✅ Component composition and props

### TypeScript Features
- ✅ Interface definitions
- ✅ Type annotations
- ✅ Generic types
- ✅ Union types
- ✅ Type guards

### Modern JavaScript
- ✅ ES6+ features (destructuring, spread operator)
- ✅ Array methods (map, filter, reduce)
- ✅ Async/await patterns
- ✅ Module imports/exports

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Modern web browser

### Installation
1. Clone or download the project
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Start development server:
   \`\`\`bash
   npm run dev
   \`\`\`
4. Open http://localhost:5173

### Available Scripts
- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run preview\` - Preview production build
- \`npm run lint\` - Run ESLint
- \`npm run test\` - Run tests

## 📝 Usage Guide

### Creating Tasks
1. Click the "Add Task" button
2. Fill in task details:
   - Title (required)
   - Description (optional)
   - Category
   - Priority level
   - Due date
3. Click "Save Task"

### Managing Tasks
- **Complete**: Click the checkbox to mark as done
- **Edit**: Click the edit icon to modify
- **Delete**: Click the delete icon to remove
- **Filter**: Use the filter bar to show specific tasks

### Categories
- Work
- Personal
- Shopping
- Health
- Custom categories

### Priority Levels
- 🔴 High
- 🟡 Medium
- 🟢 Low

## 🎨 Customization

### Themes
Modify CSS custom properties in \`index.css\`:
\`\`\`css
:root {
  --primary-color: #3b82f6;
  --secondary-color: #64748b;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --danger-color: #ef4444;
}
\`\`\`

### Adding New Features
1. **New task properties**: Update the \`Task\` interface
2. **Additional filters**: Extend the \`FilterType\` union
3. **Custom categories**: Modify the categories array

## 🧪 Testing

### Manual Testing Checklist
- [ ] Create new task
- [ ] Edit existing task
- [ ] Delete task
- [ ] Mark task as complete
- [ ] Filter by category
- [ ] Filter by priority
- [ ] Search functionality
- [ ] Data persistence after refresh

### Automated Testing
Run tests with:
\`\`\`bash
npm run test
\`\`\`

## 📱 Responsive Design

The app is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Deployment

### Netlify
1. Build the project: \`npm run build\`
2. Drag the \`dist\` folder to Netlify
3. Your app is live!

### Vercel
1. Connect your GitHub repository
2. Vercel will auto-deploy on push

### GitHub Pages
1. Install gh-pages: \`npm install --save-dev gh-pages\`
2. Add deploy script to package.json
3. Run: \`npm run deploy\`

## 🔧 Troubleshooting

### Common Issues
1. **Build errors**: Check TypeScript types
2. **State not updating**: Verify useState usage
3. **Data not persisting**: Check localStorage implementation

### Performance Tips
- Use React.memo for expensive components
- Implement virtual scrolling for large lists
- Optimize re-renders with useCallback

## 📚 Learning Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Modern JavaScript](https://javascript.info/)

## 🤝 Contributing

This is a learning project! Feel free to:
- Report bugs
- Suggest features
- Submit improvements
- Share your version

## 🏆 Next Steps

After completing this project, consider:
1. **Adding a backend** with Node.js/Express
2. **User authentication** with Firebase
3. **Real-time updates** with WebSockets
4. **Mobile app** with React Native
5. **Advanced state management** with Redux

---

**Happy coding! 🚀**

*Built as part of the RiseInTech learning program*`
    }
  }
};

export function generateProjectFiles(
  projectId: string, 
  level: 'beginner' | 'intermediate' | 'advanced',
  field: string
): ProjectTemplate | null {
  
  // Find matching template
  const templateKey = Object.keys(projectTemplates).find(key => {
    const template = projectTemplates[key];
    return template.level === level && template.field === field;
  });

  if (!templateKey) {
    // Generate a basic template if no specific one exists
    return generateBasicTemplate(projectId, level, field);
  }

  return projectTemplates[templateKey];
}

function generateBasicTemplate(
  projectId: string,
  level: 'beginner' | 'intermediate' | 'advanced',
  field: string
): ProjectTemplate {
  
  const baseTemplate: ProjectTemplate = {
    name: `${field.charAt(0).toUpperCase() + field.slice(1)} Project`,
    description: `A ${level} level ${field} project to build your skills`,
    level,
    field,
    estimatedHours: level === 'beginner' ? 15 : level === 'intermediate' ? 25 : 40,
    learningGoals: [
      'Build practical coding skills',
      'Learn industry best practices',
      'Create portfolio-worthy projects',
      'Gain real-world experience'
    ],
    instructions: [
      '1. Set up your development environment',
      '2. Plan your project structure',
      '3. Implement core functionality',
      '4. Add styling and user experience',
      '5. Test your application',
      '6. Deploy and share your work'
    ],
    files: {
      'README.md': `# ${field.charAt(0).toUpperCase() + field.slice(1)} Project

A ${level} level project to build your ${field} development skills.

## Getting Started

1. Set up your development environment
2. Follow the project instructions
3. Build something amazing!

## Learning Goals

- Build practical coding skills
- Learn industry best practices  
- Create portfolio-worthy projects
- Gain real-world experience

## Next Steps

- Complete the core functionality
- Add your own creative features
- Deploy your project
- Add it to your portfolio

Happy coding! 🚀
`,
      'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My ${field.charAt(0).toUpperCase() + field.slice(1)} Project</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>My ${field.charAt(0).toUpperCase() + field.slice(1)} Project</h1>
    </header>
    
    <main>
        <section>
            <h2>Welcome!</h2>
            <p>This is your ${level} level ${field} project. Start building something amazing!</p>
        </section>
    </main>
    
    <script src="script.js"></script>
</body>
</html>`,
      'style.css': `/* Basic styling for your project */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
    background: #f4f4f4;
}

header {
    background: #333;
    color: white;
    text-align: center;
    padding: 1rem;
}

main {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 1rem;
}

section {
    background: white;
    padding: 2rem;
    margin: 1rem 0;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

h1, h2 {
    margin-bottom: 1rem;
}

/* Add your custom styles here */`,
      'script.js': `// JavaScript for your project
console.log('Welcome to your ${field} project!');

// Add your JavaScript code here
document.addEventListener('DOMContentLoaded', function() {
    console.log('Project loaded successfully!');
    
    // Your code goes here
});`
    }
  };

  return baseTemplate;
}

export function downloadProjectTemplate(template: ProjectTemplate) {
  // Create a zip-like structure for download
  const projectData = {
    name: template.name,
    files: template.files,
    instructions: template.instructions,
    learningGoals: template.learningGoals
  };

  // Convert to downloadable format
  const dataStr = JSON.stringify(projectData, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${template.name.toLowerCase().replace(/\s+/g, '-')}-template.json`;
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
  
  // Also create individual files for easy access
  Object.entries(template.files).forEach(([filename, content]) => {
    const fileBlob = new Blob([content], { type: 'text/plain' });
    const fileUrl = URL.createObjectURL(fileBlob);
    const fileLink = document.createElement('a');
    fileLink.href = fileUrl;
    fileLink.download = filename;
    
    // Don't auto-download individual files, just prepare them
    URL.revokeObjectURL(fileUrl);
  });
  
  return projectData;
}