// ========================================
// Xie Xiangyu — AI-for-Science Portfolio
// ========================================

const navbar = document.getElementById('navbar');

// ---- Navigation scroll effect ----
function handleNavScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll();

// ---- Mobile navigation toggle ----
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

function setNavIcon(name) {
    navToggle.innerHTML = '';
    const icon = document.createElement('i');
    icon.setAttribute('data-lucide', name);
    navToggle.appendChild(icon);
}

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    setNavIcon(navLinks.classList.contains('active') ? 'x' : 'menu');
    lucide.createIcons();
});

// Close mobile nav when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        setNavIcon('menu');
        lucide.createIcons();
    });
});

// ---- Scroll-triggered fade-in ----
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.08
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe sections
    document.querySelectorAll('section:not(#hero)').forEach(section => {
        section.classList.add('fade-in');
        fadeObserver.observe(section);
    });

    // Observe cards
    document.querySelectorAll('.focus-card, .project-card, .education-card, .teaching-card, .award-card, .skill-category, .contact-item, .exchange-item').forEach((el, i) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${(i % 3) * 0.08}s`;
        fadeObserver.observe(el);
    });
} else {
    // Ensure all elements are visible when motion is reduced
    document.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
}

// ---- Smooth scroll for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: prefersReducedMotion ? 'auto' : 'smooth'
                });
            }
        }
    });
});

// ---- Active nav link on scroll ----
const sectionsWithIds = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a');

function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 120;

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

window.addEventListener('scroll', updateActiveNavLink, { passive: true });
updateActiveNavLink();

// ---- Subtle hero parallax (only if no reduced-motion) ----
if (!prefersReducedMotion) {
    const heroGrid = document.querySelector('.hero-grid');
    if (heroGrid) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (scrollY < window.innerHeight) {
                heroGrid.style.transform = `translateY(${scrollY * 0.15}px)`;
            }
        }, { passive: true });
    }
}
