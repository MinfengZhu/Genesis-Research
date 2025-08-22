// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Navigation smooth scrolling
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.research-card, .publication-item, .demo-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Dynamic neural network connections
    createNeuralNetworkConnections();

    // Parallax effect for floating equations
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const equations = document.querySelectorAll('.floating-equation');
        
        equations.forEach((equation, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            equation.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Message sent successfully!', 'success');
            this.reset();
        });
    }

    // Demo button interactions
    const demoButtons = document.querySelectorAll('.demo-card .btn-primary');
    demoButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const demoCard = this.closest('.demo-card');
            const demoTitle = demoCard.querySelector('h3').textContent;
            
            // Simulate demo launch
            showNotification(`Launching ${demoTitle} demo...`, 'info');
            
            // Add loading state
            this.textContent = 'Loading...';
            this.style.pointerEvents = 'none';
            
            setTimeout(() => {
                this.textContent = 'Launch Demo';
                this.style.pointerEvents = 'auto';
                showNotification(`${demoTitle} demo ready!`, 'success');
            }, 2000);
        });
    });

    // Typing animation for hero section
    typeWriterEffect();

    // Mathematical visualization interactions
    initMathVisualizations();
});

// Create neural network connections
function createNeuralNetworkConnections() {
    const svg = document.querySelector('.network-svg');
    const connectionsGroup = svg.querySelector('.connections');
    
    if (!connectionsGroup) return;
    
    // Define node positions
    const layers = [
        [{x: 50, y: 75}, {x: 50, y: 125}, {x: 50, y: 175}, {x: 50, y: 225}],
        [{x: 150, y: 60}, {x: 150, y: 100}, {x: 150, y: 140}, {x: 150, y: 180}, {x: 150, y: 220}, {x: 150, y: 260}],
        [{x: 250, y: 75}, {x: 250, y: 125}, {x: 250, y: 175}, {x: 250, y: 225}],
        [{x: 350, y: 125}, {x: 350, y: 175}]
    ];
    
    // Create connections between layers
    for (let i = 0; i < layers.length - 1; i++) {
        const currentLayer = layers[i];
        const nextLayer = layers[i + 1];
        
        currentLayer.forEach(node1 => {
            nextLayer.forEach(node2 => {
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', node1.x);
                line.setAttribute('y1', node1.y);
                line.setAttribute('x2', node2.x);
                line.setAttribute('y2', node2.y);
                line.setAttribute('stroke', '#cbd5e1');
                line.setAttribute('stroke-width', '0.5');
                line.setAttribute('opacity', '0.3');
                line.classList.add('connection-line');
                
                connectionsGroup.appendChild(line);
            });
        });
    }
    
    // Animate connections
    animateConnections();
}

// Animate neural network connections
function animateConnections() {
    const connections = document.querySelectorAll('.connection-line');
    
    setInterval(() => {
        const randomConnection = connections[Math.floor(Math.random() * connections.length)];
        
        randomConnection.style.stroke = '#3b82f6';
        randomConnection.style.strokeWidth = '2';
        randomConnection.style.opacity = '1';
        
        setTimeout(() => {
            randomConnection.style.stroke = '#cbd5e1';
            randomConnection.style.strokeWidth = '0.5';
            randomConnection.style.opacity = '0.3';
        }, 500);
    }, 200);
}

// Typewriter effect for dynamic text
function typeWriterEffect() {
    const phrases = [
        "Advancing Mathematics Through Artificial Intelligence",
        "Discovering New Theorems with Machine Learning",
        "Revolutionizing Mathematical Research",
        "Building the Future of AI-Driven Math"
    ];
    
    let currentPhrase = 0;
    let currentChar = 0;
    let isDeleting = false;
    
    const titleElement = document.querySelector('.hero-title');
    if (!titleElement) return;
    
    function type() {
        const current = phrases[currentPhrase];
        
        if (isDeleting) {
            titleElement.textContent = current.substring(0, currentChar - 1);
            currentChar--;
        } else {
            titleElement.textContent = current.substring(0, currentChar + 1);
            currentChar++;
        }
        
        let typeSpeed = isDeleting ? 30 : 60;
        
        if (!isDeleting && currentChar === current.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && currentChar === 0) {
            isDeleting = false;
            currentPhrase = (currentPhrase + 1) % phrases.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    // Start after a delay
    setTimeout(type, 1000);
}

// Initialize mathematical visualizations
function initMathVisualizations() {
    // Equation solver animation
    const solverInputs = document.querySelectorAll('.solver-input');
    solverInputs.forEach(input => {
        input.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.color = '#10b981';
        });
        
        input.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.color = '#60a5fa';
        });
    });
    
    // Pattern sequence animation
    const sequences = document.querySelectorAll('.sequence');
    sequences.forEach(seq => {
        seq.addEventListener('click', function() {
            this.style.animation = 'pulse 0.5s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    });
    
    // Interactive equation hovering
    const equations = document.querySelectorAll('.floating-equation');
    equations.forEach(eq => {
        eq.addEventListener('mouseenter', function() {
            this.style.transform += ' scale(1.1)';
            this.style.zIndex = '10';
            this.style.boxShadow = '0 20px 25px -5px rgb(0 0 0 / 0.2)';
        });
        
        eq.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace(' scale(1.1)', '');
            this.style.zIndex = '1';
            this.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    const styles = {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '9999',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px'
    };
    
    Object.assign(notification.style, styles);
    
    // Set background color based on type
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6',
        warning: '#f59e0b'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .research-card, .publication-item, .demo-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .connection-line {
        transition: all 0.3s ease;
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
`;

document.head.appendChild(style);