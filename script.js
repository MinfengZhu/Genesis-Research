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

    // Initialize Conway's Game of Life
    initializeGameOfLife();

    // Remove old parallax code since we're using dragon curve now

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

// Conway's Game of Life Implementation
class GameOfLife {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.cols = 75;
        this.rows = 50;
        this.cellSize = 8;
        this.grid = [];
        this.nextGrid = [];
        this.generation = 0;
        this.isRunning = false;
        this.animationId = null;
        
        // Colors
        this.aliveColor = '#3b82f6';
        this.deadColor = '#f8fafc';
        this.gridColor = '#e2e8f0';
        
        this.initializeGrid();
        this.setupEventListeners();
        this.draw();
    }
    
    initializeGrid() {
        // Initialize both grids with dead cells
        for (let i = 0; i < this.cols; i++) {
            this.grid[i] = [];
            this.nextGrid[i] = [];
            for (let j = 0; j < this.rows; j++) {
                this.grid[i][j] = 0;
                this.nextGrid[i][j] = 0;
            }
        }
        
        // Randomly select and place meaningful animal-like patterns
        this.addRandomAnimalPatterns();
    }
    
    addRandomAnimalPatterns() {
        // Available animal patterns
        const animalPatterns = [
            { name: 'Fish', method: this.addFish.bind(this) },
            { name: 'Bird', method: this.addBird.bind(this) },
            { name: 'Butterfly', method: this.addButterfly.bind(this) },
            { name: 'Rabbit', method: this.addRabbit.bind(this) },
            { name: 'Cat', method: this.addCat.bind(this) },
            { name: 'Dog', method: this.addDog.bind(this) }
        ];
        
        // Randomly select 3-5 different patterns
        const numPatterns = 3 + Math.floor(Math.random() * 3);
        const selectedPatterns = [];
        
        // Shuffle and select patterns
        const shuffled = [...animalPatterns].sort(() => 0.5 - Math.random());
        for (let i = 0; i < Math.min(numPatterns, shuffled.length); i++) {
            selectedPatterns.push(shuffled[i]);
        }
        
        // Place patterns at random positions
        selectedPatterns.forEach(pattern => {
            const x = 5 + Math.floor(Math.random() * (this.cols - 15));
            const y = 5 + Math.floor(Math.random() * (this.rows - 15));
            pattern.method(x, y);
        });
    }
    
    // Animal-like patterns
    addFish(x, y) {
        const pattern = [
            [0, 0, 1, 1, 0],
            [0, 1, 0, 0, 1],
            [1, 0, 0, 0, 0],
            [1, 0, 0, 0, 1],
            [1, 0, 0, 1, 0],
            [0, 1, 1, 0, 0]
        ];
        this.addPattern(x, y, pattern);
    }
    
    addBird(x, y) {
        const pattern = [
            [0, 0, 1, 0, 0],
            [0, 1, 0, 1, 0],
            [1, 0, 0, 0, 1],
            [0, 1, 1, 1, 0],
            [0, 0, 1, 0, 0]
        ];
        this.addPattern(x, y, pattern);
    }
    
    addButterfly(x, y) {
        const pattern = [
            [1, 0, 0, 0, 1],
            [0, 1, 0, 1, 0],
            [0, 0, 1, 0, 0],
            [0, 1, 0, 1, 0],
            [1, 0, 0, 0, 1]
        ];
        this.addPattern(x, y, pattern);
    }
    
    addRabbit(x, y) {
        const pattern = [
            [0, 1, 0, 1, 0],
            [1, 0, 1, 0, 1],
            [1, 0, 0, 0, 1],
            [0, 1, 0, 1, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 1, 0, 0]
        ];
        this.addPattern(x, y, pattern);
    }
    
    addCat(x, y) {
        const pattern = [
            [1, 0, 0, 0, 1],
            [0, 1, 0, 1, 0],
            [0, 0, 1, 0, 0],
            [0, 1, 1, 1, 0],
            [1, 0, 1, 0, 1],
            [0, 0, 1, 0, 0]
        ];
        this.addPattern(x, y, pattern);
    }
    
    addDog(x, y) {
        const pattern = [
            [0, 1, 1, 1, 0],
            [1, 0, 1, 0, 1],
            [1, 0, 0, 0, 1],
            [1, 0, 1, 0, 1],
            [0, 1, 0, 1, 0],
            [0, 0, 1, 0, 0]
        ];
        this.addPattern(x, y, pattern);
    }
    
    addPattern(startX, startY, pattern) {
        for (let i = 0; i < pattern.length; i++) {
            for (let j = 0; j < pattern[i].length; j++) {
                const x = (startX + j) % this.cols;
                const y = (startY + i) % this.rows;
                this.grid[x][y] = pattern[i][j];
            }
        }
    }
    
    setupEventListeners() {
        // Canvas click to toggle cells (optional interaction)
        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = Math.floor((e.clientX - rect.left) / this.cellSize);
            const y = Math.floor((e.clientY - rect.top) / this.cellSize);
            
            if (x >= 0 && x < this.cols && y >= 0 && y < this.rows) {
                this.grid[x][y] = this.grid[x][y] ? 0 : 1;
                this.draw();
            }
        });
    }
    
    
    play() {
        this.isRunning = true;
        this.animate();
    }
    
    stop() {
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
    
    animate() {
        if (!this.isRunning) return;
        
        this.step();
        
        // Slow down the animation (approximately 8 fps)
        setTimeout(() => {
            this.animationId = requestAnimationFrame(() => this.animate());
        }, 125);
    }
    
    step() {
        // Calculate next generation
        for (let x = 0; x < this.cols; x++) {
            for (let y = 0; y < this.rows; y++) {
                const neighbors = this.countNeighbors(x, y);
                const current = this.grid[x][y];
                
                // Conway's rules
                if (current === 1) {
                    // Live cell
                    if (neighbors < 2 || neighbors > 3) {
                        this.nextGrid[x][y] = 0; // Dies
                    } else {
                        this.nextGrid[x][y] = 1; // Survives
                    }
                } else {
                    // Dead cell
                    if (neighbors === 3) {
                        this.nextGrid[x][y] = 1; // Birth
                    } else {
                        this.nextGrid[x][y] = 0; // Stays dead
                    }
                }
            }
        }
        
        // Swap grids
        [this.grid, this.nextGrid] = [this.nextGrid, this.grid];
        
        this.generation++;
        this.draw();
    }
    
    countNeighbors(x, y) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue; // Skip center cell
                
                const neighborX = (x + i + this.cols) % this.cols;
                const neighborY = (y + j + this.rows) % this.rows;
                count += this.grid[neighborX][neighborY];
            }
        }
        return count;
    }
    
    clear() {
        this.stop();
        
        for (let x = 0; x < this.cols; x++) {
            for (let y = 0; y < this.rows; y++) {
                this.grid[x][y] = 0;
            }
        }
        this.generation = 0;
        this.draw();
    }
    
    randomize() {
        this.stop();
        
        for (let x = 0; x < this.cols; x++) {
            for (let y = 0; y < this.rows; y++) {
                this.grid[x][y] = Math.random() < 0.3 ? 1 : 0;
            }
        }
        this.generation = 0;
        this.draw();
    }
    
    draw() {
        // Clear canvas
        this.ctx.fillStyle = this.deadColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw cells
        for (let x = 0; x < this.cols; x++) {
            for (let y = 0; y < this.rows; y++) {
                if (this.grid[x][y] === 1) {
                    this.ctx.fillStyle = this.aliveColor;
                    this.ctx.fillRect(
                        x * this.cellSize, 
                        y * this.cellSize, 
                        this.cellSize - 1, 
                        this.cellSize - 1
                    );
                }
            }
        }
        
        // Draw grid lines (subtle)
        this.ctx.strokeStyle = this.gridColor;
        this.ctx.lineWidth = 0.5;
        
        // Vertical lines
        for (let x = 0; x <= this.cols; x++) {
            this.ctx.beginPath();
            this.ctx.moveTo(x * this.cellSize, 0);
            this.ctx.lineTo(x * this.cellSize, this.canvas.height);
            this.ctx.stroke();
        }
        
        // Horizontal lines
        for (let y = 0; y <= this.rows; y++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y * this.cellSize);
            this.ctx.lineTo(this.canvas.width, y * this.cellSize);
            this.ctx.stroke();
        }
    }
}

// Initialize Conway's Game of Life
function initializeGameOfLife() {
    const canvas = document.getElementById('life-canvas');
    if (!canvas) return;
    
    // Set canvas size
    canvas.width = 600;
    canvas.height = 400;
    
    const gameOfLife = new GameOfLife(canvas);
    
    // Auto-start after a brief delay
    setTimeout(() => {
        gameOfLife.play();
    }, 2000);
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