document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });
    
    // Sticky Header on Scroll
    const header = document.querySelector('.header');
    const navbar = document.querySelector('.navbar');
    const heroSection = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > heroSection.offsetHeight) {
            header.style.boxShadow = 'none';
            navbar.style.position = 'fixed';
            navbar.style.top = '0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            navbar.style.position = 'sticky';
            navbar.style.top = '80px';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Animate Elements on Scroll
    const animateElements = document.querySelectorAll('.animate-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `fadeInUp 1s forwards`;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Simple Image Lightbox for Gallery
    const galleryItems = document.querySelectorAll('.galeri-item');
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    document.body.appendChild(lightbox);
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            lightbox.classList.add('active');
            lightbox.innerHTML = `
                <img src="${img.src}" alt="${img.alt}">
                <span class="close-btn">&times;</span>
            `;
            
            document.body.style.overflow = 'hidden';
        });
    });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target !== e.currentTarget && !e.target.classList.contains('close-btn')) return;
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Form Submission
    const contactForm = document.querySelector('.kontak-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Here you would typically send the data to a server
            console.log('Form data:', data);
            
            // Show success message
            alert('Pesan Anda telah terkirim! Kami akan segera menghubungi Anda.');
            this.reset();
        });
    }
    
    // Simple Activities Slider Navigation
    const kegiatanSlider = document.querySelector('.kegiatan-slider');
    if (kegiatanSlider) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        kegiatanSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - kegiatanSlider.offsetLeft;
            scrollLeft = kegiatanSlider.scrollLeft;
        });
        
        kegiatanSlider.addEventListener('mouseleave', () => {
            isDown = false;
        });
        
        kegiatanSlider.addEventListener('mouseup', () => {
            isDown = false;
        });
        
        kegiatanSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - kegiatanSlider.offsetLeft;
            const walk = (x - startX) * 2;
            kegiatanSlider.scrollLeft = scrollLeft - walk;
        });
    }
});

// Additional CSS for lightbox
const lightboxStyle = document.createElement('style');
lightboxStyle.textContent = `
    #lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
    }
    
    #lightbox.active {
        opacity: 1;
        pointer-events: all;
    }
    
    #lightbox img {
        max-width: 90%;
        max-height: 90%;
        border: 3px solid white;
        border-radius: 5px;
    }
    
    .close-btn {
        position: absolute;
        top: 20px;
        right: 20px;
        color: white;
        font-size: 3rem;
        cursor: pointer;
    }
`;
document.head.appendChild(lightboxStyle);

// Smooth scrolling untuk semua anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Sesuaikan dengan tinggi header
                behavior: 'smooth'
            });
        }
    });
});

// Smooth Header Simple Version
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    const header = document.querySelector('.header');
    
    if (currentScroll > lastScroll) {
        // Scroll down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scroll up
        header.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
});

// === SMOOTH HEADER ===
(function() {
    let lastScroll = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (Math.abs(currentScroll - lastScroll) < 5) return; // Ignore tiny scrolls
        
        if (currentScroll > lastScroll && currentScroll > 60) {
            // Scroll down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scroll up
            header.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });
})();

