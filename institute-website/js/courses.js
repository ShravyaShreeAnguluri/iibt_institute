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
    // Sample course data (simulating backend API)
        const coursesData = [
            {
                id: 1,
                title: "Complete JavaScript Bootcamp",
                description: "Master JavaScript from basics to advanced concepts including ES6+, DOM manipulation, and modern frameworks.",
                category: "Programming",
                level: "Beginner",
                price: 89.99,
                duration: 25,
                instructor: "John Smith",
                icon: "💻"
            },
            {
                id: 2,
                title: "React.js Masterclass",
                description: "Build modern web applications with React, Redux, and advanced React patterns.",
                category: "Programming",
                level: "Intermediate",
                price: 129.99,
                duration: 30,
                instructor: "Sarah Wilson",
                icon: "⚛"
            },
            {
                id: 3,
                title: "Digital Marketing Fundamentals",
                description: "Learn SEO, social media marketing, content strategy, and analytics to grow your business online.",
                category: "Marketing",
                level: "Beginner",
                price: 0,
                duration: 15,
                instructor: "Mike Johnson",
                icon: "📈"
            },
            {
                id: 4,
                title: "Python Data Science",
                description: "Analyze data using Python, pandas, numpy, and machine learning libraries.",
                category: "Data Science",
                level: "Intermediate",
                price: 159.99,
                duration: 40,
                instructor: "Dr. Emily Chen",
                icon: "🐍"
            },
            {
                id: 5,
                title: "UI/UX Design Principles",
                description: "Create beautiful and user-friendly interfaces using design thinking and modern tools.",
                category: "Design",
                level: "Beginner",
                price: 79.99,
                duration: 20,
                instructor: "Alex Rivera",
                icon: "🎨"
            },
            {
                id: 6,
                title: "Machine Learning with TensorFlow",
                description: "Build and deploy machine learning models using TensorFlow and Keras.",
                category: "Data Science",
                level: "Advanced",
                price: 199.99,
                duration: 50,
                instructor: "Dr. James Park",
                icon: "🤖"
            },
            {
                id: 7,
                title: "WordPress Development",
                description: "Create custom WordPress themes and plugins from scratch.",
                category: "Programming",
                level: "Intermediate",
                price: 69.99,
                duration: 18,
                instructor: "Lisa Thompson",
                icon: "📝"
            },
            {
                id: 8,
                title: "Advanced Excel Analytics",
                description: "Master Excel formulas, pivot tables, VBA, and data visualization techniques.",
                category: "Business",
                level: "Intermediate",
                price: 49.99,
                duration: 12,
                instructor: "Robert Davis",
                icon: "📊"
            },
            {
                id: 9,
                title: "Blockchain Development",
                description: "Learn to build decentralized applications using Ethereum and Solidity.",
                category: "Programming",
                level: "Advanced",
                price: 249.99,
                duration: 35,
                instructor: "David Kim",
                icon: "⛓"
            },
            {
                id: 10,
                title: "Photoshop for Beginners",
                description: "Master photo editing, digital art, and graphic design using Adobe Photoshop.",
                category: "Design",
                level: "Beginner",
                price: 0,
                duration: 8,
                instructor: "Maria Garcia",
                icon: "🖼"
            },
            {
                id: 11,
                title: "Cloud Computing with AWS",
                description: "Deploy and manage applications on Amazon Web Services cloud platform.",
                category: "Technology",
                level: "Intermediate",
                price: 179.99,
                duration: 28,
                instructor: "Kevin Brown",
                icon: "☁"
            },
            {
                id: 12,
                title: "Project Management Professional",
                description: "Learn project management methodologies, tools, and best practices for successful delivery.",
                category: "Business",
                level: "Intermediate",
                price: 119.99,
                duration: 22,
                instructor: "Jennifer Lee",
                icon: "📋"
            }
        ];

        let filteredCourses = [...coursesData];
        let currentFilters = {
            search: '',
            category: '',
            level: '',
            price: '',
            duration: ''
        };

        // Initialize the application
        function init() {
            createFloatingCubes();
            populateCategories();
            displayCourses(coursesData);
            setupEventListeners();
            updateResultsCount();
        }

        // Populate category filter options
        function populateCategories() {
            const categories = [...new Set(coursesData.map(course => course.category))];
            const categorySelect = document.getElementById('categoryFilter');
            
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                categorySelect.appendChild(option);
            });
        }

        // Setup event listeners
        function setupEventListeners() {
            document.getElementById('searchInput').addEventListener('input', handleSearch);
            document.getElementById('categoryFilter').addEventListener('change', handleCategoryFilter);
            document.getElementById('levelFilter').addEventListener('change', handleLevelFilter);
            document.getElementById('priceFilter').addEventListener('change', handlePriceFilter);
            document.getElementById('durationFilter').addEventListener('change', handleDurationFilter);
        }

        // Handle search
        function handleSearch(e) {
            currentFilters.search = e.target.value.toLowerCase();
            applyFilters();
        }

        // Handle category filter
        function handleCategoryFilter(e) {
            currentFilters.category = e.target.value;
            applyFilters();
        }

        // Handle level filter
        function handleLevelFilter(e) {
            currentFilters.level = e.target.value;
            applyFilters();
        }

        // Handle price filter
        function handlePriceFilter(e) {
            currentFilters.price = e.target.value;
            applyFilters();
        }

        // Handle duration filter
        function handleDurationFilter(e) {
            currentFilters.duration = e.target.value;
            applyFilters();
        }

        // Apply all filters
        function applyFilters() {
            showLoading();
            
            setTimeout(() => {
                filteredCourses = coursesData.filter(course => {
                    // Search filter
                    if (currentFilters.search && !matchesSearch(course, currentFilters.search)) {
                        return false;
                    }

                    // Category filter
                    if (currentFilters.category && course.category !== currentFilters.category) {
                        return false;
                    }

                    // Level filter
                    if (currentFilters.level && course.level !== currentFilters.level) {
                        return false;
                    }

                    // Price filter
                    if (currentFilters.price && !matchesPriceRange(course.price, currentFilters.price)) {
                        return false;
                    }

                    // Duration filter
                    if (currentFilters.duration && !matchesDuration(course.duration, currentFilters.duration)) {
                        return false;
                    }

                    return true;
                });

                displayCourses(filteredCourses);
                updateResultsCount();
                hideLoading();
            }, 300);
        }

        // Check if course matches search query
        function matchesSearch(course, query) {
            const searchFields = [
                course.title,
                course.description,
                course.instructor,
                course.category
            ].join(' ').toLowerCase();
            
            return searchFields.includes(query);
        }

        // Check if price matches selected range
        function matchesPriceRange(price, range) {
            switch (range) {
                case 'free':
                    return price === 0;
                case '0-50':
                    return price > 0 && price <= 50;
                case '50-100':
                    return price > 50 && price <= 100;
                case '100-200':
                    return price > 100 && price <= 200;
                case '200+':
                    return price > 200;
                default:
                    return true;
            }
        }

        // Check if duration matches selected range
        function matchesDuration(duration, range) {
            switch (range) {
                case 'short':
                    return duration < 5;
                case 'medium':
                    return duration >= 5 && duration <= 20;
                case 'long':
                    return duration > 20;
                default:
                    return true;
            }
        }

        // Display courses
        function displayCourses(courses) {
            const coursesGrid = document.getElementById('coursesGrid');
            const noResults = document.getElementById('noResults');

            if (courses.length === 0) {
                coursesGrid.style.display = 'none';
                noResults.style.display = 'block';
                return;
            }

            coursesGrid.style.display = 'grid';
            noResults.style.display = 'none';

            coursesGrid.innerHTML = courses.map(course => `
                <div class="course-card" onclick="enrollCourse(${course.id})">
                    <div class="course-image">
                        <span class="course-level">${course.level}</span>
                        ${course.icon}
                    </div>
                    <div class="course-content">
                        <div class="course-category">${course.category}</div>
                        <h3 class="course-title">${course.title}</h3>
                        <p class="course-description">${course.description}</p>
                        <div class="course-meta">
                            <span class="course-duration">${course.duration} hours</span>
                            <span class="course-instructor">${course.instructor}</span>
                        </div>
                        <div class="course-footer">
                            <span class="course-price ${course.price === 0 ? 'free' : ''}">
                                ${course.price === 0 ? 'Free' : '$' + course.price}
                            </span>
                            <button class="enroll-btn" onclick="event.stopPropagation(); enrollCourse(${course.id})">
                                Enroll Now
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // Update results count
        function updateResultsCount() {
            document.getElementById('resultsCount').textContent = filteredCourses.length;
        }

        // Show loading state
        function showLoading() {
            document.getElementById('loading').classList.add('show');
            document.getElementById('coursesGrid').style.opacity = '0.5';
        }

        // Hide loading state
        function hideLoading() {
            document.getElementById('loading').classList.remove('show');
            document.getElementById('coursesGrid').style.opacity = '1';
        }

        // Clear all filters
        function clearAllFilters() {
            currentFilters = {
                search: '',
                category: '',
                level: '',
                price: '',
                duration: ''
            };

            document.getElementById('searchInput').value = '';
            document.getElementById('categoryFilter').value = '';
            document.getElementById('levelFilter').value = '';
            document.getElementById('priceFilter').value = '';
            document.getElementById('durationFilter').value = '';

            filteredCourses = [...coursesData];
            displayCourses(filteredCourses);
            updateResultsCount();
        }

        // Enroll in course (simulated backend call)
        function enrollCourse(courseId) {
            const course = coursesData.find(c => c.id === courseId);
            if (course) {
                alert(`Enrolling in "${course.title}"!\n\nPrice: ${course.price === 0 ? 'Free' : '$' + course.price}\nInstructor: ${course.instructor}\n\nThis would normally redirect to payment/enrollment page.`);
                
                // Simulate API call
                console.log('API Call: POST /api/enroll', {
                    courseId: courseId,
                    userId: 'current_user_id',
                    timestamp: new Date().toISOString()
                });
            }
        }

        // Initialize the application when DOM is loaded
        document.addEventListener('DOMContentLoaded', init);