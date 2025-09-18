document.addEventListener('DOMContentLoaded', function() {
    // Form navigation
    const formSections = document.querySelectorAll('.form-section');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    const form = document.getElementById('registration-form');
    const successMessage = document.querySelector('.success-message');
    
    let currentSection = 0;
    
    // Show first section initially
    showSection(currentSection);
    
    // Update navigation buttons
    function updateButtons() {
        if (currentSection === 0) {
            prevBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'block';
        }
        
        if (currentSection === formSections.length - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'block';
        } else {
            nextBtn.style.display = 'block';
            submitBtn.style.display = 'none';
        }
    }
    
    // Show specific section
    function showSection(index) {
        formSections.forEach(section => {
            section.classList.remove('active');
        });
        formSections[index].classList.add('active');
        currentSection = index;
        updateButtons();
    }
    
    // Validate current section
    function validateSection() {
        const inputs = formSections[currentSection].querySelectorAll('input, select, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim() && input.hasAttribute('required')) {
                isValid = false;
                document.getElementById(input.id + '-error').style.display = 'block';
            } else {
                document.getElementById(input.id + '-error').style.display = 'none';
            }
            
            // Email validation
            if (input.type === 'email' && input.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    isValid = false;
                    document.getElementById(input.id + '-error').style.display = 'block';
                }
            }
        });
        
        return isValid;
    }
    
    // Next button click
    nextBtn.addEventListener('click', function() {
        if (validateSection()) {
            showSection(currentSection + 1);
        }
    });
    
    // Previous button click
    prevBtn.addEventListener('click', function() {
        showSection(currentSection - 1);
    });
    
    // Form submission - UPDATED FOR BACKEND INTEGRATION
    // Form submission - UPDATED FOR BETTER ERROR HANDLING
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateSection()) {
        // Collect form data
        const formData = {
            fullname: document.getElementById('fullname').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            dob: document.getElementById('dob').value,
            education: document.getElementById('education').value,
            institution: document.getElementById('institution').value,
            year: parseInt(document.getElementById('year').value),
            course: document.getElementById('course').value,
            message: document.getElementById('message').value,
            terms: document.getElementById('terms').checked ? 1 : 0
        };
        
        console.log('Sending data to server:', formData);
        
        // Show loading state
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;
        
        // Send data to server with explicit URL and error handling
        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            console.log('Response status:', response.status);
            if (!response.ok) {
                // Try to get error message from response
                return response.json().then(errorData => {
                    throw new Error(errorData.error || `Server error: ${response.status}`);
                }).catch(() => {
                    throw new Error(`Server error: ${response.status}`);
                });
            }
            return response.json();
        })
        .then(data => {
            console.log('Response data:', data);
            if (data.error) {
                throw new Error(data.error);
            }
            
            // Success
            form.style.display = 'none';
            successMessage.style.display = 'block';
            console.log('Registration successful!');
            
            // Optional: Show registration ID
            if (data.id) {
                successMessage.innerHTML += `<p>Registration ID: ${data.id}</p>`;
            }
        })
        .catch(error => {
            console.error('Full error details:', error);
            alert('Registration failed. Please try again later. Error: ' + error.message);
        })
        .finally(() => {
            submitBtn.textContent = 'Submit';
            submitBtn.disabled = false;
        });
    }
});
    
    // Initialize buttons
    updateButtons();
});