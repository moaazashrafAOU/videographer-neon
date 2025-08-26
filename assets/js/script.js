// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 100
});

// Loading Screen
class LoadingScreen {
    constructor() {
        this.loadingScreen = document.getElementById('loading-screen');
        this.init();
    }

    init() {
        // Simulate loading time
        setTimeout(() => {
            this.hideLoading();
        }, 2000);
    }

    hideLoading() {
        this.loadingScreen.classList.add('hidden');
        setTimeout(() => {
            this.loadingScreen.style.display = 'none';
        }, 500);
    }
}

// Smooth scrolling for anchor links
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

// Counter animation for stats
class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number');
        this.animated = false;
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated) {
                    this.animateCounters();
                    this.animated = true;
                }
            });
        }, { threshold: 0.5 });

        this.counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    animateCounters() {
        this.counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                    // Add extra glow effect when reaching target
                    counter.parentElement.style.transform = 'rotate(-45deg) scale(1.1)';
                    setTimeout(() => {
                        counter.parentElement.style.transform = 'rotate(-45deg) scale(1)';
                    }, 300);
                }
            };

            updateCounter();
        });
    }
}

// Video loader and Drive URL converter
class VideoLoader {
    constructor() {
        this.portfolioGrid = document.getElementById('portfolioGrid');
        this.init();
    }

    async init() {
        try {
            const response = await fetch('assets/data/config.json');
            const data = await response.json();
            this.renderVideos(data.videos);
        } catch (error) {
            console.error('Error loading videos:', error);
            this.showErrorMessage();
        }
    }

    toDrivePreview(url) {
        // Support Vimeo player URLs directly
        if (/player\.vimeo\.com/.test(url)) {
            return url;
        }
        
        // Support regular Vimeo URLs
        if (/vimeo\.com/.test(url)) {
            const vimeoId = url.match(/vimeo\.com\/(\d+)/);
            if (vimeoId) {
                return `https://player.vimeo.com/video/${vimeoId[1]}?badge=0&autopause=0&player_id=0&app_id=58479`;
            }
        }
        
        // Legacy Google Drive support
        if (/drive\.google\.com/.test(url)) {
            const byPath = url.match(/\/d\/([\w-]+)/);
            const byQuery = url.match(/[?&]id=([\w-]+)/);
            const id = byPath?.[1] || byQuery?.[1];
            if (id) return `https://drive.google.com/file/d/${id}/preview`;
        }
        
        // YouTube fallback
        const yt = url.match(/(?:v=|youtu\.be\/)([\w-]+)/);
        if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
        
        return url; // as-is
    }

    renderVideos(videos) {
        // Sort videos by featured status
        const sortedVideos = videos.sort((a, b) => {
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return 0;
        });

        this.portfolioGrid.innerHTML = '';

        sortedVideos.forEach((video, index) => {
            const videoElement = this.createVideoElement(video, index);
            this.portfolioGrid.appendChild(videoElement);
        });
    }

    createVideoElement(video, index) {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        portfolioItem.setAttribute('data-aos', 'fade-up');
        portfolioItem.setAttribute('data-aos-delay', (index * 100).toString());

        const previewUrl = this.toDrivePreview(video.url);
        const orientationClass = video.orientation === 'portrait' ? 'portrait' : 'landscape';

        portfolioItem.innerHTML = `
            <div class="video-container ${orientationClass}">
                <div class="skeleton" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; background: linear-gradient(45deg, #1a1a1a, #2a2a2a); border-radius: 10px;"></div>
                <iframe 
                    class="video-iframe" 
                    src="${previewUrl}" 
                    loading="lazy"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                    onload="this.previousElementSibling.style.display='none'"
                    style="width: 100%; height: 100%; border-radius: 10px;"
                ></iframe>
            </div>
            <div class="portfolio-info">
            </div>
        `;

        return portfolioItem;
    }

    showErrorMessage() {
        this.portfolioGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                <p style="color: var(--color-primary); font-size: 18px;">Error loading videos</p>
                <p style="color: var(--color-text); margin-top: 8px;">Please try again later</p>
            </div>
        `;
    }
}

// Parallax effect for hero section
class ParallaxEffect {
    constructor() {
        this.heroImage = document.querySelector('.hero-image');
        this.neonGrid = document.querySelector('.neon-grid');
        this.particles = document.querySelectorAll('.particle');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (this.heroImage) {
                this.heroImage.style.transform = `translateY(${rate}px)`;
            }
            
            if (this.neonGrid) {
                this.neonGrid.style.transform = `translateY(${rate * 0.3}px)`;
            }
            
            // Animate particles based on scroll
            this.particles.forEach((particle, index) => {
                const particleRate = rate * (0.1 + index * 0.05);
                particle.style.transform = `translateY(${particleRate}px)`;
            });
        });
    }
}

// Interactive neon effects
class NeonEffects {
    constructor() {
        this.init();
    }

    init() {
        this.setupHoverEffects();
        this.setupClickEffects();
        this.setupRandomGlows();
    }

    setupHoverEffects() {
        // Service cards hover effects
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.addRandomGlow(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.removeRandomGlow(card);
            });
        });

        // Portfolio items hover effects
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        portfolioItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                this.addNeonBorder(item);
            });
            
            item.addEventListener('mouseleave', () => {
                this.removeNeonBorder(item);
            });
        });
    }

    setupClickEffects() {
        // Add ripple effect to buttons
        const buttons = document.querySelectorAll('.btn-neon, .contact-icon');
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.createRipple(e, button);
            });
        });
    }

    setupRandomGlows() {
        // Add random glow effects to elements
        setInterval(() => {
            this.randomGlowEffect();
        }, 3000);
    }

    addRandomGlow(element) {
        const colors = ['var(--color-primary)', 'var(--color-accent)', 'var(--color-glow)', 'var(--color-secondary)'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        element.style.boxShadow = `0 0 30px ${randomColor}`;
    }

    removeRandomGlow(element) {
        element.style.boxShadow = '';
    }

    addNeonBorder(element) {
        element.style.borderColor = 'var(--color-primary)';
        element.style.boxShadow = '0 0 30px rgba(0, 240, 255, 0.5)';
    }

    removeNeonBorder(element) {
        element.style.borderColor = '';
        element.style.boxShadow = '';
    }

    createRipple(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(0, 240, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 1000;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    randomGlowEffect() {
        const glowElements = document.querySelectorAll('.neon-blue-glow, .neon-pink-glow, .neon-purple, .neon-blue');
        const randomElement = glowElements[Math.floor(Math.random() * glowElements.length)];
        
        if (randomElement) {
            randomElement.style.animation = 'none';
            setTimeout(() => {
                randomElement.style.animation = 'neonPulse 1s ease-in-out';
            }, 10);
        }
    }
}

// Performance optimization
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        // Lazy load images
        this.setupLazyLoading();
        
        // Optimize animations based on device performance
        this.optimizeAnimations();
        
        // Setup intersection observer for performance
        this.setupIntersectionObserver();
    }

    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    optimizeAnimations() {
        // Reduce animations on low-end devices
        const isLowEndDevice = navigator.hardwareConcurrency <= 2 || 
                              navigator.deviceMemory <= 2;
        
        if (isLowEndDevice) {
            document.documentElement.style.setProperty('--transition-fast', '0.1s');
            document.documentElement.style.setProperty('--transition-normal', '0.2s');
            document.documentElement.style.setProperty('--transition-slow', '0.3s');
        }
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '50px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.service-card, .portfolio-item, .stat-diamond, .contact-icon').forEach(el => {
            observer.observe(el);
        });
    }
}

// Mouse trail effect
class MouseTrail {
    constructor() {
        this.trail = [];
        this.maxTrailLength = 10;
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.addTrailPoint(e.clientX, e.clientY);
        });
        
        this.animate();
    }

    addTrailPoint(x, y) {
        this.trail.push({ x, y, life: 1 });
        
        if (this.trail.length > this.maxTrailLength) {
            this.trail.shift();
        }
    }

    animate() {
        // Clear previous trail
        const existingTrails = document.querySelectorAll('.mouse-trail');
        existingTrails.forEach(trail => trail.remove());
        
        // Create new trail points
        this.trail.forEach((point, index) => {
            const trailElement = document.createElement('div');
            trailElement.className = 'mouse-trail';
            trailElement.style.cssText = `
                position: fixed;
                width: ${4 + index * 2}px;
                height: ${4 + index * 2}px;
                background: var(--color-primary);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9998;
                left: ${point.x}px;
                top: ${point.y}px;
                opacity: ${point.life * 0.5};
                box-shadow: 0 0 10px var(--color-primary);
                transform: translate(-50%, -50%);
            `;
            
            document.body.appendChild(trailElement);
            
            // Fade out
            point.life -= 0.1;
        });
        
        // Remove dead points
        this.trail = this.trail.filter(point => point.life > 0);
        
        requestAnimationFrame(() => this.animate());
    }
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize VANTA.HALO background
    if (typeof VANTA !== 'undefined' && VANTA.HALO) {
        VANTA.HALO({
            el: "#vanta-background",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            backgroundColor: 0x0a0a0f,
            amplitudeFactor: 1.00,
            xOffset: 0.00,
            yOffset: 0.00,
            size: 1.00
        });
    }
    
    // Initialize all components
    new LoadingScreen();
    new CounterAnimation();
    new VideoLoader();
    new ParallaxEffect();
    new NeonEffects();
    new PerformanceOptimizer();
    new MouseTrail();
    
    // Add loading complete class
    document.body.classList.add('loaded');
    
    console.log('Neon Videographer Portfolio loaded successfully!');
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .mouse-trail {
        transition: opacity 0.1s ease-out;
    }
`;
document.head.appendChild(style);

// Handle reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--transition-fast', '0.01ms');
    document.documentElement.style.setProperty('--transition-normal', '0.01ms');
    document.documentElement.style.setProperty('--transition-slow', '0.01ms');
    
    // Disable mouse trail for reduced motion
    document.addEventListener('DOMContentLoaded', () => {
        const mouseTrails = document.querySelectorAll('.mouse-trail');
        mouseTrails.forEach(trail => trail.remove());
    });
}

