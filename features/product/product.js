/* ==========================================================================
   ChabHouy — Product Listing Page Logic
   Beginner-friendly JavaScript. No build tools, no frameworks — just plain
   DOM code so it's easy to read, extend, and swap for real API data later.
   ========================================================================== */

/* ------------------------------------------------------------------------
   1. PRODUCT DATA
   In a real app this would come from an API. For now it's a plain array
   so the filtering logic below has something to work with.
   Each product has the fields the cards + filters need:
     - category: "snack" | "noodle" | "ingredient" | "package"
     - ingredients: list of natural ingredients used (used by the sidebar)
     - province: where it's sourced from
     - price / originalPrice: originalPrice is only set when discounted
     - included: only used by "package" products (what's inside the box)
   ------------------------------------------------------------------------ */
const CHB_PRODUCTS = [
    { id: 1, category: "snack", name: "Banana Chips Original", desc: "Crispy banana slices with a touch of sea salt.", ingredients: ["Banana"], province: "Kampong Cham", price: 3.50, unit: "100g", rating: 4.5, reviews: 128, isBestSeller: true, icon: "bi-basket2", dateAdded: "2026-05-01", image: "https://i.pinimg.com/1200x/4e/20/f9/4e20f987f4bea0ac5bdc0d4a430e6074.jpg" },
    { id: 2, category: "snack", name: "Sweet Potato Chips", desc: "Lightly fried sweet potato chips, naturally sweet & crunchy.", ingredients: ["Sweet Potato"], province: "Kandal", price: 3.50, originalPrice: 4.20, unit: "100g", rating: 4.0, reviews: 96, icon: "bi-basket2", dateAdded: "2026-04-12", image: "https://images.unsplash.com/photo-1699666397768-0126340e880a?fm=jpg&q=80&w=1200&auto=format&fit=crop" },
    { id: 3, category: "snack", name: "Coconut Chips", desc: "Toasted coconut slices with a touch of natural sweetness.", ingredients: ["Coconut"], province: "Kampot", price: 3.80, unit: "80g", rating: 4.2, reviews: 74, icon: "bi-basket2", dateAdded: "2026-03-28", image: "https://images.unsplash.com/photo-1699666397768-0126340e880a?fm=jpg&q=80&w=1200&auto=format&fit=crop" },
    { id: 4, category: "snack", name: "Cassava Chips", desc: "Thin & crispy cassava chips, perfectly salted.", ingredients: ["Cassava"], province: "Battambang", price: 3.20, unit: "100g", rating: 4.0, reviews: 53, icon: "bi-basket2", dateAdded: "2026-02-19", image: "https://images.unsplash.com/photo-1699666397768-0126340e880a?fm=jpg&q=80&w=1200&auto=format&fit=crop" },
    { id: 5, category: "snack", name: "Mung Bean Crisps", desc: "Crunchy mung bean crisps, high in protein & fiber.", ingredients: ["Mung Bean"], province: "Takeo", price: 3.60, unit: "80g", rating: 4.3, reviews: 42, icon: "bi-basket2", dateAdded: "2026-06-02", image: "https://i.pinimg.com/1200x/e6/70/98/e670984bb961aeb41b171b3ef75a1679.jpg" },
    { id: 6, category: "snack", name: "Banana Chips Honey", desc: "Banana chips sweetened with natural honey.", ingredients: ["Banana"], province: "Kampong Cham", price: 3.80, unit: "100g", rating: 4.4, reviews: 68, icon: "bi-basket2", dateAdded: "2026-05-20", image: "https://i.pinimg.com/1200x/1b/40/03/1b4003b8508e34cced88270daaa17caf.jpg" },
    { id: 7, category: "snack", name: "Peanut Brittle Bites", desc: "Roasted peanuts set in a light palm sugar brittle.", ingredients: ["Peanut", "Palm"], province: "Kampong Speu", price: 4.20, unit: "120g", rating: 4.6, reviews: 87, icon: "bi-basket2", dateAdded: "2026-01-15", image: "https://i.pinimg.com/1200x/d5/bc/34/d5bc3412866fac0443e206568a55097a.jpg" },
    { id: 8, category: "snack", name: "Ginger Rice Crackers", desc: "Puffed rice crackers with a warm ginger kick.", ingredients: ["Rice", "Ginger"], province: "Siem Reap", price: 3.10, unit: "90g", rating: 3.9, reviews: 31, icon: "bi-basket2", dateAdded: "2026-06-10", image: "https://i.pinimg.com/1200x/ab/c6/f7/abc6f7495f0fe7eabf0f7e80c7987d78.jpg" },

    { id: 9, category: "noodle", name: "Kampot Pepper Noodles", desc: "Dried rice noodles infused with cracked Kampot pepper.", ingredients: ["Rice", "Pepper"], province: "Kampot", price: 2.90, unit: "250g", rating: 4.7, reviews: 152, isBestSeller: true, icon: "bi-egg-fried", dateAdded: "2026-04-30", image: "https://i.pinimg.com/1200x/89/da/00/89da00e88071ce6b870c278598cfa3b7.jpg" },
    { id: 10, category: "noodle", name: "Cassava Glass Noodles", desc: "Chewy, gluten-free noodles made from pure cassava starch.", ingredients: ["Cassava"], province: "Battambang", price: 2.60, unit: "200g", rating: 4.1, reviews: 44, icon: "bi-egg-fried", dateAdded: "2026-03-05", image: "https://i.pinimg.com/736x/bd/b3/0f/bdb30f89b94a228bb8652d273e440011.jpg" },
    { id: 11, category: "noodle", name: "Coconut Milk Noodles", desc: "Soft rice noodles pre-seasoned with coconut milk broth base.", ingredients: ["Rice", "Coconut"], province: "Kampot", price: 3.30, originalPrice: 4.00, unit: "300g", rating: 4.3, reviews: 59, icon: "bi-egg-fried", dateAdded: "2026-06-18", image: "https://i.pinimg.com/control1/736x/2d/04/9b/2d049b9e9228737d4cec0dbfebb23f6c.jpg" },
    { id: 12, category: "noodle", name: "Mung Bean Vermicelli", desc: "Thin, silky vermicelli made from 100% mung bean starch.", ingredients: ["Mung Bean"], province: "Takeo", price: 2.75, unit: "200g", rating: 4.0, reviews: 27, icon: "bi-egg-fried", dateAdded: "2026-02-02", image: "https://i.pinimg.com/1200x/14/89/72/14897276df17db8a8bd7743980226acd.jpg" },

    { id: 13, category: "ingredient", name: "Kampot Black Peppercorns", desc: "Sun-dried whole peppercorns with a bright, floral heat.", ingredients: ["Pepper"], province: "Kampot", price: 5.50, unit: "100g", rating: 4.9, reviews: 210, isBestSeller: true, icon: "bi-flower2", dateAdded: "2026-05-08", image: "https://images.unsplash.com/photo-1641661548431-87172338d58c?fm=jpg&q=80&w=1200&auto=format&fit=crop" },
    { id: 14, category: "ingredient", name: "Palm Sugar Blocks", desc: "Unrefined natural palm sugar, hand-tapped from Kampong Speu palm trees.", ingredients: ["Palm"], province: "Kampong Speu", price: 3.00, originalPrice: 3.80, unit: "250g", rating: 4.6, reviews: 133, icon: "bi-flower2", dateAdded: "2026-01-22", image: "https://i.pinimg.com/1200x/79/07/69/79076952f1db364deb335a67fc2e18ef.jpg" },
    { id: 15, category: "ingredient", name: "Kampot Natural Sea Salt", desc: "Pure solar-evaporated sea salt harvested from coastal Kampot salt fields.", ingredients: ["Sea Salt"], province: "Kampot", price: 2.20, unit: "500g", rating: 4.8, reviews: 145, isBestSeller: true, icon: "bi-flower2", dateAdded: "2026-03-14", image: "https://i.pinimg.com/1200x/13/6a/d8/136ad81856fb3c5739c2ff6dd89a92da.jpg" },
    { id: 16, category: "ingredient", name: "Pure Cassava Starch", desc: "Fine natural cassava starch for thickening sauces, soups, and traditional cooking.", ingredients: ["Cassava"], province: "Battambang", price: 2.50, unit: "500g", rating: 4.3, reviews: 52, icon: "bi-flower2", dateAdded: "2026-02-18", image: "https://i.pinimg.com/736x/f5/15/06/f5150627d9a349eca5871862a2d76aaa.jpg" },
    { id: 17, category: "ingredient", name: "Virgin Coconut Cooking Oil", desc: "First cold-press coconut oil with zero additives or chemicals.", ingredients: ["Coconut"], province: "Kampot", price: 6.20, unit: "500ml", rating: 4.5, reviews: 61, icon: "bi-flower2", dateAdded: "2026-06-25", image: "https://i.pinimg.com/1200x/31/d4/05/31d4052250855c45f6351d2937dbf39d.jpg" },
    { id: 18, category: "ingredient", name: "Natural Mung Bean Flour", desc: "Finely ground pure mung bean flour for traditional sweets and cooking.", ingredients: ["Mung Bean"], province: "Takeo", price: 2.80, unit: "400g", rating: 4.2, reviews: 38, icon: "bi-flower2", dateAdded: "2026-04-03", image: "https://i.pinimg.com/1200x/6a/40/dd/6a40dd3d4ef1ebff710478629dad217f.jpg" },

    {
        id: 19, category: "package", name: "Snack Lover Bundle",
        desc: "A curated mix of our four best-selling chips, perfect for sharing.",
        ingredients: ["Banana", "Sweet Potato", "Coconut", "Cassava"], province: "Mixed Provinces",
        price: 11.90, originalPrice: 14.80, unit: "bundle", rating: 4.8, reviews: 96,
        isBestSeller: true, icon: "bi-box-seam", dateAdded: "2026-06-05", image: "https://i.pinimg.com/control1/1200x/38/e3/36/38e33699452541c27c52342cd85b8524.jpg",
        included: ["Banana Chips Original (100g)", "Sweet Potato Chips (100g)", "Coconut Chips (80g)", "Cassava Chips (100g)"]
    },
    {
        id: 20, category: "package", name: "Kampot Pantry Set",
        desc: "Everything you need to cook with real Kampot pepper flavor.",
        ingredients: ["Pepper", "Rice", "Coconut"], province: "Kampot",
        price: 9.50, originalPrice: 12.20, unit: "bundle", rating: 4.7, reviews: 54,
        isBestSeller: true, icon: "bi-box-seam", dateAdded: "2026-05-30", image: "https://i.pinimg.com/736x/f9/6b/fe/f96bfe6f24240ac5699ae8e4380d87f3.jpg",
        included: ["Kampot Peppercorns (100g)", "Kampot Pepper Noodles (250g)", "Coconut Milk Noodles (300g)"]
    },
    {
        id: 21, category: "package", name: "Noodle Night Pack",
        desc: "Three noodle styles for a week of easy, flavorful dinners.",
        ingredients: ["Rice", "Cassava", "Mung Bean"], province: "Mixed Provinces",
        price: 7.80, originalPrice: 8.65, unit: "bundle", rating: 4.4, reviews: 33,
        icon: "bi-box-seam", dateAdded: "2026-03-21", image: "https://i.pinimg.com/736x/c1/f9/ed/c1f9ed7b548fa47e50f19fb8cee9279f.jpg",
        included: ["Kampot Pepper Noodles (250g)", "Cassava Glass Noodles (200g)", "Mung Bean Vermicelli (200g)"]
    },
    {
        id: 22, category: "package", name: "Farmhouse Starter Kit",
        desc: "Core pantry staples sourced straight from local farmers.",
        ingredients: ["Rice", "Palm", "Coconut"], province: "Mixed Provinces",
        price: 12.50, originalPrice: 16.00, unit: "bundle", rating: 4.6, reviews: 41,
        isBestSeller: true, icon: "bi-box-seam", dateAdded: "2026-06-14", image: "https://i.pinimg.com/1200x/7e/c9/79/7ec97965ad04c2522d6539a0e6b1fbfc.jpg",
        included: ["Jasmine Rice (1kg)", "Palm Sugar Blocks (250g)", "Cold-Pressed Coconut Oil (500ml)"]
    }
];

/* Products shown per page */
const CHB_PAGE_SIZE = 6;

/* ------------------------------------------------------------------------
   2. FILTER STATE
   Keeps track of everything the user has selected right now.
   ------------------------------------------------------------------------ */
const chbFilterState = {
    category: "all",     // "all" | "snack" | "noodle" | "ingredient" | "package"
    ingredients: [],      // multi-select, e.g. ["Banana", "Coconut"]
    provinces: [],        // multi-select
    priceMin: null,
    priceMax: null,
    sort: "best-selling",
    page: 1
};

/* ------------------------------------------------------------------------
   3. BUILD SIDEBAR FILTER LISTS (ingredients + provinces) FROM DATA
   Doing this from the data means the sidebar always matches what's
   actually in the catalog, instead of being typed out by hand.
   ------------------------------------------------------------------------ */
function chbBuildFilterLists() {
    // Count how many products use each ingredient / province
    const ingredientCounts = {};
    const provinceCounts = {};

    CHB_PRODUCTS.forEach(function (product) {
        product.ingredients.forEach(function (ing) {
            ingredientCounts[ing] = (ingredientCounts[ing] || 0) + 1;
        });
        provinceCounts[product.province] = (provinceCounts[product.province] || 0) + 1;
    });

    chbRenderCheckboxList("chbIngredientList", ingredientCounts, "ingredients", 5);
    chbRenderCheckboxList("chbProvinceList", provinceCounts, "provinces", 5);
}

/* Renders a checkbox list into a container, with a "Show more" toggle
   once the list is longer than `visibleCount`. */
function chbRenderCheckboxList(containerId, counts, stateKey, visibleCount) {
    const container = document.getElementById(containerId);
    const names = Object.keys(counts).sort();

    let html = "";
    names.forEach(function (name, index) {
        const hiddenClass = index >= visibleCount ? " chb-hidden-item" : "";
        html += '<label class="chb-check-row' + hiddenClass + '" data-extra-item>' +
            '<span class="chb-check-label">' +
            '<input type="checkbox" value="' + name + '" data-filter-key="' + stateKey + '"> ' + name +
            '</span>' +
            '<span class="chb-check-count">(' + counts[name] + ')</span>' +
            '</label>';
    });

    if (names.length > visibleCount) {
        html += '<button type="button" class="chb-show-more-btn" data-toggle-more="' + containerId + '">+ Show more</button>';
    }

    container.innerHTML = html;

    // Hide/show extra items when "Show more" is clicked
    const showMoreBtn = container.querySelector("[data-toggle-more]");
    if (showMoreBtn) {
        showMoreBtn.addEventListener("click", function () {
            const hiddenItems = container.querySelectorAll(".chb-hidden-item");
            const isHidden = hiddenItems[0].style.display === "none" || !hiddenItems[0].style.display;
            hiddenItems.forEach(function (item) {
                item.style.display = isHidden ? "flex" : "none";
            });
            showMoreBtn.textContent = isHidden ? "- Show less" : "+ Show more";
        });
        // Start collapsed
        container.querySelectorAll(".chb-hidden-item").forEach(function (item) {
            item.style.display = "none";
        });
    }

    // Wire up checkbox change events
    container.querySelectorAll('input[type="checkbox"]').forEach(function (checkbox) {
        checkbox.addEventListener("change", function () {
            chbToggleArrayFilter(stateKey, checkbox.value, checkbox.checked);
            chbFilterState.page = 1;
            chbUpdatePage();
        });
    });
}

/* Adds or removes a value from a multi-select filter array */
function chbToggleArrayFilter(stateKey, value, isChecked) {
    const list = chbFilterState[stateKey];
    const index = list.indexOf(value);
    if (isChecked && index === -1) {
        list.push(value);
    } else if (!isChecked && index !== -1) {
        list.splice(index, 1);
    }
}

/* ------------------------------------------------------------------------
   4. FILTERING + SORTING
   ------------------------------------------------------------------------ */
function chbGetFilteredProducts() {
    return CHB_PRODUCTS.filter(function (product) {
        // Category (top pills)
        if (chbFilterState.category !== "all" && product.category !== chbFilterState.category) {
            return false;
        }

        // Ingredients (product must contain at least one selected ingredient)
        if (chbFilterState.ingredients.length > 0) {
            const hasIngredient = product.ingredients.some(function (ing) {
                return chbFilterState.ingredients.indexOf(ing) !== -1;
            });
            if (!hasIngredient) return false;
        }

        // Province (product must match one of the selected provinces)
        if (chbFilterState.provinces.length > 0) {
            if (chbFilterState.provinces.indexOf(product.province) === -1) return false;
        }

        // Price range
        if (chbFilterState.priceMin !== null && product.price < chbFilterState.priceMin) return false;
        if (chbFilterState.priceMax !== null && product.price > chbFilterState.priceMax) return false;

        return true;
    });
}

function chbSortProducts(products) {
    const sorted = products.slice(); // don't mutate the original array
    switch (chbFilterState.sort) {
        case "price-low":
            sorted.sort(function (a, b) { return a.price - b.price; });
            break;
        case "price-high":
            sorted.sort(function (a, b) { return b.price - a.price; });
            break;
        case "rating":
            sorted.sort(function (a, b) { return b.rating - a.rating; });
            break;
        case "newest":
            sorted.sort(function (a, b) { return new Date(b.dateAdded) - new Date(a.dateAdded); });
            break;
        default: // "best-selling" -> most reviews first
            sorted.sort(function (a, b) { return b.reviews - a.reviews; });
    }
    return sorted;
}

/* ------------------------------------------------------------------------
   5. RENDERING
   ------------------------------------------------------------------------ */
function chbUpdatePage() {
    const filtered = chbSortProducts(chbGetFilteredProducts());

    chbRenderResultCount(filtered.length);
    chbRenderChips();

    if (filtered.length === 0) {
        document.getElementById("chbProductGrid").innerHTML = "";
        document.getElementById("chbEmptyState").classList.remove("d-none");
        document.getElementById("chbPagination").innerHTML = "";
        return;
    }

    document.getElementById("chbEmptyState").classList.add("d-none");

    // Pagination math
    const totalPages = Math.ceil(filtered.length / CHB_PAGE_SIZE);
    if (chbFilterState.page > totalPages) chbFilterState.page = totalPages;
    const start = (chbFilterState.page - 1) * CHB_PAGE_SIZE;
    const pageItems = filtered.slice(start, start + CHB_PAGE_SIZE);

    chbRenderProductGrid(pageItems);
    chbRenderPagination(totalPages);
}

function chbRenderResultCount(total) {
    const el = document.getElementById("chbResultCount");
    if (total === 0) {
        el.textContent = "No products found";
        return;
    }
    const start = (chbFilterState.page - 1) * CHB_PAGE_SIZE + 1;
    const end = Math.min(start + CHB_PAGE_SIZE - 1, total);
    el.textContent = "Showing " + start + "\u2013" + end + " of " + total + " products";
}

function chbRenderProductGrid(products) {
    const grid = document.getElementById("chbProductGrid");
    grid.innerHTML = products.map(chbCardTemplate).join("");

    // Wire up quantity steppers and add to cart buttons for each card
    grid.querySelectorAll(".chb-card").forEach(function (card) {
        const minusBtn = card.querySelector("[data-qty-minus]");
        const plusBtn = card.querySelector("[data-qty-plus]");
        const valSpan = card.querySelector("[data-qty-val]");
        const addBtn = card.querySelector("[data-add-to-cart]");

        let cardQty = 1;

        if (minusBtn && plusBtn && valSpan) {
            minusBtn.addEventListener("click", function () {
                if (cardQty > 1) {
                    cardQty -= 1;
                    valSpan.textContent = cardQty;
                }
            });

            plusBtn.addEventListener("click", function () {
                cardQty += 1;
                valSpan.textContent = cardQty;
            });
        }

        if (addBtn) {
            addBtn.addEventListener("click", function () {
                const qtyText = cardQty > 1 ? " (" + cardQty + ")" : "";
                addBtn.innerHTML = '<i class="bi bi-check2"></i> Added' + qtyText;
                setTimeout(function () {
                    addBtn.innerHTML = '<i class="bi bi-cart3"></i> Add to Cart';
                }, 1500);
            });
        }
    });

    // Wire up wishlist heart toggle
    grid.querySelectorAll("[data-wishlist]").forEach(function (btn) {
        btn.addEventListener("click", function () {
            btn.classList.toggle("active");
            const icon = btn.querySelector("i");
            icon.className = btn.classList.contains("active") ? "bi bi-heart-fill" : "bi bi-heart";
        });
    });
}

function chbCardTemplate(product) {
    const isPackage = product.category === "package";
    const categoryLabel = product.category.charAt(0).toUpperCase() + product.category.slice(1);

    // Image Badges (Max 2 clean highlight labels on top of picture, e.g. Best Seller & Save 20%)
    let badgesHtml = "";
    const badgeList = [];

    // 1. Best Seller highlight label
    if (product.badge === "Best Seller" || product.isBestSeller) {
        badgeList.push('<span class="chb-card-badge best-seller">Best Seller</span>');
    }

    // 2. Discount highlight label (e.g. Save 20%)
    if (product.originalPrice && product.originalPrice > product.price) {
        const percentSaved = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
        badgeList.push('<span class="chb-card-badge discount">Save ' + percentSaved + '%</span>');
    } else if (product.badge && product.badge !== "Best Seller") {
        const isDiscount = product.badge.toLowerCase().indexOf("save") !== -1;
        badgeList.push('<span class="chb-card-badge' + (isDiscount ? " discount" : "") + '">' + product.badge + '</span>');
    }

    // Limit to max 2 labels on picture to prevent visual clutter
    if (badgeList.length > 0) {
        badgesHtml = '<div class="chb-card-badge-group">' + badgeList.slice(0, 2).join('') + '</div>';
    }

    // Body tags (Max 2 ingredient tags + 1 province tag = 2 to 3 tags inside card body)
    const ingredientTags = product.ingredients.slice(0, 2).map(function (ing) {
        return '<span class="chb-tag">' + ing + '</span>';
    }).join("");
    const provinceTag = '<span class="chb-tag province"><i class="bi bi-geo-alt"></i> ' + product.province + '</span>';

    // Star rating (rounded to nearest half star, simplified to filled/empty for readability)
    const fullStars = Math.round(product.rating);
    const starsHtml = '<span class="stars">' + "\u2605".repeat(fullStars) + "\u2606".repeat(5 - fullStars) + '</span>';

    // Price block: packages show original + discounted price, everything else shows one price
    let priceHtml;
    if (isPackage && product.originalPrice) {
        const savings = (product.originalPrice - product.price).toFixed(2);
        priceHtml =
            '<div class="chb-card-price-row">' +
            '<span class="chb-card-price">$' + product.price.toFixed(2) + '</span>' +
            '<span class="chb-card-price-original">$' + product.originalPrice.toFixed(2) + '</span>' +
            '</div>' +
            '<div class="chb-card-savings"><i class="bi bi-piggy-bank"></i> You save $' + savings + '</div>';
    } else {
        priceHtml =
            '<div class="chb-card-price-row">' +
            '<span class="chb-card-price">$' + product.price.toFixed(2) + '</span>' +
            '<span class="chb-card-price-unit">/ ' + product.unit + '</span>' +
            '</div>';
    }

    // Included items list, only rendered for packages
    let includedHtml = "";
    if (isPackage && product.included) {
        includedHtml = '<div class="chb-card-included"><strong>Includes:</strong>' + product.included.join(", ") + '</div>';
    }

    let mediaHtml;
    if (product.image) {
        mediaHtml = '<img src="' + product.image + '" alt="' + product.name + '" class="chb-card-img" />';
    } else {
        mediaHtml = '<i class="bi ' + product.icon + '"></i>';
    }

    return (
        '<article class="chb-card" data-id="' + product.id + '">' +
        '<div class="chb-card-media">' +
        badgesHtml +
        mediaHtml +
        '<button class="chb-card-wishlist" data-wishlist aria-label="Save to wishlist"><i class="bi bi-heart"></i></button>' +
        '</div>' +
        '<div class="chb-card-body">' +
        '<div class="chb-card-category">' + categoryLabel + '</div>' +
        '<h3 class="chb-card-name">' + product.name + '</h3>' +
        '<p class="chb-card-desc">' + product.desc + '</p>' +
        includedHtml +
        '<div class="chb-card-tags">' + ingredientTags + provinceTag + '</div>' +
        '<div class="chb-card-rating">' + starsHtml + ' (' + product.reviews + ')</div>' +
        priceHtml +
        '<div class="chb-card-qty-row">' +
        '<div class="chb-card-qty-stepper">' +
        '<button type="button" class="chb-card-qty-btn" data-qty-minus aria-label="Decrease quantity">–</button>' +
        '<span class="chb-card-qty-val" data-qty-val>1</span>' +
        '<button type="button" class="chb-card-qty-btn" data-qty-plus aria-label="Increase quantity">+</button>' +
        '</div>' +
        '<div class="chb-card-actions">' +
        '<button class="btn-brand" data-add-to-cart>' +
        '<i class="bi bi-cart3"></i> Add to Cart' +
        '</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</article>'
    );
}

function chbRenderChips() {
    const chips = [];

    if (chbFilterState.category !== "all") {
        chips.push({ label: chbFilterState.category, clear: function () { chbSetCategory("all"); } });
    }
    chbFilterState.ingredients.forEach(function (ing) {
        chips.push({ label: ing, clear: function () { chbRemoveChipValue("ingredients", ing); } });
    });
    chbFilterState.provinces.forEach(function (prov) {
        chips.push({ label: prov, clear: function () { chbRemoveChipValue("provinces", prov); } });
    });
    if (chbFilterState.priceMin !== null || chbFilterState.priceMax !== null) {
        const min = chbFilterState.priceMin !== null ? "$" + chbFilterState.priceMin : "$0";
        const max = chbFilterState.priceMax !== null ? "$" + chbFilterState.priceMax : "any";
        chips.push({ label: min + " \u2013 " + max, clear: function () { chbClearPriceRange(); } });
    }

    const container = document.getElementById("chbActiveChips");
    container.innerHTML = "";
    chips.forEach(function (chip, index) {
        const chipEl = document.createElement("span");
        chipEl.className = "chb-chip";
        chipEl.innerHTML = chip.label + ' <button aria-label="Remove filter"><i class="bi bi-x"></i></button>';
        chipEl.querySelector("button").addEventListener("click", function () {
            chip.clear();
            chbFilterState.page = 1;
            chbUpdatePage();
            chbSyncSidebarCheckboxes();
        });
        container.appendChild(chipEl);
    });
}

function chbRemoveChipValue(stateKey, value) {
    const list = chbFilterState[stateKey];
    const index = list.indexOf(value);
    if (index !== -1) list.splice(index, 1);
}

function chbClearPriceRange() {
    chbFilterState.priceMin = null;
    chbFilterState.priceMax = null;
    document.getElementById("chbPriceMin").value = "";
    document.getElementById("chbPriceMax").value = "";
}

/* Keeps sidebar checkboxes in sync when a filter is removed via a chip */
function chbSyncSidebarCheckboxes() {
    document.querySelectorAll('#chbIngredientList input, #chbProvinceList input').forEach(function (checkbox) {
        const key = checkbox.getAttribute("data-filter-key");
        checkbox.checked = chbFilterState[key].indexOf(checkbox.value) !== -1;
    });
}

function chbRenderPagination(totalPages) {
    const nav = document.getElementById("chbPagination");
    if (totalPages <= 1) {
        nav.innerHTML = "";
        return;
    }

    let html = '<button class="chb-page-btn" data-page="prev" ' + (chbFilterState.page === 1 ? "disabled" : "") + '><i class="bi bi-chevron-left"></i></button>';
    for (let i = 1; i <= totalPages; i++) {
        html += '<button class="chb-page-btn' + (i === chbFilterState.page ? " active" : "") + '" data-page="' + i + '">' + i + '</button>';
    }
    html += '<button class="chb-page-btn" data-page="next" ' + (chbFilterState.page === totalPages ? "disabled" : "") + '><i class="bi bi-chevron-right"></i></button>';
    nav.innerHTML = html;

    nav.querySelectorAll("[data-page]").forEach(function (btn) {
        btn.addEventListener("click", function () {
            const target = btn.getAttribute("data-page");
            if (target === "prev") chbFilterState.page -= 1;
            else if (target === "next") chbFilterState.page += 1;
            else chbFilterState.page = parseInt(target, 10);
            chbUpdatePage();
            document.getElementById("chbProductGrid").scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });
}

/* ------------------------------------------------------------------------
   6. CATEGORY PILLS
   ------------------------------------------------------------------------ */
function chbSetCategory(category) {
    chbFilterState.category = category;
    document.querySelectorAll(".chb-filter-btn").forEach(function (btn) {
        btn.classList.toggle("active", btn.getAttribute("data-category") === category);
    });
}

/* ------------------------------------------------------------------------
   7. EVENT WIRING
   ------------------------------------------------------------------------ */
function chbWireEvents() {
    // Category pills
    document.querySelectorAll(".chb-filter-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
            chbSetCategory(btn.getAttribute("data-category"));
            chbFilterState.page = 1;
            chbUpdatePage();
        });
    });


    // Sort dropdown
    document.getElementById("chbSortSelect").addEventListener("change", function (e) {
        chbFilterState.sort = e.target.value;
        chbFilterState.page = 1;
        chbUpdatePage();
    });

    // Price range "Apply" button
    document.getElementById("chbApplyPrice").addEventListener("click", function () {
        const minVal = document.getElementById("chbPriceMin").value;
        const maxVal = document.getElementById("chbPriceMax").value;
        chbFilterState.priceMin = minVal === "" ? null : parseFloat(minVal);
        chbFilterState.priceMax = maxVal === "" ? null : parseFloat(maxVal);
        chbFilterState.page = 1;
        chbUpdatePage();
    });

    // Clear all filters (sidebar button + empty state button)
    [document.getElementById("chbClearFilters"), document.getElementById("chbEmptyClear")].forEach(function (btn) {
        btn.addEventListener("click", chbClearAllFilters);
    });

    // Collapsible filter groups (Ingredients / Province / Price Range)
    document.querySelectorAll("[data-toggle]").forEach(function (headBtn) {
        headBtn.addEventListener("click", function () {
            const bodyId = headBtn.getAttribute("data-toggle");
            const body = document.getElementById(bodyId);
            headBtn.classList.toggle("collapsed");
            body.classList.toggle("collapsed");
        });
    });

    // Mobile off-canvas filter panel: open
    document.getElementById("chbMobileFilterToggle").addEventListener("click", function () {
        document.getElementById("chbFilterSidebar").classList.add("open");
        document.getElementById("chbFilterBackdrop").classList.add("open");
    });

    // Mobile off-canvas filter panel: close (via X button or backdrop click)
    function closeMobileFilters() {
        document.getElementById("chbFilterSidebar").classList.remove("open");
        document.getElementById("chbFilterBackdrop").classList.remove("open");
    }
    document.getElementById("chbFilterClose").addEventListener("click", closeMobileFilters);
    document.getElementById("chbFilterBackdrop").addEventListener("click", closeMobileFilters);
}

function chbClearAllFilters() {
    chbFilterState.category = "all";
    chbFilterState.ingredients = [];
    chbFilterState.provinces = [];
    chbFilterState.priceMin = null;
    chbFilterState.priceMax = null;
    chbFilterState.sort = "best-selling";
    chbFilterState.page = 1;

    document.getElementById("chbPriceMin").value = "";
    document.getElementById("chbPriceMax").value = "";
    document.getElementById("chbSortSelect").value = "best-selling";
    chbSetCategory("all");
    chbSyncSidebarCheckboxes();
    chbUpdatePage();
}

/* ------------------------------------------------------------------------
   8. INIT
   ------------------------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", function () {
    chbBuildFilterLists();
    chbWireEvents();
    chbUpdatePage();
});