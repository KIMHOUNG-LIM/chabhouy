/* ==========================================================================
   ChabHouy — Track Your Order Page JS
   ========================================================================== */

// Helper Date & Money Formatting Functions
function formatDate(dateObj) {
    if (!dateObj) return '';
    const d = new Date(dateObj);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatDateTime(dateObj) {
    if (!dateObj) return '';
    const d = new Date(dateObj);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
        ' at ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

function formatShortDateTime(dateObj) {
    if (!dateObj) return 'Pending';
    const d = new Date(dateObj);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ', ' +
        d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

function formatMoney(amount) {
    return '$' + Number(amount).toFixed(2);
}

function phImage(iconClass) {
    return `<div class="ph-image bg-light d-flex align-items-center justify-content-center text-success rounded fs-4"><i class="bi ${iconClass}"></i></div>`;
}

// 1. Tracking Steps Definition
const trackingSteps = [
    { key: "placed", label: "Order Placed", icon: "bi-check-lg" },
    { key: "confirmed", label: "Confirmed", icon: "bi-check-lg" },
    { key: "packed", label: "Packed", icon: "bi-check-lg" },
    { key: "in_transit", label: "In Transit", icon: "bi-truck" },
    { key: "delivered", label: "Delivered", icon: "bi-house-door" },
];

// 2. Sample Orders Data
const sampleOrders = {
    LH123456789: {
        orderNumber: "LH123456789",
        placedAt: new Date("2025-05-18T10:30:00"),
        estimatedDelivery: new Date("2025-05-22T00:00:00"),
        currentStep: "in_transit",
        stepTimes: {
            placed: new Date("2025-05-18T10:30:00"),
            confirmed: new Date("2025-05-18T11:15:00"),
            packed: new Date("2025-05-19T09:20:00"),
            in_transit: new Date("2025-05-20T08:45:00"),
        },
        paymentMethod: "Credit Card (•••• 4242)",
        paymentStatus: "Paid",
        total: 46.50,
        customerName: "Sokunthea En",
        addressLines: [
            "#123, Street 271, Sangkat Boeung Tumpun",
            "Khan Meanchey, Phnom Penh",
            "Cambodia",
        ],
        deliveryPartner: "GrabExpress",
        trackingNumber: "GRAB123456789KH",
        items: [
            { icon: "bi-basket2", name: "Palm Sugar (Thnot)", origin: "From Kampong Thom", weight: "1 kg", price: 4.5, qty: 1 },
            { icon: "bi-flower1", name: "Garlic", origin: "From Kampot", weight: "500g", price: 2.8, qty: 1 },
            { icon: "bi-circle-fill", name: "Jasmine Rice", origin: "From Battambang", weight: "2 kg", price: 6.2, qty: 1 },
            { icon: "bi-emoji-smile", name: "Banana Chips Original", origin: "From Battambang", weight: "100g", price: 3.2, qty: 1 },
        ],
    },
    CHB12345: {
        orderNumber: "CHB12345",
        placedAt: new Date("2025-05-20T14:20:00"),
        estimatedDelivery: new Date("2025-05-24T00:00:00"),
        currentStep: "in_transit",
        stepTimes: {
            placed: new Date("2025-05-20T14:20:00"),
            confirmed: new Date("2025-05-20T15:10:00"),
            packed: new Date("2025-05-21T09:30:00"),
            in_transit: new Date("2025-05-21T11:00:00"),
        },
        paymentMethod: "VISA (•••• 1234)",
        paymentStatus: "Paid",
        total: 28.50,
        customerName: "Sokunthea En",
        addressLines: [
            "#123, Street 271, Sangkat Boeung Tumpun",
            "Khan Meanchey, Phnom Penh",
            "Cambodia",
        ],
        deliveryPartner: "GrabExpress",
        trackingNumber: "GRAB987654321KH",
        items: [
            { icon: "bi-basket2", name: "Organic Fresh Vegetable Basket", origin: "From Kampong Thom", weight: "2 kg", price: 12.50, qty: 2 },
            { icon: "bi-apple", name: "Fresh Green Apple Pack", origin: "From Battambang", weight: "1 kg", price: 3.50, qty: 1 },
        ],
    }
};

const statusLabels = {
    placed: "Order Placed",
    confirmed: "Confirmed",
    packed: "Packed",
    in_transit: "In Transit",
    delivered: "Delivered",
};

// 3. Render Functions
function renderOrderHead(order) {
    const numEl = document.getElementById("trkOrderNumber");
    const placedEl = document.getElementById("trkPlacedAt");
    const badgeEl = document.getElementById("trkStatusBadge");
    const estEl = document.getElementById("trkEstimatedDelivery");

    if (numEl) numEl.textContent = `Order #${order.orderNumber}`;
    if (placedEl) placedEl.textContent = `Placed on ${formatDateTime(order.placedAt)}`;
    if (badgeEl) badgeEl.innerHTML = `<i class="bi bi-truck"></i> ${statusLabels[order.currentStep]}`;
    if (estEl) estEl.textContent = `Estimated Delivery: ${formatDate(order.estimatedDelivery)}`;
}

let currentLoadedOrder = null;

function renderTimeline(order) {
    const timelineEl = document.getElementById("trkTimeline");
    if (!timelineEl) return;

    const isSmallMobile = window.innerWidth <= 520;
    
    // On small screens (<= 520px), display only 3 points: Placed, In Transit, Delivered
    const stepsToRender = isSmallMobile
        ? trackingSteps.filter(s => s.key === "placed" || s.key === "in_transit" || s.key === "delivered")
        : trackingSteps;

    const currentIndex = trackingSteps.findIndex((step) => step.key === order.currentStep);

    timelineEl.innerHTML = stepsToRender
        .map((step) => {
            const stepOriginalIndex = trackingSteps.findIndex(s => s.key === step.key);
            let stateClass = "";
            let dotContent = `<i class="bi ${step.icon}"></i>`;
            let timeText = "Pending";

            if (stepOriginalIndex < currentIndex) {
                stateClass = "is-done";
                dotContent = '<i class="bi bi-check-lg"></i>';
                timeText = formatShortDateTime(order.stepTimes[step.key]);
            } else if (stepOriginalIndex === currentIndex) {
                stateClass = "is-current";
                dotContent = `<i class="bi ${step.icon}"></i>`;
                timeText = formatShortDateTime(order.stepTimes[step.key]);
            }

            return `
        <div class="trk-timeline__step ${stateClass}">
          <div class="trk-timeline__line"></div>
          <div class="trk-timeline__dot">${dotContent}</div>
          <strong>${step.label}</strong>
          <small>${timeText}</small>
        </div>`;
        })
        .join("");
}

function renderInfoBanner(order) {
    const bannerEl = document.getElementById("trkInfoBanner");
    if (!bannerEl) return;

    const messages = {
        placed: "We've received your order and we're getting it ready.",
        confirmed: "Your order is confirmed and will be packed shortly.",
        packed: "Your order is packed and waiting for pickup.",
        in_transit: "Your order is on the way! Our delivery partner is bringing your natural goodness to you.",
        delivered: "Your order has been delivered. Enjoy!",
    };
    bannerEl.innerHTML = `<i class="bi bi-flower1 me-2"></i> ${messages[order.currentStep]}`;
}

function renderOrderDetails(order) {
    const num = document.getElementById("trkDetailOrderNumber");
    const date = document.getElementById("trkDetailOrderDate");
    const method = document.getElementById("trkDetailPaymentMethod");
    const status = document.getElementById("trkDetailPaymentStatus");
    const total = document.getElementById("trkDetailTotal");
    const ordStatus = document.getElementById("trkDetailStatus");

    if (num) num.textContent = order.orderNumber;
    if (date) date.textContent = formatDate(order.placedAt);
    if (method) method.textContent = order.paymentMethod;
    if (status) status.textContent = order.paymentStatus;
    if (total) total.textContent = formatMoney(order.total);
    if (ordStatus) ordStatus.textContent = statusLabels[order.currentStep];
}

function renderAddress(order) {
    const name = document.getElementById("trkCustomerName");
    const lines = document.getElementById("trkAddressLines");
    const partner = document.getElementById("trkPartnerName");
    const tracking = document.getElementById("trkTrackingNumber");

    if (name) name.textContent = order.customerName;
    if (lines) {
        lines.innerHTML = order.addressLines
            .map((line) => `<p class="mb-1">${line}</p>`)
            .join("");
    }
    if (partner) partner.textContent = order.deliveryPartner;
    if (tracking) tracking.textContent = `Tracking Number: ${order.trackingNumber}`;
}

function renderItems(order) {
    const countEl = document.getElementById("trkItemsCount");
    const listEl = document.getElementById("trkItemsList");

    if (countEl) countEl.textContent = `Items in Your Order (${order.items.length})`;
    if (listEl) {
        listEl.innerHTML = order.items
            .map(
                (item) => `
          <div class="trk-item-row d-flex align-items-center gap-3 py-2 border-bottom">
            ${phImage(item.icon)}
            <div class="trk-item-row__info flex-grow-1">
              <strong class="d-block text-dark fs-sm">${item.name}</strong>
              <small class="text-muted d-block fs-xs">${item.origin}</small>
              <small class="text-muted d-block fs-xs">${item.weight}</small>
            </div>
            <div class="trk-item-row__price text-end">
              <strong class="d-block fs-sm">${formatMoney(item.price)}</strong>
              <small class="text-muted fs-xs">Qty: ${item.qty}</small>
            </div>
          </div>`
            )
            .join("");
    }
}

function renderOrder(order) {
    if (!order) return;
    currentLoadedOrder = order;
    renderOrderHead(order);
    renderTimeline(order);
    renderInfoBanner(order);
    renderOrderDetails(order);
    renderAddress(order);
    renderItems(order);

    const resultEl = document.getElementById("trkResult");
    if (resultEl) resultEl.hidden = false;
}

window.addEventListener("resize", () => {
    if (currentLoadedOrder) {
        renderTimeline(currentLoadedOrder);
    }
});

function setupTrackForm() {
    const form = document.getElementById("trkForm");
    const input = document.getElementById("trkOrderInput");
    if (!form || !input) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const orderNumber = input.value.trim().toUpperCase();
        const order = sampleOrders[orderNumber] || sampleOrders["LH123456789"];

        if (order) {
            renderOrder(order);
            const resultEl = document.getElementById("trkResult");
            if (resultEl) resultEl.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
            alert("We couldn't find that order number. Please try LH123456789 or CHB12345!");
        }
    });
}

function initTrackOrderPage() {
    setupTrackForm();
    const defaultOrder = sampleOrders["LH123456789"];
    if (defaultOrder) {
        renderOrder(defaultOrder);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTrackOrderPage);
} else {
    initTrackOrderPage();
}
document.addEventListener("chabhouy:partials-ready", initTrackOrderPage);