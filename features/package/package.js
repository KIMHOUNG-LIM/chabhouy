/* ==========================================================================
   Package Page — package.js
   Plain vanilla JavaScript: no frameworks, no build step.
   Everything on this page comes from the "packageData" object below.
   Switching tabs (Ingredient / Snack / Noodle) simply swaps which
   part of that object we render into the page.
   ========================================================================== */

// 1) All the content for each category lives here.
//    Want to change the price, items, or copy? Edit this object only.
const packageData = {
    ingredient: {
        tabLabel: "Ingredient",
        tabIcon: "bi-leaf",
        breadcrumb: "Family Ingredient Pack",
        title: "Family Ingredient Pack",
        subtitle: "Essential organic seasonings & pantry staples straight from Cambodian farms.",
        mainImage: "https://i.pinimg.com/736x/4c/54/ce/4c54cef214d30f41be6484750b47b88a.jpg",
        galleryImages: [
            "https://i.pinimg.com/736x/4c/54/ce/4c54cef214d30f41be6484750b47b88a.jpg",
            "https://i.pinimg.com/736x/d4/38/eb/d438eb3eefbdefb6ba9d87d1e2e24d05.jpg",
            "https://i.pinimg.com/1200x/13/6a/d8/136ad81856fb3c5739c2ff6dd89a92da.jpg",
            "https://i.pinimg.com/1200x/79/07/69/79076952f1db364deb335a67fc2e18ef.jpg",
            "https://i.pinimg.com/1200x/31/d4/05/31d4052250855c45f6351d2937dbf39d.jpg"
        ],
        trustBadges: [
            { icon: "bi-flower1", title: "100% Natural", caption: "No artificial additives" },
            { icon: "bi-geo-alt", title: "Locally Sourced", caption: "Direct from Kampot & Kampong Speu" },
            { icon: "bi-patch-check", title: "Quality Guaranteed", caption: "Fresh & aromatic" }
        ],
        included: [
            { icon: "bi-flower2", name: "Kampot Sea Salt", amount: "500g" },
            { icon: "bi-tree", name: "Palm Sugar Blocks", amount: "250g" },
            { icon: "bi-sun", name: "Kampot Black Pepper", amount: "100g" },
            { icon: "bi-drop", name: "Virgin Coconut Oil", amount: "500ml" },
            { icon: "bi-flower1", name: "Pure Cassava Starch", amount: "500g" },
            { icon: "bi-basket", name: "Natural Mung Bean Flour", amount: "400g" }
        ],
        savingsPercent: 15,
        individualPrice: 19.40,
        packPrice: 16.50,
        savedAmount: 2.90,
        thumbCount: 5,
        perfectFor: [
            { icon: "bi-basket", title: "Daily Seasoning", caption: "Essential salt, palm sugar, and pepper for everyday meals." },
            { icon: "bi-leaf", title: "Pure & Organic", caption: "Unrefined natural ingredients for wholesome healthy cooking." },
            { icon: "bi-people", title: "Family Pantry", caption: "Generous pack sizes suitable for daily family cooking." },
            { icon: "bi-piggy-bank", title: "Save More", caption: "Save 15% when buying pantry essentials as a bundle." }
        ],
        howTo: [
            "Use Kampot Sea Salt and Palm Sugar Blocks to balance sweet and savory flavors in soups, marinades, and sauces.",
            "Grind fresh Kampot Black Peppercorns or mix Cassava Starch with water to thicken curries and stir-fries.",
            "Store in sealed containers in a cool, dry pantry to retain full aroma and peak natural freshness."
        ],
        bundleLabel: "Pantry Set",
        strip: {
            title: "Sourced Fresh, From Local Farms",
            subtitle: "No chemicals, no shortcuts — just pure natural ingredients.",
            items: [
                { icon: "bi-flower2", label: "Sea Salt" },
                { icon: "bi-tree", label: "Palm Sugar" },
                { icon: "bi-sun", label: "Kampot Pepper" },
                { icon: "bi-drop", label: "Coconut Oil" },
                { icon: "bi-flower1", label: "Cassava Starch" },
                { icon: "bi-basket", label: "Mung Bean Flour" }
            ]
        }
    },

    snack: {
        tabLabel: "Snack",
        tabIcon: "bi-bag",
        breadcrumb: "Family Snack Pack",
        title: "Family Snack Pack",
        subtitle: "Natural snacks the whole family can enjoy, anytime.",
        mainImage: "https://i.pinimg.com/1200x/17/20/17/172017696b480f6e1d478e089d4d0d0c.jpg",
        galleryImages: [
            "https://i.pinimg.com/1200x/17/20/17/172017696b480f6e1d478e089d4d0d0c.jpg",
            "https://i.pinimg.com/1200x/38/e3/36/38e33699452541c27c52342cd85b8524.jpg",
            "https://i.pinimg.com/1200x/4e/20/f9/4e20f987f4bea0ac5bdc0d4a430e6074.jpg",
            "https://i.pinimg.com/1200x/d5/bc/34/d5bc3412866fac0443e206568a55097a.jpg",
            "https://i.pinimg.com/1200x/e6/70/98/e670984bb961aeb41b171b3ef75a1679.jpg"
        ],
        trustBadges: [
            { icon: "bi-flower1", title: "100% Natural", caption: "No preservatives" },
            { icon: "bi-geo-alt", title: "Locally Sourced", caption: "From local producers" },
            { icon: "bi-patch-check", title: "Quality Guaranteed", caption: "Fresh & crunchy" }
        ],
        included: [
            { icon: "bi-cookie", name: "Banana Chips", amount: "150g" },
            { icon: "bi-cookie", name: "Sweet Potato Chips", amount: "150g" },
            { icon: "bi-egg-fried", name: "Roasted Cashew", amount: "100g" },
            { icon: "bi-apple", name: "Dried Mango", amount: "120g" },
            { icon: "bi-circle-square", name: "Rice Crackers", amount: "100g" },
            { icon: "bi-egg-fried", name: "Mixed Nuts", amount: "150g" }
        ],
        savingsPercent: 12,
        individualPrice: 14.20,
        packPrice: 12.50,
        savedAmount: 1.70,
        thumbCount: 5,
        perfectFor: [
            { icon: "bi-lightning-charge", title: "Quick Snacking", caption: "Tasty bites ready whenever hunger strikes." },
            { icon: "bi-leaf", title: "Natural Treats", caption: "Made with real, wholesome ingredients." },
            { icon: "bi-people", title: "Share & Enjoy", caption: "Great for the whole family to share." },
            { icon: "bi-piggy-bank", title: "Save More", caption: "Better value with our bundle packs." }
        ],
        howTo: [
            "Keep the pack sealed in a cool, dry place.",
            "Open and portion into bowls for sharing.",
            "Enjoy on its own or pair with your favorite drink."
        ],
        bundleLabel: "Snack Pack",
        strip: {
            title: "Made with Natural Ingredients",
            subtitle: "No preservatives, no artificial colors, just real goodness.",
            items: [
                { icon: "bi-egg-fried", label: "Cashew" },
                { icon: "bi-apple", label: "Mango" },
                { icon: "bi-cookie", label: "Banana" },
                { icon: "bi-cookie", label: "Sweet Potato" },
                { icon: "bi-circle-square", label: "Rice" },
                { icon: "bi-egg-fried", label: "Mixed Nuts" }
            ]
        }
    },

    noodle: {
        tabLabel: "Noodle",
        tabIcon: "bi-shield-check",
        breadcrumb: "Family Noodle Pack",
        title: "Family Noodle Pack",
        subtitle: "Wholesome noodles made from natural ingredients.",
        mainImage: "https://i.pinimg.com/1200x/28/91/c6/2891c6779458e74cfa87c720fb01c720.jpg",
        galleryImages: [
            "https://i.pinimg.com/1200x/28/91/c6/2891c6779458e74cfa87c720fb01c720.jpg",
            "https://i.pinimg.com/736x/c1/f9/ed/c1f9ed7b548fa47e50f19fb8cee9279f.jpg",
            "https://i.pinimg.com/1200x/89/da/00/89da00e88071ce6b870c278598cfa3b7.jpg",
            "https://i.pinimg.com/736x/2d/04/9b/2d049b9e9228737d4cec0dbfebb23f6c.jpg",
            "https://i.pinimg.com/736x/bd/b3/0f/bdb30f89b94a228bb8652d273e440011.jpg"
        ],
        trustBadges: [
            { icon: "bi-flower1", title: "100% Natural", caption: "No additives" },
            { icon: "bi-geo-alt", title: "Locally Sourced", caption: "From local producers" },
            { icon: "bi-patch-check", title: "Quality Guaranteed", caption: "Fresh & delicious" }
        ],
        included: [
            { icon: "bi-egg", name: "Egg Noodle", amount: "400g" },
            { icon: "bi-moisture", name: "Rice Noodle", amount: "400g" },
            { icon: "bi-flower3", name: "Spinach Noodle", amount: "400g" },
            { icon: "bi-basket2", name: "Whole Wheat Noodle", amount: "400g" },
            { icon: "bi-carrot", name: "Vegetable Noodle", amount: "400g" },
            { icon: "bi-bag", name: "Seasoning Pack", amount: "6 packs" }
        ],
        savingsPercent: 20,
        individualPrice: 22.90,
        packPrice: 18.30,
        savedAmount: 4.60,
        thumbCount: 5,
        perfectFor: [
            { icon: "bi-clock", title: "Easy Meals", caption: "Quick and delicious meals in minutes." },
            { icon: "bi-leaf", title: "Healthy Choice", caption: "Made with natural ingredients." },
            { icon: "bi-people", title: "Family Favorite", caption: "Loved by kids and adults." },
            { icon: "bi-piggy-bank", title: "Save More", caption: "Best value bundle for noodle lovers." }
        ],
        howTo: [
            "Boil water in a pot and add noodles.",
            "Cook for 3–5 minutes until soft.",
            "Drain and serve with your favorite soup or stir-fry."
        ],
        bundleLabel: "Noodle Pack",
        strip: {
            title: "Made with Natural Ingredients",
            subtitle: "No artificial color, no artificial flavor, 100% natural goodness.",
            items: [
                { icon: "bi-egg", label: "Egg Noodle" },
                { icon: "bi-moisture", label: "Rice Noodle" },
                { icon: "bi-flower3", label: "Spinach Noodle" },
                { icon: "bi-basket2", label: "Wheat Noodle" },
                { icon: "bi-carrot", label: "Veggie Noodle" },
                { icon: "bi-bag", label: "Seasoning" }
            ]
        }
    }
};

// 2) Keep track of what's currently selected on the page.
let activeCategory = "ingredient";
let activeThumb = 0;
let quantity = 1;

// 3) Small helper to format a number as a dollar price, e.g. 16.5 -> "$16.50"
function formatPrice(value) {
    return "$" + value.toFixed(2);
}

// 4) Render functions — each one fills in a single part of the page.

function renderTabs() {
    const tabGroup = document.getElementById("pkgTabs");
    if (!tabGroup) return;

    tabGroup.innerHTML = "";

    Object.keys(packageData).forEach((key) => {
        const data = packageData[key];
        const button = document.createElement("button");
        button.type = "button";
        button.className = "pkg-tab" + (key === activeCategory ? " is-active" : "");
        button.innerHTML = `<i class="bi ${data.tabIcon}"></i> ${data.tabLabel}`;
        button.addEventListener("click", () => selectCategory(key));
        tabGroup.appendChild(button);
    });
}

function renderBreadcrumb(data) {
    const el = document.getElementById("pkgBreadcrumbCurrent");
    if (el) el.textContent = data.breadcrumb;
}

function renderGallery(data) {
    const images = data.galleryImages || (data.mainImage ? [data.mainImage] : []);
    const currentImg = images[activeThumb] || data.mainImage;

    // Main image placeholder
    const main = document.getElementById("pkgGalleryMain");
    if (main) {
        if (currentImg) {
            main.innerHTML = `<img src="${currentImg}" alt="${data.title}" style="width:100%; height:100%; object-fit:cover; border-radius: var(--radius-lg);" />`;
        } else {
            main.innerHTML = `<i class="bi ${data.tabIcon}"></i>`;
        }
    }

    // Thumbnails
    const track = document.getElementById("pkgThumbTrack");
    if (!track) return;
    track.innerHTML = "";

    const count = images.length > 0 ? images.length : data.thumbCount;
    for (let i = 0; i < count; i++) {
        const imgUrl = images[i] || data.mainImage;
        const thumb = document.createElement("div");
        thumb.className = "ph-image pkg-thumb" + (i === activeThumb ? " is-active" : "");
        if (imgUrl) {
            thumb.innerHTML = `<img src="${imgUrl}" alt="${data.title} thumbnail ${i + 1}" style="width:100%; height:100%; object-fit:cover; border-radius: inherit;" />`;
        } else {
            thumb.innerHTML = `<i class="bi ${data.tabIcon}"></i>`;
        }
        thumb.addEventListener("click", () => {
            activeThumb = i;
            renderGallery(data);
        });
        track.appendChild(thumb);
    }
}

function renderTrustBadges(data) {
    const el = document.getElementById("pkgTrustRow");
    if (!el) return;

    el.innerHTML = data.trustBadges
        .map(
            (badge) => `
      <div class="pkg-trust-item">
        <i class="bi ${badge.icon}"></i>
        <div>
          <strong>${badge.title}</strong>
          <span>${badge.caption}</span>
        </div>
      </div>`
        )
        .join("");
}

function renderIncluded(data) {
    const el = document.getElementById("pkgIncludedGrid");
    if (!el) return;

    el.innerHTML = data.included
        .map(
            (item) => `
      <div class="pkg-included-item">
        <i class="bi ${item.icon}"></i>
        <div>
          <strong>${item.name}</strong>
          <span>${item.amount}</span>
        </div>
      </div>`
        )
        .join("");
}

function renderSavings(data) {
    document.getElementById("pkgSavingsPercent").textContent = data.savingsPercent + "%";
    document.getElementById("pkgIndividualPrice").textContent = formatPrice(data.individualPrice);
    document.getElementById("pkgPackPrice").textContent = formatPrice(data.packPrice);
    document.getElementById("pkgSaveAmount").textContent = "Save " + formatPrice(data.savedAmount);
}

function renderPrice(data) {
    document.getElementById("pkgPriceValue").textContent = formatPrice(data.packPrice);
}

function renderPerfectFor(data) {
    const el = document.getElementById("pkgPerfectGrid");
    if (!el) return;

    el.innerHTML = data.perfectFor
        .map(
            (item) => `
      <div class="pkg-perfect-item">
        <i class="bi ${item.icon}"></i>
        <strong>${item.title}</strong>
        <p>${item.caption}</p>
      </div>`
        )
        .join("");
}

function renderHowTo(data) {
    const el = document.getElementById("pkgHowToSteps");
    if (!el) return;

    el.innerHTML = data.howTo
        .map(
            (step, index) => `
      <li>
        <span class="pkg-step-num">${index + 1}</span>
        <p>${step}</p>
      </li>`
        )
        .join("");

    const image = document.getElementById("pkgHowToImage");
    if (image) {
        if (data.mainImage) {
            image.innerHTML = `<img src="${data.mainImage}" alt="${data.title}" style="width:100%; height:100%; object-fit:cover; border-radius: var(--radius-md);" />`;
        } else {
            image.innerHTML = `<i class="bi bi-egg-fried"></i>`;
        }
    }
}

function renderBundleTiers(data) {
    const el = document.getElementById("pkgTierGrid");
    if (!el) return;

    const tiers = [
        { name: "Starter " + data.bundleLabel, choose: "Choose any 2 packs", save: "Save 10%", basketCount: 2, popular: false },
        { name: "Family " + data.bundleLabel, choose: "Choose any 3 packs", save: "Save 15%", basketCount: 3, popular: true },
        { name: "Value " + data.bundleLabel, choose: "Choose any 4+ packs", save: "Save 20%", basketCount: 4, popular: false }
    ];

    el.innerHTML = tiers
        .map(
            (tier) => `
      <div class="pkg-tier-card${tier.popular ? " is-popular" : ""}">
        ${tier.popular ? '<span class="pkg-tier-badge">Most Popular</span>' : ""}
        <strong>${tier.name}</strong>
        <span class="pkg-tier-sub">${tier.choose}</span>
        <div class="pkg-tier-basket">
          ${'<i class="bi bi-basket2-fill"></i>'.repeat(tier.basketCount)}
        </div>
        <span class="pkg-tier-save">${tier.save}</span>
        <span class="pkg-tier-note">Automatically applied</span>
      </div>`
        )
        .join("");
}

function renderStrip(data) {
    document.getElementById("pkgStripTitle").textContent = data.strip.title;
    document.getElementById("pkgStripSubtitle").textContent = data.strip.subtitle;

    const el = document.getElementById("pkgStripRow");
    if (!el) return;

    el.innerHTML = data.strip.items
        .map(
            (item) => `
      <div class="pkg-strip-item">
        <div class="ph-image"><i class="bi ${item.icon}"></i></div>
        <span>${item.label}</span>
      </div>`
        )
        .join("");
}

function renderQuantity() {
    document.getElementById("pkgQtyValue").textContent = quantity;
}

// 5) One function that re-renders everything for the active category.
function renderPage() {
    const data = packageData[activeCategory];

    document.getElementById("pkgTitle").textContent = data.title;
    document.getElementById("pkgSubtitle").textContent = data.subtitle;

    renderTabs();
    renderBreadcrumb(data);
    renderGallery(data);
    renderTrustBadges(data);
    renderIncluded(data);
    renderSavings(data);
    renderPrice(data);
    renderPerfectFor(data);
    renderHowTo(data);
    renderBundleTiers(data);
    renderStrip(data);
    renderQuantity();
}

// 6) Handle switching categories (tabs)
function selectCategory(key) {
    if (key === activeCategory) return;
    activeCategory = key;
    activeThumb = 0;
    quantity = 1;
    renderPage();
}

// 7) Quantity stepper buttons
function increaseQty() {
    quantity += 1;
    renderQuantity();
}

function decreaseQty() {
    if (quantity <= 1) return;
    quantity -= 1;
    renderQuantity();
}

// 8) Add to cart / buy now — replace with real cart logic later.
function handleAddToCart() {
    const data = packageData[activeCategory];
    showToast(`Added ${quantity} × ${data.title} to your cart.`);
}

function handleBuyNow() {
    const data = packageData[activeCategory];
    showToast(`Proceeding to checkout with ${quantity} × ${data.title}.`);
}

// Small, self-contained toast message (no external library needed)
function showToast(message) {
    let toast = document.getElementById("pkgToast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "pkgToast";
        toast.style.position = "fixed";
        toast.style.bottom = "24px";
        toast.style.left = "50%";
        toast.style.transform = "translateX(-50%)";
        toast.style.backgroundColor = "var(--color-primary)";
        toast.style.color = "#fff";
        toast.style.padding = "0.8rem 1.4rem";
        toast.style.borderRadius = "999px";
        toast.style.boxShadow = "var(--shadow-medium)";
        toast.style.fontSize = "0.9rem";
        toast.style.zIndex = "1080";
        toast.style.transition = "opacity 0.3s ease";
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.style.opacity = "1";

    clearTimeout(toast._hideTimer);
    toast._hideTimer = setTimeout(() => {
        toast.style.opacity = "0";
    }, 2200);
}

// 9) Wire up static buttons once the page has loaded.
document.addEventListener("DOMContentLoaded", () => {
    // Read category query parameter from URL (e.g. package.html?cat=snack)
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('cat') || urlParams.get('c');
    if (catParam && packageData[catParam]) {
        activeCategory = catParam;
    }

    renderPage();

    document.getElementById("pkgQtyMinus").addEventListener("click", decreaseQty);
    document.getElementById("pkgQtyPlus").addEventListener("click", increaseQty);
    document.getElementById("pkgAddToCart").addEventListener("click", handleAddToCart);
    document.getElementById("pkgBuyNow").addEventListener("click", handleBuyNow);

    document.getElementById("pkgThumbPrev").addEventListener("click", () => {
        const data = packageData[activeCategory];
        activeThumb = (activeThumb - 1 + data.thumbCount) % data.thumbCount;
        renderGallery(data);
    });

    document.getElementById("pkgThumbNext").addEventListener("click", () => {
        const data = packageData[activeCategory];
        activeThumb = (activeThumb + 1) % data.thumbCount;
        renderGallery(data);
    });
});
