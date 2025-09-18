// Animated background
        function createFloatingCubes() {
            const bgAnimation = document.getElementById('bgAnimation');
            for (let i = 0; i < 20; i++) {
                const cube = document.createElement('div');
                cube.className = 'floating-cube';
                cube.style.left = Math.random() * 100 + '%';
                cube.style.top = Math.random() * 100 + '%';
                cube.style.animationDelay = Math.random() * 8 + 's';
                cube.style.animationDuration = (Math.random() * 4 + 6) + 's';
                bgAnimation.appendChild(cube);
            }
        }

        // Scroll reveal animation
        function revealOnScroll() {
            const reveals = document.querySelectorAll('.scroll-reveal');
            
            reveals.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('active');
                }
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

        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(0, 0, 0, 0.98)';
            } else {
                header.style.background = 'rgba(0, 0, 0, 0.95)';
            }
            
            revealOnScroll();
        });

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            createFloatingCubes();
            revealOnScroll();
        });

        // Add interactive hover effects
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.05)';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Hamburger menu toggle for mobile nav
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('open');
            // Animate hamburger icon
            if (hamburger.classList.contains('open')) {
                hamburger.children[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                hamburger.children[1].style.opacity = '0';
                hamburger.children[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
            } else {
                hamburger.children[0].style.transform = '';
                hamburger.children[1].style.opacity = '1';
                hamburger.children[2].style.transform = '';
            }
        });
 
    function toggleMobileMenu() {
        const navLinks = document.getElementById("navLinks");
        navLinks.classList.toggle("active");
    }


// Newsletter form submission
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('.newsletter-input').value;
    if (email) {
        alert('Thank you for subscribing! We will keep you updated with the latest blockchain training programs.');
        this.querySelector('.newsletter-input').value = '';
    }
});

// Contact section scroll behavior
document.querySelectorAll('a[href="#contact"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        // Scroll to footer contact section
        document.querySelector('footer').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Feature items hover effect
document.querySelectorAll('.feature-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.borderLeftColor = '#00d4aa';
        this.style.transform = 'translateX(15px)';
        this.style.backgroundColor = 'rgba(0, 212, 170, 0.05)';
    });
    item.addEventListener('mouseleave', function() {
        this.style.borderLeftColor = 'rgba(0, 212, 170, 0.3)';
        this.style.transform = 'translateX(0)';
        this.style.backgroundColor = 'transparent';
    });
});

// Event blocks hover effects
document.querySelectorAll('.event-block').forEach(block => {
    block.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
        this.style.borderColor = '#00d4aa';
        this.style.boxShadow = '0 30px 70px rgba(0, 212, 170, 0.25)';
    });
    block.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.borderColor = 'rgba(0, 212, 170, 0.2)';
        this.style.boxShadow = 'none';
    });
});

// Staggered animation for training sections
document.addEventListener('DOMContentLoaded', () => {
    const trainingSections = document.querySelectorAll('.training-section');
    trainingSections.forEach((section, index) => {
        section.style.animationDelay = `${index * 0.2}s`;
    });
});