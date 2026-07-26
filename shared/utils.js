/* ==========================================================================
   Chabhouy — Shared Helper Functions
   Helper functions used across different parts of the website.
   ========================================================================== */

const ChabhouyUtils = {
    // Format a number as a USD currency string (e.g. 6.5 -> "$6.50")
    formatUSD: function (amount) {
        const numericValue = Number(amount);
        return '$' + numericValue.toFixed(2);
    },

    // Debounce function to limit how often a function can run (e.g. during rapid typing or scrolling)
    debounce: function (func, delay) {
        if (delay === undefined) {
            delay = 200;
        }
        let timerId;
        return function (...args) {
            clearTimeout(timerId);
            timerId = setTimeout(function () {
                func(...args);
            }, delay);
        };
    }
};
