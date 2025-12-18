document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Mobile Menu Toggle logic
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const header = document.querySelector('header');
    
    let isMenuOpen = false;

    menuBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.remove('hidden');
            // Change icon to X
            menuBtn.innerHTML = '<i data-lucide="x" class="w-8 h-8"></i>';
            lucide.createIcons();
            header.classList.add('bg-slate-900'); // Ensure solid background when menu open
        } else {
            mobileMenu.classList.add('hidden');
            // Change icon back to Menu
            menuBtn.innerHTML = '<i data-lucide="menu" class="w-8 h-8"></i>';
            lucide.createIcons();
            if (window.scrollY === 0) header.classList.remove('bg-slate-900');
        }
    });

    // Close mobile menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            isMenuOpen = false;
            mobileMenu.classList.add('hidden');
            menuBtn.innerHTML = '<i data-lucide="menu" class="w-8 h-8"></i>';
            lucide.createIcons();
        });
    });

    // Sticky Header Background on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('shadow-lg');
            header.classList.add('bg-slate-900/95');
        } else {
            header.classList.remove('shadow-lg');
            // Keep background if menu is open
            if (!isMenuOpen) {
                // We keep the class in HTML by default, but you could toggle transparency here
                // For this design, we kept it semi-transparent/solid consistent
            }
        }
    });

    // Add simple reveal animation for elements on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Target elements to animate
    document.querySelectorAll('article, .feature-card').forEach(el => {
        el.style.opacity = '0'; // Hide initially
        observer.observe(el);
    });
    
    // Fix initial opacity via CSS class addition dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        .animate-fade-in-up {
            animation: fadeIn 0.8s ease-out forwards;
            opacity: 1 !important;
        }
    `;
    document.head.appendChild(style);
});