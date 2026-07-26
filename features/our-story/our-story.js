/* ==========================================================================
   ChabHouy — Our Story Feature Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
    // Scroll reveal observer for story cards
    const revealEls = document.querySelectorAll('.card-soft, .farmer-card');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealEls.forEach(el => observer.observe(el));
    }
});
