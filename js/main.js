/**
 * Main JavaScript file for Portfolio website
 * Handles navigation, animations, and interactive elements
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile navigation
    initMobileNav();
    
    // Initialize smooth scrolling for anchor links
    initSmoothScroll();
    
    // Handle header scroll effects
    handleHeaderScroll();
    
    // Initialize FAQ accordion on contact page
    initFaqAccordion();
    
    // Initialize case study modals
    initCaseStudyModals();
    
    // Show active section in navigation based on scroll position
    highlightNavOnScroll();
    
    // Initialize skill progress bars
    initSkillProgressBars();
});

/**
 * Mobile Navigation Toggle
 */
function initMobileNav() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const links = document.querySelectorAll('.nav-links a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
}

/**
 * Highlight active navigation link based on scroll position
 */
function highlightNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    if (!sections.length) return;
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 100; // Adding offset for header
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * Smooth Scrolling for Anchor Links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's a modal trigger
            if (href.includes('project-')) return;
            
            e.preventDefault();
            
            let targetElement = document.querySelector(href);
            
            if (targetElement) {
                // Calculate offset for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Handle header scroll effects
 */
function handleHeaderScroll() {
    const header = document.querySelector('.site-header');
    
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.padding = '0.5rem 0';
            header.style.boxShadow = '0 2px 10px rgba(44, 62, 80, 0.15)';
        } else {
            header.style.padding = '1rem 0';
            header.style.boxShadow = '0 2px 10px rgba(44, 62, 80, 0.1)';
        }
    });
}

/**
 * FAQ Accordion
 */
function initFaqAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            
            // Toggle the current item
            faqItem.classList.toggle('active');
            
            // Close other items
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question) {
                    otherQuestion.parentElement.classList.remove('active');
                }
            });
        });
    });
}

/**
 * Initialize Skill Progress Bars
 */
function initSkillProgressBars() {
    const progressBars = document.querySelectorAll('.skill-progress');
    
    progressBars.forEach(bar => {
        const width = bar.parentElement.previousElementSibling.textContent;
        bar.style.setProperty('--width', width);
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.style.getPropertyValue('--width');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

/**
 * Case Study Modal Functionality
 */
function initCaseStudyModals() {
    // Open modal when clicking "View Case Study"
    const projectLinks = document.querySelectorAll('.view-project');
    
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('href');
            const modal = document.querySelector(modalId);
            
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        });
    });

 document.getElementById("send-button").addEventListener("click", function () {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  if (!name || !email || !message) {
    alert("Please fill in all fields.");
    return;
  }

  const formData = {
    name: name,
    email: email,
    message: message
  };

  emailjs.send("service_h4su60f", "template_55pkhe8", formData)
    .then(() => {
      alert("Email successfully sent!");
      document.getElementById("contact-form").reset();
    })
    .catch(error => {
      console.error("Error sending the email:", error);
      alert("Email not sent. Try again.");
    });
});

(function() {
  emailjs.init("k8KTOc5b9u0IFtZRk"); // Inserisci il tuo User ID di EmailJS
})();

    
    // Close modal when clicking the close button
    const closeButtons = document.querySelectorAll('.close-modal');
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.case-study-modal');
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Restore scrolling
        });
    });
    
    // Close modal when clicking outside the content
    const modals = document.querySelectorAll('.case-study-modal');
    
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                document.body.style.overflow = ''; // Restore scrolling
            }
        });
    });
    
    // Close modal with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.style.display === 'block') {
                    modal.style.display = 'none';
                    document.body.style.overflow = ''; // Restore scrolling
                }
            });
        }
    });

    
}

// Navbar e indicatori di posizione
let sections = document.querySelectorAll("section, .container-fluid, footer");
let navLinks = document.querySelectorAll(".nav-link");
let activeDot = document.querySelector(".active-dot");

// Funzione per aggiornare l'indicatore di sezione attiva
function updateActiveNav() {
    let currentSection = null;
    let scrollPosition = window.scrollY + window.innerHeight / 2;
    let pageBottom = window.scrollY + window.innerHeight >= document.body.scrollHeight - 5;

    sections.forEach(section => {
        let sectionTop = section.offsetTop;
        let sectionHeight = section.offsetHeight;
        let sectionId = section.getAttribute("id");

        if (
            (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) ||
            (section.tagName.toLowerCase() === "footer" && pageBottom)
        ) {
            currentSection = sectionId;
        }
    });

    // Aggiorna lo stato attivo nei link di navigazione
    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");

            // Aggiorna la posizione dell'active-dot
            const linkRect = link.getBoundingClientRect();
            const navRect = link.closest("nav").getBoundingClientRect();

            const verticalOffset = 10; // Offset aggiuntivo per abbassare l'active-dot
            activeDot.style.top = `${linkRect.top - navRect.top + linkRect.height / 1 + verticalOffset}px`; // Centra verticalmente con offset
            activeDot.style.left = `${linkRect.left - navRect.left + linkRect.width / 2}px`; // Centra orizzontalmente
        }
    });
}


// Aggiungi gli eventi per aggiornare l'active-dot
window.addEventListener("scroll", updateActiveNav);
navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();

        // Scrolla alla sezione corrispondente
        const targetId = link.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            const headerOffset = 80; // Offset per l'header
            const elementPosition = targetSection.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }

        // Aggiorna manualmente l'active-dot
        updateActiveNav();
    });
});

// Inizializza la posizione dell'active-dot
updateActiveNav();
