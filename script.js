// Flux RSS functionality
const rssSourceButtons = document.querySelectorAll('.rss-source');
const refreshButton = document.getElementById('refresh-rss');

// Toggle active source
rssSourceButtons.forEach(source => {
    source.addEventListener('click', () => {
        // Remove active class from all sources
        rssSourceButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked source
        source.classList.add('active');
        
        // In a real application, this would fetch RSS data for the selected source
        // For demo purposes, we'll just log the source
        console.log('Selected RSS source:', source.dataset.source);
        
        // Simulate loading
        simulateRssLoading();
    });
});

// Refresh RSS feed
if (refreshButton) {
    refreshButton.addEventListener('click', () => {
        // Add a rotating animation to the refresh icon
        const refreshIcon = refreshButton.querySelector('i');
        refreshIcon.classList.add('rotating');
        
        // Simulate loading new RSS data
        simulateRssLoading();
        
        // Remove the rotating animation after 1 second
        setTimeout(() => {
            refreshIcon.classList.remove('rotating');
        }, 1000);
    });
}

// Function to simulate RSS loading
function simulateRssLoading() {
    const rssFeed = document.querySelector('.rss-feed');
    
    // Add loading state
    rssFeed.style.opacity = '0.5';
    
    // Simulate delay
    setTimeout(() => {
        // Remove loading state
        rssFeed.style.opacity = '1';
    }, 800);
}

// Add CSS for RSS refresh animation
const rssStyleSheet = document.createElement('style');
rssStyleSheet.type = 'text/css';
rssStyleSheet.textContent = `
    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    
    .rotating {
        animation: rotate 1s linear infinite;
    }
`;

document.head.appendChild(rssStyleSheet);

// Bookmark functionality for RSS items
const bookmarkButtons = document.querySelectorAll('.rss-action .fa-bookmark');

bookmarkButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Toggle between regular and solid bookmark icon
        if (this.classList.contains('far')) {
            this.classList.remove('far');
            this.classList.add('fas');
        } else {
            this.classList.remove('fas');
            this.classList.add('far');
        }
    });
});// Navigation menu toggle (mobile)
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle navigation
    navLinks.classList.toggle('active');
    
    // Animate links
    navItems.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger animation
    burger.classList.toggle('toggle');
});

// Active navigation link based on scroll position
const sections = document.querySelectorAll('section');
const navLinksItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Sticky navbar
const header = document.querySelector('header');
const navbar = document.querySelector('#navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// Project filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Get filter value
        const filter = btn.dataset.filter;
        
        // Filter projects
        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Form submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Here you would normally send the data to a server
        // For demo purposes, we'll just log it to console
        console.log('Form submission:', { name, email, subject, message });
        
        // Show a success message
        alert('Votre message a été envoyé avec succès !');
        
        // Reset the form
        contactForm.reset();
    });
}

// Add smooth scrolling to all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                burger.classList.remove('toggle');
            }
        }
    });
});

// Animation for burger menu
burger.addEventListener('click', () => {
    const line1 = document.querySelector('.line1');
    const line2 = document.querySelector('.line2');
    const line3 = document.querySelector('.line3');
    
    line1.classList.toggle('cross');
    line2.classList.toggle('fade');
    line3.classList.toggle('cross');
});

// Add animation to elements when they enter the viewport
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.skill-item, .project-card, .tool-item, .article-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('appear');
        }
    });
};

// Add CSS for animations
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.textContent = `
    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .line1.cross {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .line2.fade {
        opacity: 0;
    }
    
    .line3.cross {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    .skill-item, .project-card, .tool-item, .article-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .appear {
        opacity: 1;
        transform: translateY(0);
    }
`;

document.head.appendChild(styleSheet);

// Call animation function on load and scroll
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);