/* ==========================================================================
   Chabhouy — Home Page Animations
   Applies reveal animation classes to home page elements on scroll.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
    // Select elements that should animate into view on scroll
    const selectors = [
        '.chb-hero__fact',
        '.chb-step',
        '.chb-price-card',
        '.chb-ingredient',
        '.chb-cat-card'
    ].join(', ');

    const itemsToAnimate = document.querySelectorAll(selectors);

    // Add the 'reveal' class to each item so IntersectionObserver can reveal it
    itemsToAnimate.forEach(function (element) {
        element.classList.add('reveal');
    });
});
