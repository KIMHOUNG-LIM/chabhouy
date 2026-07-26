/* ==========================================================================
   Chabhouy — Main Application Script
   Handles loading HTML components (Navbar & Footer), sticky navbar,
   active page highlight, and scroll animations.
   ========================================================================== */

// Helper function to fetch and insert an HTML component into a page element
// Determine project root directory dynamically based on main.js location
function getProjectRoot() {
    const scriptSrc = document.currentScript ? document.currentScript.src : window.location.href;
    try {
        // Since main.js is located at <root>/shared/main.js, going up one directory ('../') yields <root>/
        return new URL('../', scriptSrc).href;
    } catch (e) {
        return './';
    }
}

const PROJECT_ROOT = getProjectRoot();

// Helper function to resolve relative URLs in injected navbar/footer components
function fixComponentLinks(mountElement) {
    if (!mountElement) return;
    const links = mountElement.querySelectorAll('a[href]');
    links.forEach(link => {
        let href = link.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:')) {
            return;
        }
        if (href.startsWith('/')) {
            href = href.slice(1);
        }
        try {
            link.setAttribute('href', new URL(href, PROJECT_ROOT).href);
        } catch (e) {
            // Fallback: leave as is
        }
    });
}

// Helper function to fetch and insert an HTML component into a page element
async function loadComponent(selector, filepath) {
    const mountElement = document.querySelector(selector);
    if (!mountElement) return;

    try {
        let resolvedPath = filepath;
        if (filepath.startsWith('/') || !filepath.startsWith('http')) {
            const cleanPath = filepath.startsWith('/') ? filepath.slice(1) : filepath;
            resolvedPath = new URL(cleanPath, PROJECT_ROOT).href;
        }

        const response = await fetch(resolvedPath);
        if (!response.ok) {
            throw new Error(`HTTP status ${response.status}`);
        }
        const htmlText = await response.text();
        mountElement.innerHTML = htmlText;
        fixComponentLinks(mountElement);
    } catch (error) {
        console.error("Failed to load component from " + filepath, error);
    }
}

// Highlight current active page link in navbar
function highlightActiveNavLink() {
    const currentPath = window.location.pathname.toLowerCase();
    const navLinks = document.querySelectorAll('.chb-navbar__links a, .chb-mobile-menu a');

    navLinks.forEach(function (link) {
        const href = link.getAttribute('href');
        if (!href) return;

        const targetPath = href.toLowerCase();

        // Match home page
        const isHome = (currentPath === '/' || currentPath.endsWith('/') || currentPath.endsWith('index.html')) && targetPath.includes('index.html');
        
        // Match products page
        const isProducts = (currentPath.includes('product.html') || currentPath.includes('category.html')) && targetPath.includes('product.html');

        // Match package page
        const isPackage = currentPath.includes('package.html') && targetPath.includes('package.html');
        
        // Match our story page
        const isStory = currentPath.includes('our-story.html') && targetPath.includes('our-story.html');

        // Match cart page
        const isCart = currentPath.includes('cart.html') && targetPath.includes('cart.html');

        // Match profile page
        const isProfile = currentPath.includes('profile.html') && targetPath.includes('profile.html');

        if (isHome || isProducts || isPackage || isStory || isCart || isProfile) {
            link.classList.add('is-active');
        } else {
            link.classList.remove('is-active');
        }
    });
}

// Setup navbar behaviors: sticky scroll shadow, mobile menu toggle, active highlight
function setupNavbar() {
    const navbar = document.getElementById('chbNavbar');
    if (!navbar) return;

    // Add shadow class when page is scrolled down
    function handleScroll() {
        if (window.scrollY > 10) {
            navbar.classList.add('is-scrolled');
        } else {
            navbar.classList.remove('is-scrolled');
        }
    }
    handleScroll();
    window.addEventListener('scroll', handleScroll);

    // Toggle mobile menu drawer visibility
    const menuButton = document.getElementById('chbMenuToggle');
    const mobileMenu = document.getElementById('chbMobileMenu');
    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', function () {
            const isOpen = mobileMenu.classList.toggle('is-open');
            menuButton.setAttribute('aria-expanded', isOpen);
        });
    }

    // Set active link highlighting
    highlightActiveNavLink();
}

// Setup Contact Us modal triggers and handlers globally
function setupContactModal() {
    const modal = document.getElementById('chbContactModal');
    const overlay = document.getElementById('chbContactModalOverlay');
    const closeBtn = document.getElementById('chbContactModalClose');
    const doneBtn = document.getElementById('chbContactDoneBtn');

    function openContactModal(e) {
        if (e) e.preventDefault();
        if (overlay) overlay.classList.add('is-open');
        if (modal) modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }

    function closeContactModal() {
        if (overlay) overlay.classList.remove('is-open');
        if (modal) modal.classList.remove('is-open');
        document.body.style.overflow = '';
    }

    document.querySelectorAll('[data-open-contact]').forEach(el => {
        el.addEventListener('click', openContactModal);
    });

    if (closeBtn) closeBtn.addEventListener('click', closeContactModal);
    if (doneBtn) doneBtn.addEventListener('click', closeContactModal);
    if (overlay) overlay.addEventListener('click', closeContactModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) {
            closeContactModal();
        }
    });
}

// Setup footer features: current copyright year, newsletter input evaluation & success modal
function setupFooter() {
    const yearElement = document.getElementById('chbYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    const newsletterForm = document.getElementById('chbNewsletterForm');
    const emailInput = document.getElementById('chbNewsletterEmail');
    const evalMsg = document.getElementById('chbNewsletterEvalMsg');

    function evaluateNewsletterEmail(val) {
        if (!evalMsg || !emailInput) return false;
        const trimmed = val.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (trimmed.length === 0) {
            evalMsg.className = 'field-eval-msg fs-xs mt-1 text-start text-danger';
            evalMsg.innerHTML = '<i class="bi bi-exclamation-circle-fill me-1"></i>Please enter your email address ✉️';
            emailInput.classList.add('border-danger');
            emailInput.classList.remove('border-success');
            return false;
        } else if (!emailRegex.test(trimmed)) {
            evalMsg.className = 'field-eval-msg fs-xs mt-1 text-start text-warning-emphasis';
            evalMsg.innerHTML = '<i class="bi bi-info-circle-fill me-1"></i>Enter a valid email (e.g. name@example.com) 📧';
            emailInput.classList.add('border-danger');
            emailInput.classList.remove('border-success');
            return false;
        } else {
            evalMsg.className = 'field-eval-msg fs-xs mt-1 text-start text-success';
            evalMsg.innerHTML = '<i class="bi bi-check-circle-fill me-1"></i>Valid email format! ✨';
            emailInput.classList.remove('border-danger');
            emailInput.classList.add('border-success');
            return true;
        }
    }

    if (emailInput) {
        emailInput.addEventListener('input', (e) => evaluateNewsletterEmail(e.target.value));
    }

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const val = emailInput ? emailInput.value.trim() : '';
            const isValid = evaluateNewsletterEmail(val);

            if (!isValid) return;

            // Show Newsletter Success Modal
            const newsOverlay = document.getElementById('chbNewsletterSuccessOverlay');
            const newsModal = document.getElementById('chbNewsletterSuccessModal');
            const subscribedEmailEl = document.getElementById('chbNewsSubscribedEmail');

            if (subscribedEmailEl) subscribedEmailEl.textContent = val;

            if (newsOverlay && newsModal) {
                newsOverlay.classList.add('is-open');
                newsModal.classList.add('is-open');
                document.body.style.overflow = 'hidden';
            }

            // Reset input
            if (emailInput) {
                emailInput.value = '';
                emailInput.classList.remove('border-success', 'border-danger');
            }
            if (evalMsg) evalMsg.innerHTML = '';
        });
    }

    // Handlers for closing Newsletter Success Modal
    const newsCloseBtn = document.getElementById('chbNewsSuccessClose');
    const newsDoneBtn = document.getElementById('chbNewsSuccessDoneBtn');
    const newsOverlay = document.getElementById('chbNewsletterSuccessOverlay');
    const newsModal = document.getElementById('chbNewsletterSuccessModal');

    function closeNewsSuccessModal() {
        if (newsOverlay) newsOverlay.classList.remove('is-open');
        if (newsModal) newsModal.classList.remove('is-open');
        document.body.style.overflow = '';
    }

    if (newsCloseBtn) newsCloseBtn.addEventListener('click', closeNewsSuccessModal);
    if (newsDoneBtn) newsDoneBtn.addEventListener('click', closeNewsSuccessModal);
    if (newsOverlay) newsOverlay.addEventListener('click', closeNewsSuccessModal);

    setupContactModal();
}

// Reveal elements smoothly when scrolling into view
function setupScrollReveal() {
    const revealItems = document.querySelectorAll('.reveal');
    if (revealItems.length === 0) return;

    const observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    revealItems.forEach(function (item) {
        observer.observe(item);
    });
}

// Initialize application when DOM content is fully loaded
document.addEventListener('DOMContentLoaded', async function () {
    // Load navbar and footer partials into mount elements using project relative paths
    await Promise.all([
        loadComponent('#chbNavbarMount', 'components/navbar/navbar.html'),
        loadComponent('#chbFooterMount', 'components/footer/footer.html')
    ]);

    // Initialize interactive features
    setupNavbar();
    setupFooter();
    setupScrollReveal();

    // Signal that page partials are loaded
    document.dispatchEvent(new CustomEvent('chabhouy:partials-ready'));
});
