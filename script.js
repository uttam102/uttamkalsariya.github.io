// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link, .header-name').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const headerOffset = 100;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.main-header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Scroll Reveal Observer
const revealElements = () => {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const windowHeight = window.innerHeight;
    const revealPoint = 150;
    reveals.forEach(el => {
        const revealTop = el.getBoundingClientRect().top;
        if (revealTop < windowHeight - revealPoint) {
            el.classList.add('active');
        }
    });
};

(() => {
    const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    if ('IntersectionObserver' in window && targets.length) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    obs.unobserve(entry.target);
                }
            });
        }, { root: null, threshold: 0.1, rootMargin: '0px 0px -10% 0px' });
        targets.forEach(el => observer.observe(el));
    } else {
        window.addEventListener('scroll', revealElements);
        window.addEventListener('load', revealElements);
    }
})();

const contactForm = document.querySelector('.contact-form-minimal');
if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const action = this.getAttribute('action');
        const valid = /^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(action || '');
        if (!valid) {
            alert('Contact form is not configured yet.');
            return;
        }
        const formData = new FormData(this);
        try {
            const response = await fetch(action, {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: formData
            });
            if (response.ok) {
                alert('Thank you! Your message has been sent.');
                this.reset();
            } else {
                alert('Something went wrong. Please try again later.');
            }
        } catch (_) {
            alert('Network error. Please try again later.');
        }
    });
}

// Tilt effect for text elements
(() => {
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;
    const candidates = document.querySelectorAll('h1, h2, h3, .experience-title, .exp-job-title, .section-title');
    candidates.forEach(el => el.classList.add('tilt-text'));
    const maxTilt = 8; // degrees
    document.querySelectorAll('.tilt-text').forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const px = (e.clientX - rect.left) / rect.width;
            const py = (e.clientY - rect.top) / rect.height;
            const tiltX = (0.5 - py) * maxTilt;
            const tiltY = (px - 0.5) * maxTilt;
            el.style.transform = `perspective(600px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
        });
    });
})();
// No mobile nav menu; header shows brand only
