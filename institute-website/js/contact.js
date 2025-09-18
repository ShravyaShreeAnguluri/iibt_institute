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
            // Add fade-in animation to hero section
            setTimeout(() => {
                document.querySelector('.contact-hero').style.opacity = '1';
            }, 300);
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

            // Contact form submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simple form validation
            if (!data.firstName || !data.lastName || !data.email || !data.phone || !data.subject || !data.message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Phone validation (basic)
            const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(data.phone)) {
                alert('Please enter a valid phone number.');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('.btn-primary');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you within 24 hours.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });

        // Newsletter form submission
        document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('.newsletter-input').value;
            
            if (email) {
                const btn = this.querySelector('.newsletter-btn');
                const originalText = btn.textContent;
                btn.textContent = 'Subscribing...';
                btn.disabled = true;
                
                setTimeout(() => {
                    alert('Thank you for subscribing to our newsletter!');
                    this.reset();
                    btn.textContent = originalText;
                    btn.disabled = false;
                }, 1500);
            }
        });
               // Add smooth transitions to form fields
        document.querySelectorAll('input, textarea, select').forEach(field => {
            field.addEventListener('focus', function() {
                this.parentElement.style.transform = 'translateY(-2px)';
            });
            
            field.addEventListener('blur', function() {
                this.parentElement.style.transform = 'translateY(0)';
            });
        });
