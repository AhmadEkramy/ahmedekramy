// Language Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const langToggle = document.getElementById('lang-toggle');
    const body = document.body;
    
    // Language toggle event listener
    langToggle.addEventListener('change', function() {
        const isArabic = this.checked;
        
        if (isArabic) {
            body.classList.add('rtl');
            document.documentElement.lang = 'ar';
            switchToArabic();
        } else {
            body.classList.remove('rtl');
            document.documentElement.lang = 'en';
            switchToEnglish();
        }
    });
    
    // Switch to Arabic language
    function switchToArabic() {
        const elements = document.querySelectorAll('[data-ar]');
        elements.forEach(element => {
            element.textContent = element.getAttribute('data-ar');
        });
    }
    
    // Switch to English language
    function switchToEnglish() {
        const elements = document.querySelectorAll('[data-en]');
        elements.forEach(element => {
            element.textContent = element.getAttribute('data-en');
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // CTA Button scroll to projects
    const ctaButton = document.querySelector('.cta-button');
    ctaButton.addEventListener('click', function() {
        const projectsSection = document.querySelector('#projects');
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = projectsSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
    
    // Header background change on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        const scrollTop = window.pageYOffset;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.project-card, .about-paragraph, .skill-item');
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Project button click handlers
    const projectButtons = document.querySelectorAll('.project-button');
    projectButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // You can add actual project links here
            console.log('Opening project...');
        });
    });
    
    // Social media links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
                // Get the href and open in new tab
                const href = this.getAttribute('href');
                if (href) {
                    window.open(href, '_blank');
                }
            }, 150);
        });
    });
    
    // Add typing effect to hero description
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
    
    // Trigger typing effect when hero section is visible
    const heroDescription = document.querySelector('.hero-description');
    const originalText = heroDescription.textContent;
    
    setTimeout(() => {
        typeWriter(heroDescription, originalText, 30);
    }, 1000);
    
    // Add parallax effect to coding background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.coding-bg');
        const speed = scrolled * 0.5;
        
        if (parallax) {
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
    
    // Add hover sound effect (optional)
    function playHoverSound() {
        // You can add audio here if needed
        // const audio = new Audio('hover-sound.mp3');
        // audio.play();
    }
    
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('.project-card, .social-link, .cta-button, .project-button');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            // playHoverSound();
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
    
    // Add loading screen fade out
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease-in-out';
    }, 100);
    
    // Console greeting message
    console.log('%c👋 Hello! Welcome to Ahmed Ekramy\'s Portfolio', 'color: #3b82f6; font-size: 16px; font-weight: bold;');
    console.log('%cIf you\'re checking out the console, you might be interested in the code!', 'color: #666; font-size: 12px;');
    console.log('%cFeel free to reach out if you have any questions or opportunities!', 'color: #666; font-size: 12px;');
    
    // Hamburger menu for mobile
    const hamburgerBtn = document.getElementById('hamburger');
    const navLinksMenu = document.querySelector('.nav-links');
    if (hamburgerBtn && navLinksMenu) {
        hamburgerBtn.addEventListener('click', function() {
            navLinksMenu.classList.toggle('open');
            hamburgerBtn.classList.toggle('active');
        });
    }
});

// Performance optimization
window.addEventListener('load', function() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
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
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Press 'L' to toggle language
    if (e.key.toLowerCase() === 'l' && !e.ctrlKey && !e.altKey) {
        const langToggle = document.getElementById('lang-toggle');
        langToggle.checked = !langToggle.checked;
        langToggle.dispatchEvent(new Event('change'));
    }
    
    // Press 'Escape' to scroll to top
    if (e.key === 'Escape') {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});

// Add theme detection (system preference)
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // User prefers dark mode - you can add dark mode support here
    console.log('User prefers dark mode');
}

// Add mobile touch interactions
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', function(e) {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up - could trigger navigation to next section
            console.log('Swiped up');
        } else {
            // Swipe down - could trigger navigation to previous section
            console.log('Swiped down');
        }
    }
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
}