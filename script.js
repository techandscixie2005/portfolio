// ========================================
// Navigation Scroll Effect
// ========================================
const navbar = document.getElementById('navbar');

function handleNavScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleNavScroll);
handleNavScroll(); // Initial check

// ========================================
// Mobile Navigation Toggle
// ========================================
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Toggle icon
    const icon = navToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.setAttribute('data-lucide', 'x');
    } else {
        icon.setAttribute('data-lucide', 'menu');
    }
    lucide.createIcons();
});

// Close mobile nav when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
    });
});

// ========================================
// Scroll Fade-in Animations
// ========================================
const fadeElements = document.querySelectorAll('.fade-in');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Optional: Stop observing once visible
            // fadeObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeElements.forEach(el => {
    fadeObserver.observe(el);
});

// Add fade-in class to main sections
const sections = document.querySelectorAll('section:not(#hero)');
sections.forEach((section, index) => {
    section.classList.add('fade-in');
    section.style.transitionDelay = `${index * 0.1}s`;
    fadeObserver.observe(section);
});

// Add fade-in to cards
const cards = document.querySelectorAll('.education-card, .research-card, .award-card, .skill-category, .contact-card');
cards.forEach((card, index) => {
    card.classList.add('fade-in');
    card.style.transitionDelay = `${(index % 3) * 0.1}s`;
    fadeObserver.observe(card);
});

// ========================================
// Smooth Scroll for Navigation Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ========================================
// Active Navigation Link on Scroll
// ========================================
const sectionsWithIds = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a');

function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 150;
    
    sectionsWithIds.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinksAll.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);
updateActiveNavLink(); // Initial check

// ========================================
// Parallax Effect for Hero Background (subtle)
// ========================================
const heroBackground = document.querySelector('.hero-background');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (heroBackground && scrollY < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrollY * 0.3}px)`;
    }
});

// ========================================
// Animate GPA trajectory bars on scroll
// ========================================
const educationSection = document.querySelector('#education');
if (educationSection) {
    const gpaObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('.trajectory-item .fill');
                bars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 300);
                });
                gpaObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    gpaObserver.observe(educationSection);
}
