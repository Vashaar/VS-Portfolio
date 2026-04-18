// ===== CUSTOM CURSOR TRACKING =====
const cursorDot = document.querySelector('.cursor-dot');

if (!('ontouchstart' in window)) {
    document.body.classList.remove('mobile-device');
    
    document.addEventListener('mousemove', (e) => {
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });

    document.addEventListener('mouseenter', () => {
        cursorDot.style.display = 'block';
    });

    document.addEventListener('mouseleave', () => {
        cursorDot.style.display = 'none';
    });
} else {
    document.body.classList.add('mobile-device');
}

// ===== SCROLL PROGRESS BAR =====
const progressBar = document.querySelector('.scroll-progress-bar');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
});

// ===== NAVBAR SHRINK ON SCROLL =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== TYPING ANIMATION =====
const typingText = document.querySelector('.typing-text');
const fullText = "Developer. Creator. Student of Knowledge.";
let currentIndex = 0;

function typeText() {
    if (currentIndex < fullText.length) {
        typingText.textContent += fullText.charAt(currentIndex);
        currentIndex++;
        setTimeout(typeText, 50);
    }
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    setTimeout(typeText, 500);
});

// ===== MOBILE MENU TOGGLE =====
const hamburger = document.querySelector('.hamburger');
const navbarMenu = document.querySelector('.navbar-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navbarMenu.classList.toggle('active');
});

// Close menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navbarMenu.classList.remove('active');
    });
});

// ===== SMOOTH SCROLL NAVIGATION =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements with fade-in-scroll
document.querySelectorAll('[data-aos="fade-in"]').forEach(element => {
    element.classList.add('fade-in-scroll');
    observer.observe(element);
});

// Observe project cards separately for staggered animation
document.querySelectorAll('.project-card').forEach((card, index) => {
    observer.observe(card);
});

// ===== BUTTON RIPPLE EFFECT =====
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        // Trigger ripple animation with the ::before pseudo-element
        this.style.position = 'relative';
    });
});

// ===== ACTIVE NAVBAR LINK HIGHLIGHTING =====
window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== PARALLAX EFFECT ON HERO BACKGROUND =====
const heroBackground = document.querySelector('.hero-background');
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
});

// ===== PRELOAD IMAGES =====
window.addEventListener('load', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
    });
});

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
    document.documentElement.style.animation = 'pageLoad 0.8s ease-out';
});

// Add styling for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-gold);
    }
`;
document.head.appendChild(style);

// ===== CONTACT FORM HANDLER =====
// Hidden contact information
const CONTACT_INFO = {
    email: 'XtreamistX@gmail.com',
    phone: '516-838-3150',
    facebook: 'https://www.facebook.com/profile.php?id=61580757495623'
};

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', handleContactFormSubmit);
}

function handleContactFormSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const contactMethod = document.querySelector('input[name="contactMethod"]:checked').value;
    const message = document.getElementById('message').value;
    
    // Determine contact method display
    let methodText = '';
    let contactDetail = '';
    
    switch(contactMethod) {
        case 'email':
            methodText = 'via Email';
            contactDetail = CONTACT_INFO.email;
            break;
        case 'phone':
            methodText = 'via Text Message';
            contactDetail = CONTACT_INFO.phone;
            break;
        case 'facebook':
            methodText = 'via Facebook Page';
            contactDetail = 'BS Qureshi Facebook Page';
            break;
    }
    
    // Log form data (in real scenario, this would be sent to a server)
    console.log('Contact Form Submission:', {
        name,
        email,
        contactMethod,
        message,
        preferredContact: contactDetail
    });
    
    // Show success message
    document.getElementById('contactForm').style.display = 'none';
    document.getElementById('formSuccess').style.display = 'block';
    
    const successMsg = `Thank you, ${name}! We'll reach out to you <strong>${methodText}</strong> at <strong>${contactDetail}</strong> within 24-48 hours.`;
    document.getElementById('successMessage').innerHTML = successMsg;
    
    // Scroll to success message
    document.querySelector('.contact-section').scrollIntoView({ behavior: 'smooth' });
}

function resetContactForm() {
    document.getElementById('contactForm').style.display = 'flex';
    document.getElementById('formSuccess').style.display = 'none';
    document.getElementById('contactForm').reset();
}
