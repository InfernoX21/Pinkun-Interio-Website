// DOM Elements
const header = document.getElementById('header');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const nav = document.getElementById('nav');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const portfolioModal = document.getElementById('portfolioModal');
const modalClose = document.getElementById('modalClose');
const modalBody = document.getElementById('modalBody');
const contactForm = document.getElementById('contactForm');

// Portfolio data
const portfolioData = {
    1: {
        title: "Serene Sanctuary",
        type: "Residential",
        image: "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
        description: "A minimalist haven that celebrates natural light and organic textures.",
        details: "This 3,000 sq ft penthouse transformation focused on creating seamless flow between spaces while maintaining distinct zones for relaxation and entertainment. The design emphasizes natural materials, neutral tones, and strategic lighting to create a serene atmosphere that promotes well-being and tranquility."
    },
    2: {
        title: "Golden Hour Loft",
        type: "Residential", 
        image: "https://images.pexels.com/photos/1571457/pexels-photo-1571457.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
        description: "Industrial elegance meets warm minimalism in this urban retreat.",
        details: "A former warehouse converted into a sophisticated living space, balancing raw architectural elements with refined finishes. The design celebrates the building's industrial heritage while introducing warm textures and carefully curated furnishings that create an inviting home environment."
    },
    3: {
        title: "Boutique Atelier",
        type: "Commercial",
        image: "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
        description: "A luxury retail space that embodies sophisticated shopping experience.",
        details: "Designed to showcase high-end fashion while creating an intimate, gallery-like atmosphere that encourages discovery. The space features custom display systems, strategic lighting, and a neutral palette that allows merchandise to take center stage while maintaining brand identity."
    },
    4: {
        title: "Zen Garden Villa",
        type: "Residential",
        image: "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
        description: "Tranquil living spaces that blur the line between indoor and outdoor.",
        details: "A complete renovation focused on creating harmony with the surrounding landscape through strategic material choices and spatial planning. Large windows, natural stone, and water features create a seamless connection with nature while maintaining modern comfort and functionality."
    },
    5: {
        title: "Modern Minimalist Haven",
        type: "Residential",
        image: "https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
        description: "Clean lines and neutral tones create a calming urban oasis.",
        details: "A complete home renovation emphasizing functionality without sacrificing style, featuring built-in storage solutions and carefully curated art pieces. The design focuses on creating calm, uncluttered spaces that serve as a retreat from urban life while maintaining sophisticated aesthetics."
    },
    6: {
        title: "Executive Workspace",
        type: "Commercial",
        image: "https://images.pexels.com/photos/1571461/pexels-photo-1571461.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
        description: "Professional environment that inspires creativity and collaboration.",
        details: "A corporate office design that breaks traditional boundaries, incorporating biophilic elements and flexible workspaces for the modern professional. The design promotes collaboration while providing quiet zones for focused work, all within an aesthetically pleasing environment that reflects company values."
    }
};

// Header scroll effect
function handleScroll() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    mobileMenuBtn.classList.toggle('active');
    nav.classList.toggle('active');
}

// Close mobile menu when clicking on nav links
function closeMobileMenu() {
    mobileMenuBtn.classList.remove('active');
    nav.classList.remove('active');
}

// Smooth scroll to sections
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        const headerHeight = header.offsetHeight;
        const elementPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Portfolio modal functions
function openPortfolioModal(projectId) {
    const project = portfolioData[projectId];
    if (!project) return;
    
    modalBody.innerHTML = `
        <img src="${project.image}" alt="${project.title}">
        <div class="portfolio-content">
            <div class="portfolio-header">
                <h3>${project.title}</h3>
                <span class="portfolio-type">${project.type}</span>
            </div>
            <p style="font-size: 1.125rem; margin-bottom: 1rem;">${project.description}</p>
            <p style="color: var(--muted-grey);">${project.details}</p>
        </div>
    `;
    
    portfolioModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePortfolioModal() {
    portfolioModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const phone = document.querySelector("#phone").value;
  const message = document.querySelector("#message").value;

  try {
    const response = await fetch("/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, message }),
    });

    const data = await response.json();
    if (data.success) {
      alert("✅ Message sent successfully!");
      e.target.reset();
    } else {
      alert("❌ Failed to send message.");
    }
  } catch (err) {
    console.error(err);
    alert("⚠️ Error sending message.");
  }
});



// Intersection Observer for animations
function createIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.section-header, .about-content, .about-image, .founder-content, .founder-image, .philosophy-item, .service-item, .testimonial-item, .portfolio-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize parallax effect for hero
function initParallax() {
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-bg img');
    
    if (!hero || !heroImage) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (scrolled < hero.offsetHeight) {
            heroImage.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Add loading animation to images
function addImageLoadingEffect() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Set initial opacity
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        // If image is already loaded
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
}

// Newsletter form submission
function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    if (email) {
        console.log('Newsletter subscription:', email);
        alert('Thank you for subscribing to our newsletter!');
        e.target.reset();
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Event listeners
    window.addEventListener('scroll', handleScroll);
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Navigation links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScrollTo(target);
            closeMobileMenu();
        });
    });
    
    // Portfolio items
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            openPortfolioModal(projectId);
        });
    });
    
    // Modal close events
    modalClose.addEventListener('click', closePortfolioModal);
    portfolioModal.addEventListener('click', function(e) {
        if (e.target === this) {
            closePortfolioModal();
        }
    });
    
    // Escape key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && portfolioModal.classList.contains('active')) {
            closePortfolioModal();
        }
    });
// Contact form submission - NEW IMPROVED VERSION
const contactForm = document.getElementById('contactForm'); // Get the form specifically

if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Get form values
        const name = document.querySelector("#name").value;
        const email = document.querySelector("#email").value;
        const phone = document.querySelector("#phone").value;
        const message = document.querySelector("#message").value;

        // Show loading state (optional)
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;

        try {
            const response = await fetch("/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, phone, message }),
            });

            const data = await response.json();
            
            if (data.success) {
                alert("✅ Message sent successfully!");
                contactForm.reset();
            } else {
                alert("❌ Failed to send message: " + data.message);
            }
        } catch (err) {
            console.error("Fetch error:", err);
            alert("⚠️ Network error. Please check if the backend server is running.");
        } finally {
            // Reset button state
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    // Service CTAs
    document.querySelectorAll('.service-cta').forEach(btn => {
        btn.addEventListener('click', function() {
            smoothScrollTo('#contact');
        });
    });
    
    // Consultation buttons
    document.querySelectorAll('.btn-secondary').forEach(btn => {
        btn.addEventListener('click', function() {
            smoothScrollTo('#contact');
        });
    });
    
    // Initialize features
    createIntersectionObserver();
    initParallax();
    addImageLoadingEffect();
    
    // Add smooth reveal animation to hero content
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }
    }, 500);
});

// Handle window resize
window.addEventListener('resize', function() {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// Add custom cursor effect for portfolio items
portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.cursor = 'pointer';
    });
});

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const smoothScrollPolyfill = function(target) {
        const element = document.querySelector(target);
        if (element) {
            const headerHeight = header.offsetHeight;
            const elementPosition = element.offsetTop - headerHeight;
            const startPosition = window.pageYOffset;
            const distance = elementPosition - startPosition;
            const duration = 1000;
            let start = null;
            
            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const run = ease(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }
            
            function ease(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }
            
            requestAnimationFrame(animation);
        }
    };
    
    // Override smoothScrollTo function for older browsers
    smoothScrollTo = smoothScrollPolyfill;
}

// Add loading state management
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Trigger any final animations
    const elementsToAnimate = document.querySelectorAll('.fade-in, .slide-up, .scale-in');
    elementsToAnimate.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0) scale(1)';
        }, index * 100);
    });
});

// Luxury custom cursor
(function initCustomCursor() {
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    const ringLerpFactor = 0.35; // faster catch-up for lower latency

    function onMouseMove(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // dot follows directly (keep CSS translate(-50%, -50%) centering)
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
        document.body.classList.add('cursor-visible');
    }

    function animate() {
        ringX += (mouseX - ringX) * ringLerpFactor;
        ringY += (mouseY - ringY) * ringLerpFactor;
        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';
        requestAnimationFrame(animate);
    }

    function onMouseEnter() {
        document.body.classList.add('cursor-visible');
    }

    function onMouseLeave() {
        document.body.classList.remove('cursor-visible');
    }

    // Enlarge ring over interactive elements
    const interactiveSelectors = 'a, button, .service-cta, .portfolio-item, input, select, textarea';
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(interactiveSelectors)) {
            document.body.classList.add('cursor-hover');
        }
    });
    document.addEventListener('mouseout', (e) => {
        if (e.target.closest(interactiveSelectors)) {
            document.body.classList.remove('cursor-hover');
        }
    });

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseenter', onMouseEnter);
    window.addEventListener('mouseleave', onMouseLeave);
    animate();
})();

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll handler
window.addEventListener('scroll', debounce(handleScroll, 10));

// Add error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
        console.warn('Failed to load image:', this.src);
    });
});

// Add accessibility improvements
document.addEventListener('keydown', function(e) {
    // Tab navigation improvements
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Add focus management for modal
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Apply focus trapping to modal
const modalContent = document.querySelector('.modal-content');
if (modalContent) {
    trapFocus(modalContent);
}
