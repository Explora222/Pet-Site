// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Fade In Animation on Scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            
            // Trigger counter animation if it's the impact section
            if (entry.target.querySelector('.stat-item')) {
                startCounters();
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-section').forEach(section => {
    observer.observe(section);
});

// Counter Animation
let countersStarted = false;
function startCounters() {
    if (countersStarted) return;
    countersStarted = true;
    
    const counters = document.querySelectorAll('.stat-item h3');
    const speed = 200;

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target.toLocaleString();
            }
        };
        updateCount();
    });
}

// Donation Amount Selection
const amountCards = document.querySelectorAll('.amount-card');
const customInput = document.getElementById('customAmount');
let selectedAmount = 250;

amountCards.forEach(card => {
    card.addEventListener('click', () => {
        amountCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        selectedAmount = parseInt(card.getAttribute('data-amount'));
        customInput.value = '';
        hideError();
    });
});

customInput.addEventListener('input', () => {
    amountCards.forEach(c => c.classList.remove('active'));
    if (customInput.value) {
        selectedAmount = parseInt(customInput.value);
    }
    hideError();
});

// Donation Form Handling
const donationForm = document.getElementById('donationForm');
const donationError = document.getElementById('donationError');
const successModal = document.getElementById('successModal');
const closeModalBtn = document.getElementById('closeModalBtn');

function showError() {
    donationError.style.display = 'block';
}

function hideError() {
    donationError.style.display = 'none';
}

function generateTransactionId() {
    const date = new Date();
    const year = date.getFullYear();
    const random = Math.floor(Math.random() * 900) + 100;
    return `PAW-${year}-${random}`;
}

donationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const donorName = document.getElementById('donorName').value.trim();
    const donorEmail = document.getElementById('donorEmail').value.trim();
    const donorPhone = document.getElementById('donorPhone').value.trim();
    const donationType = document.getElementById('donationType').value;
    
    // Validate amount
    const currentAmount = customInput.value ? parseInt(customInput.value) : selectedAmount;
    
    if (!currentAmount || currentAmount < 10) {
        showError();
        return;
    }

    // Validate other fields
    if (!donorName || !donorEmail || !donorPhone) {
        alert('Please fill in all required fields.');
        return;
    }

    // Show success modal
    document.getElementById('modalAmount').textContent = `R${currentAmount.toLocaleString()}`;
    document.getElementById('modalType').textContent = donationType === 'once' ? 'One-Time Donation' : 'Monthly Donation';
    document.getElementById('modalDonor').textContent = `From: ${donorName}`;
    document.getElementById('modalTransactionId').textContent = generateTransactionId();

    successModal.classList.add('active');

    // Reset form
    donationForm.reset();
    amountCards.forEach(c => c.classList.remove('active'));
    amountCards[1].classList.add('active');
    selectedAmount = 250;
});

// Close Modal
closeModalBtn.addEventListener('click', () => {
    successModal.classList.remove('active');
});

// Close modal on overlay click
successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
        successModal.classList.remove('active');
    }
});

// Contact Form Validation
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputs = contactForm.querySelectorAll('input, textarea');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#E76F51';
        } else {
            input.style.borderColor = '#ddd';
        }
    });

    if (isValid) {
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    } else {
        alert('Please fill in all required fields.');
    }
});

// Mobile Menu Toggle
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileBtn.addEventListener('click', () => {
    if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
    } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '80px';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'white';
        navLinks.style.padding = '20px';
        navLinks.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    }
});

// Handle resize to reset mobile menu
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'row';
        navLinks.style.position = 'static';
        navLinks.style.padding = '0';
        navLinks.style.boxShadow = 'none';
    } else {
        navLinks.style.display = 'none';
    }
});