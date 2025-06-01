/**
 * Animations.js - Handles all animations and micro-interactions
 * Includes subtle gaming and cinema inspired effects
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll animations
    initScrollAnimations();
    
    // Add hover effects to project cards
    initProjectCardEffects();
    
    // Add gaming-inspired cursor effect
    initCursorEffect();
    
    // Add cinema-inspired text animation
    initTextTypewriter();
});

/**
 * Initialize scroll-based animations
 * Similar to AOS (Animate on Scroll) library but lighter
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    if (!animatedElements.length) return;
    
    function checkInView() {
        animatedElements.forEach(element => {
            // Only animate elements that are not already animated
            if (element.classList.contains('aos-animated')) return;
            
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            // If element is in viewport
            if (elementTop < windowHeight * 0.85) {
                // Add animation class
                element.classList.add('aos-animated');
                
                // Add delay if specified
                const delay = element.getAttribute('data-aos-delay');
                if (delay) {
                    element.style.transitionDelay = delay + 'ms';
                }
            }
        });
    }
    
    // Add the base animation class
    animatedElements.forEach(element => {
        element.classList.add('aos-init');
    });
    
    // Check on page load and scroll
    window.addEventListener('scroll', checkInView);
    checkInView();
}

/**
 * Project Card Hover Effects
 * Adds subtle 3D tilt effect inspired by game cards
 */
function initProjectCardEffects() {
    const cards = document.querySelectorAll('.project-card, .skill-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            // Calculate mouse position relative to card
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate rotation based on mouse position
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            // Apply the transform
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        // Reset transform on mouse leave
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'none';
        });
    });
}

/**
 * Gaming-inspired cursor effect
 * Creates a subtle trail effect when moving the cursor
 */
function initCursorEffect() {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    // Create the cursor style dynamically
    const style = document.createElement('style');
    style.textContent = `
        .custom-cursor {
            position: fixed;
            width: 8px;
            height: 8px;
            background-color: var(--color-accent);
            border-radius: 50%;
            pointer-events: none;
            opacity: 0.5;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: transform 0.1s ease, opacity 0.3s ease;
        }
        
        .custom-cursor::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 20px;
            height: 20px;
            background-color: var(--color-accent);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            opacity: 0.2;
            transition: all 0.2s ease;
        }
        
        .custom-cursor.active {
            transform: translate(-50%, -50%) scale(1.5);
        }
    `;
    document.head.appendChild(style);
    
    // Update cursor position on mouse move
    document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Add active class when clicking
    document.addEventListener('mousedown', () => {
        cursor.classList.add('active');
    });
    
    document.addEventListener('mouseup', () => {
        cursor.classList.remove('active');
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '0.5';
    });
    
    // Enhance cursor when hovering interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card, .filter-btn');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
        });
    });
}

/**
 * Cinema-inspired typewriter text effect
 * Creates a subtle typing animation for hero text
 */
function initTextTypewriter() {
    const animateText = document.querySelector('.animate-text');
    
    if (!animateText) return;
    
    // Store original text
    const originalText = animateText.textContent;
    
    // Clear the text
    animateText.textContent = '';
    
    // Create a span for the cursor
    const cursorSpan = document.createElement('span');
    cursorSpan.classList.add('typing-cursor');
    cursorSpan.textContent = '  ';
    
    // Create the cursor style dynamically
    const style = document.createElement('style');
    style.textContent = `
        .typing-cursor {
            display: inline-block;
            width: 3px;
            background-color: var(--color-secondary);
            animation: blink 1s infinite;
            margin-left: 2px;
        }
        
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Add the cursor to the element
    animateText.appendChild(cursorSpan);
    
    // Type the text character by character
    let charIndex = 0;
    const typingSpeed = 60; // milliseconds per character
    
    function typeText() {
        if (charIndex < originalText.length) {
            // Insert character before the cursor
            animateText.insertBefore(
                document.createTextNode(originalText.charAt(charIndex)),
                cursorSpan
            );
            
            charIndex++;
            setTimeout(typeText, typingSpeed);
        }
    }
    
    // Start the typing animation after a short delay
    setTimeout(typeText, 500);
}
