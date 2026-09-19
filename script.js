document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for in-page navigation links
    const navLinks = document.querySelectorAll('.nav-link, .logo');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href || !href.startsWith('#')) return; // let the browser navigate to other pages normally

            e.preventDefault();
            const targetSection = document.querySelector(href);

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

    // Header hide-on-scroll-down
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop;
    });

    // Fade-in on scroll for cards
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

    const animatedElements = document.querySelectorAll('.research-card, .mission-principle');
    animatedElements.forEach(el => observer.observe(el));

    // Initialize Conway's Game of Life
    initializeGameOfLife();
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
        this.aliveColor = '#1c2541';
        this.deadColor = '#fdfaf3';
        this.gridColor = '#ddd0ad';

        this.initializeGrid();
        this.setupEventListeners();
        this.draw();
    }

    initializeGrid() {
        for (let i = 0; i < this.cols; i++) {
            this.grid[i] = [];
            this.nextGrid[i] = [];
            for (let j = 0; j < this.rows; j++) {
                this.grid[i][j] = 0;
                this.nextGrid[i][j] = 0;
            }
        }

        this.addRandomAnimalPatterns();
    }

    addRandomAnimalPatterns() {
        const animalPatterns = [
            { name: 'Fish', method: this.addFish.bind(this) },
            { name: 'Bird', method: this.addBird.bind(this) },
            { name: 'Butterfly', method: this.addButterfly.bind(this) },
            { name: 'Rabbit', method: this.addRabbit.bind(this) },
            { name: 'Cat', method: this.addCat.bind(this) },
            { name: 'Dog', method: this.addDog.bind(this) }
        ];

        const numPatterns = 3 + Math.floor(Math.random() * 3);
        const selectedPatterns = [];

        const shuffled = [...animalPatterns].sort(() => 0.5 - Math.random());
        for (let i = 0; i < Math.min(numPatterns, shuffled.length); i++) {
            selectedPatterns.push(shuffled[i]);
        }

        selectedPatterns.forEach(pattern => {
            const x = 5 + Math.floor(Math.random() * (this.cols - 15));
            const y = 5 + Math.floor(Math.random() * (this.rows - 15));
            pattern.method(x, y);
        });
    }

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

        setTimeout(() => {
            this.animationId = requestAnimationFrame(() => this.animate());
        }, 125);
    }

    step() {
        for (let x = 0; x < this.cols; x++) {
            for (let y = 0; y < this.rows; y++) {
                const neighbors = this.countNeighbors(x, y);
                const current = this.grid[x][y];

                if (current === 1) {
                    if (neighbors < 2 || neighbors > 3) {
                        this.nextGrid[x][y] = 0;
                    } else {
                        this.nextGrid[x][y] = 1;
                    }
                } else {
                    if (neighbors === 3) {
                        this.nextGrid[x][y] = 1;
                    } else {
                        this.nextGrid[x][y] = 0;
                    }
                }
            }
        }

        [this.grid, this.nextGrid] = [this.nextGrid, this.grid];

        this.generation++;
        this.draw();
    }

    countNeighbors(x, y) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;

                const neighborX = (x + i + this.cols) % this.cols;
                const neighborY = (y + j + this.rows) % this.rows;
                count += this.grid[neighborX][neighborY];
            }
        }
        return count;
    }

    draw() {
        this.ctx.fillStyle = this.deadColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

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

        this.ctx.strokeStyle = this.gridColor;
        this.ctx.lineWidth = 0.5;

        for (let x = 0; x <= this.cols; x++) {
            this.ctx.beginPath();
            this.ctx.moveTo(x * this.cellSize, 0);
            this.ctx.lineTo(x * this.cellSize, this.canvas.height);
            this.ctx.stroke();
        }

        for (let y = 0; y <= this.rows; y++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y * this.cellSize);
            this.ctx.lineTo(this.canvas.width, y * this.cellSize);
            this.ctx.stroke();
        }
    }
}

function initializeGameOfLife() {
    const canvas = document.getElementById('life-canvas');
    if (!canvas) return;

    canvas.width = 600;
    canvas.height = 400;

    const gameOfLife = new GameOfLife(canvas);

    setTimeout(() => {
        gameOfLife.play();
    }, 1000);
}
