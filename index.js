    // Loader hide logic
    window.addEventListener('load', function() {
      const loader = document.getElementById('loader');
      if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
          loader.style.display = 'none';
        }, 600);
      }
    });

document.addEventListener('DOMContentLoaded', function () {
    // Mobile navigation toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navArrow = document.getElementById('nav-arrow');

    // State tracking
    let isNavCollapsed = false;

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navMenu.classList.toggle('open');
            const isOpen = navMenu.classList.contains('open');
            navToggle.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }

    // Arrow toggle for all screen sizes
    if (navArrow && navMenu) {
        navArrow.addEventListener('click', function () {
            isNavCollapsed = !isNavCollapsed;

            if (isNavCollapsed) {
                navMenu.classList.add('collapsed');
                navArrow.innerHTML = '<i class="fas fa-chevron-right"></i>';
                navArrow.style.left = '0.5rem';     // Move to the left
                navArrow.style.right = 'auto';
            } else {
                navMenu.classList.remove('collapsed');
                navArrow.innerHTML = '<i class="fas fa-chevron-left"></i>';
                // Get the current navbar width for a dynamic offset
                const navWidth = navMenu.offsetWidth;
                navArrow.style.left = (navWidth - 12) + 'px';
                navArrow.style.right = '0px';
            }
        });
    }

    // Active link highlighting
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    function setActiveLink() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveLink);
    setActiveLink();

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Set initial theme
    if (savedTheme === 'light') {
        htmlElement.setAttribute('data-theme', 'light');
        updateThemeUI('light');
    } else if (savedTheme === 'dark' || prefersDark) {
        htmlElement.setAttribute('data-theme', 'dark');
        updateThemeUI('dark');
    } else {
        // Default to dark theme if no preference
        htmlElement.setAttribute('data-theme', 'dark');
        updateThemeUI('dark');
    }

    // Toggle theme on button click
    themeToggle.addEventListener('click', function () {
        const currentTheme = htmlElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeUI(newTheme);
        updateNavTheme();
    });

    // Update button icon and text based on theme
    function updateThemeUI(theme) {
        const themeIcon = themeToggle.querySelector('i');
        const themeText = themeToggle.querySelector('span');

        if (theme === 'light') {
            themeIcon.className = 'fas fa-sun text-yellow-500 mr-3';
            themeText.textContent = 'Light Mode';
            themeToggle.classList.remove('bg-gray-800/50', 'hover:bg-gray-800');
            themeToggle.classList.add('bg-gray-100/80', 'hover:bg-gray-200');
        } else {
            themeIcon.className = 'fas fa-moon text-orange-400 mr-3';
            themeText.textContent = 'Dark Mode';
            themeToggle.classList.remove('bg-gray-100/80', 'hover:bg-gray-200');
            themeToggle.classList.add('bg-gray-800/50', 'hover:bg-gray-800');
        }
    }

    // Ensure nav menu and arrow use correct theme variables
    function updateNavTheme() {
        // Remove any inline background and color to let CSS variables work
        if (navMenu) {
            navMenu.style.backgroundColor = '';
            navMenu.style.borderColor = '';
        }
        if (navArrow) {
            navArrow.style.backgroundColor = '';
            navArrow.style.color = '';
        }
    }

    // Call once on load
    updateNavTheme();

    // Ensure navbar is collapsed on page load
    if (navMenu && !navMenu.classList.contains('collapsed')) {
        navMenu.classList.add('collapsed');
    }
    // Fix nav-arrow position when collapsed on load
    if (navArrow && navMenu && navMenu.classList.contains('collapsed')) {
        navArrow.style.left = '0.5rem';
        navArrow.style.right = 'auto';
        navArrow.innerHTML = '<i class="fas fa-chevron-right"></i>';
    }

    // Back to Top Button logic
    const backToTopBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 200) {
            backToTopBtn.classList.add('opacity-100');
            backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        } else {
            backToTopBtn.classList.remove('opacity-100');
            backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        }
    });
    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});