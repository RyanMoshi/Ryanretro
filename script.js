// Modern Portfolio JavaScript with Enhanced Features

// Initialize EmailJS
(function() {
    // TODO: Replace with your EmailJS public key
    emailjs.init("YOUR_PUBLIC_KEY");
})();

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Add transition effect
    body.style.transition = 'all 0.3s ease-in-out';
    setTimeout(() => {
        body.style.transition = '';
    }, 300);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.className = 'bx bx-moon';
    } else {
        themeIcon.className = 'bx bx-sun';
    }
}

// Enhanced Page Load Animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    // Loader typing effect
    const loader = document.getElementById('loader');
    const typeEl = document.getElementById('loader-type');
    const subtypeEl = document.getElementById('loader-subtype');
    const bar = document.getElementById('loader-progress-bar');

    const lines = [
        'Ryan Moshi',
        'Brand Strategist & Chief Technologist'
    ];

    function typeText(element, text, speed = 70) {
        return new Promise(resolve => {
            element.textContent = '';
            let i = 0;
            const timer = setInterval(() => {
                element.textContent += text.charAt(i);
                i++;
                if (bar) bar.style.width = Math.min(100, (i / Math.max(text.length, 1)) * 100) + '%';
                if (i >= text.length) { clearInterval(timer); resolve(); }
            }, speed);
        });
    }

    async function runLoader() {
        if (!loader || !typeEl || !subtypeEl) return;
        await typeText(typeEl, lines[0], 65);
        await new Promise(r => setTimeout(r, 300));
        await typeText(subtypeEl, lines[1], 45);
        await new Promise(r => setTimeout(r, 400));
        loader.classList.add('hidden');
        setTimeout(() => loader.setAttribute('aria-hidden', 'true'), 300);
    }

    runLoader();
    
    // Apply compact hero on very small screens
    const applyCompact = () => {
        if (window.innerWidth <= 480) {
            document.body.classList.add('compact-hero');
        } else {
            document.body.classList.remove('compact-hero');
        }
    };
    applyCompact();
    window.addEventListener('resize', applyCompact);
    
    // Animate hero elements with delays
    const heroElements = document.querySelectorAll('.hero-text > *');
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Mobile Menu Toggle
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// Smooth Scrolling and Active Navigation
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        
        if (top >= offset && top < offset + height) {
            // Remove active class from all nav links
            navLinks.forEach(links => {
                links.classList.remove('active');
            });
            
            // Add active class to current section's nav link
            let activeLink = document.querySelector(`header nav a[href*="${id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
    
    // Sticky header
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);
    
    // Close mobile menu when clicking nav links
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
}

// Enhanced Scroll Animations with Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const delay = element.dataset.delay || '0s';
            
            setTimeout(() => {
                element.classList.add('visible');
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, parseFloat(delay) * 1000);
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .skill-category, .value-item, .contact-method, .service-card, .tech-category, .stat');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });
});

// Animated Counter for Stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        const suffix = element.dataset.suffix || '';
        const prefix = element.dataset.prefix || '';
        element.textContent = `${prefix}${Math.floor(start)}${suffix}`;
        
        if (start >= target) {
            element.textContent = `${prefix}${target}${suffix}`;
            clearInterval(timer);
        }
    }, 16);
}

// Counter Animation Observer
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.dataset.count);
            
            if (!counter.classList.contains('animated')) {
                counter.classList.add('animated');
                animateCounter(counter, target);
            }
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});

// Skill Progress Animation
const skillBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.style.width;
            entry.target.style.width = '0%';
            entry.target.style.transition = 'width 1.5s ease-out';
            
            setTimeout(() => {
                entry.target.style.width = width;
            }, 200);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// Enhanced Contact Form with EmailJS
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        // Show loading state
        btnText.style.display = 'none';
        btnLoading.style.display = 'flex';
        submitBtn.disabled = true;
        
        try {
            // Get form data
            const formData = new FormData(contactForm);
            const userEmail = formData.get('email');
            const templateParams = {
                from_name: formData.get('name'),
                from_email: userEmail,
                company: formData.get('company') || 'N/A',
                project_type: formData.get('project-type') || 'N/A',
                budget: formData.get('budget') || 'N/A',
                message: formData.get('message'),
                to_email: 'ryanemmanuelmoshi@gmail.com'
            };
            
            // Send email to Ryan
            const response = await emailjs.send(
                'YOUR_SERVICE_ID',
                'YOUR_TEMPLATE_ID_CONTACT_TO_RYAN',
                templateParams
            );

            // Send appreciation email to user
            try {
                await emailjs.send(
                    'YOUR_SERVICE_ID',
                    'YOUR_TEMPLATE_ID_APPRECIATION_TO_USER',
                    {
                        user_email: userEmail,
                        user_name: formData.get('name'),
                        cv_link: 'https://342646301392609280.hello.cv',
                        tel_link: 'tel:+254790310699',
                        email_link: 'mailto:ryanemmanuelmoshi@gmail.com',
                        // Logo URLs: using site absolute URLs; replace with CDN if available
                        worldstudios_logo_url: new URL('Assets/world studios white.png', window.location.origin).href,
                        dropx_logo_url: new URL('Assets/dropex blue.png', window.location.origin).href,
                        retrosoft_logo_url: new URL('Assets/retrosoft white svg.svg', window.location.origin).href
                    }
                );
            } catch (appErr) {
                console.warn('Appreciation email failed:', appErr);
            }
            
            if (response.status === 200) {
                showNotification('Message sent successfully! I\'ll get back to you within 24 hours.', 'success');
                contactForm.reset();
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Error sending email:', error);
            showNotification('Sorry, there was an error sending your message. Please try again or contact me directly.', 'error');
        } finally {
            // Reset button state
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
        }
    });
}

// Resume Download Functionality
document.addEventListener('DOMContentLoaded', () => {
    const resumeLinks = document.querySelectorAll('a[href*="drive.google.com"][href*="13rQgoid5H1ZDaqRIdjoOzbDVQb65MMpW"]');
    resumeLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showNotification('Opening resume in new tab...', 'info');
            window.open(link.href, '_blank');
        });
    });
});

// Project Links Enhancement
document.addEventListener('DOMContentLoaded', () => {
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.href.includes('drive.google.com')) {
                showNotification('Opening project details...', 'info');
            }
        });
    });
});

// Enhanced Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="bx ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        max-width: 350px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(10px);
    `;
    
    // Set background color based on type
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#2563eb',
        warning: '#f59e0b'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 400);
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'bx-check-circle',
        error: 'bx-error-circle',
        info: 'bx-info-circle',
        warning: 'bx-error'
    };
    return icons[type] || icons.info;
}

// Smooth scroll for anchor links
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

// Enhanced Button Interactions
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
    
    btn.addEventListener('click', function(e) {
        if (this.type === 'submit') {
            return;
        }
        
        // Add click animation
        this.style.transform = 'translateY(0) scale(0.98)';
        setTimeout(() => {
            this.style.transform = 'translateY(-2px) scale(1)';
        }, 150);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        heroVisual.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// Enhanced hover effects for cards
document.querySelectorAll('.project-card, .service-card, .tech-category').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Performance optimization: Lazy load images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    }
});

// Add focus management for accessibility
document.querySelectorAll('.btn, .project-link, .service-card, .tech-item').forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid var(--primary-color)';
        this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

// Form validation enhancement
document.querySelectorAll('input, textarea, select').forEach(field => {
    field.addEventListener('blur', function() {
        if (this.hasAttribute('required') && !this.value.trim()) {
            this.style.borderColor = '#ef4444';
        } else {
            this.style.borderColor = 'var(--border-color)';
        }
    });
    
    field.addEventListener('input', function() {
        if (this.style.borderColor === 'rgb(239, 68, 68)') {
            this.style.borderColor = 'var(--border-color)';
        }
    });
});

// Add loading animation CSS
const style = document.createElement('style');
style.textContent = `
    .btn-loading {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .bx-spin {
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    .btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    body:not(.loaded) {
        opacity: 0;
    }
    
    body.loaded {
        opacity: 1;
        transition: opacity 0.5s ease-in-out;
    }
`;
document.head.appendChild(style);