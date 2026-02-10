// Dark Mode Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference or default to 'light' mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', currentTheme);
    
    // Theme toggle handler
    themeToggle.addEventListener('click', function() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add a little bounce animation
        themeToggle.style.transform = 'scale(0.9) rotate(180deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1) rotate(0deg)';
        }, 200);
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for scroll animations
    document.querySelectorAll('.about, .gallery, .menu-highlight, .location').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
    
    // Add parallax effect to hero section
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const hero = document.querySelector('.hero');
        
        if (hero && scrollTop < window.innerHeight) {
            hero.style.transform = `translateY(${scrollTop * 0.5}px)`;
            hero.style.opacity = 1 - (scrollTop / window.innerHeight);
        }
        
        lastScrollTop = scrollTop;
    }, { passive: true });
    
    // Add hover sound effect simulation (visual feedback)
    document.querySelectorAll('.gallery-item, .menu-card, .cta-button').forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.4s ease';
        });
    });
    
    // Lazy load images for better performance
    const images = document.querySelectorAll('.gallery-item img');
    const imageOptions = {
        threshold: 0,
        rootMargin: '0px 0px 200px 0px'
    };
    
    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, imageOptions);
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // Add loading state for images
    images.forEach(img => {
        const showImage = () => {
            img.style.opacity = '1';
        };

        img.addEventListener('load', showImage);
        img.addEventListener('error', showImage);
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';

        // If the image is already cached, the load event may not fire
        if (img.complete && img.naturalWidth > 0) {
            showImage();
        }
    });
    
    // Mobile menu indicator (for future expansion)
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    
    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        if (touchEndY < touchStartY - 50) {
            // Swipe up - could trigger menu or other action
            console.log('Swiped up');
        }
        if (touchEndY > touchStartY + 50) {
            // Swipe down - could trigger menu close or other action
            console.log('Swiped down');
        }
    }
    
    // Add keyboard accessibility for theme toggle
    themeToggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
});