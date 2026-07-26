/* ==========================================================================
   Chabhouy — Shopping Cart Component Logic
   Handles cart items state, quantity updates, and multi-step checkout wizard.
   ========================================================================== */

let cart = [
  { id: 1, name: "Natural Brown Sugar", variant: "1kg", icon: "🟤", price: 2.50, qty: 2, stock: "In Stock" },
  { id: 2, name: "Himalayan Pink Salt", variant: "500g", icon: "🧂", price: 3.20, qty: 1, stock: "In Stock" },
  { id: 3, name: "Spicy Chili Sauce", variant: "250ml", icon: "🌶️", price: 2.80, qty: 2, stock: "In Stock" }
];

const SHIPPING = 2.50;
let discount = 0;

function formatMoney(value) {
  return "$" + value.toFixed(2);
}

function getTotals() {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const total = Math.max(0, subtotal + SHIPPING - discount);
  return { subtotal, shipping: SHIPPING, total };
}

function renderCart() {
  const rowsEl = document.getElementById('cartRows');
  const filledEl = document.getElementById('cartFilled');
  const emptyEl = document.getElementById('emptyCartState');

  if (!rowsEl || !filledEl || !emptyEl) return;

  if (cart.length === 0) {
    filledEl.hidden = true;
    emptyEl.hidden = false;
    const navCount = document.getElementById('navCartCount');
    if (navCount) navCount.textContent = "0";
    return;
  }

  filledEl.hidden = false;
  emptyEl.hidden = true;

  rowsEl.innerHTML = cart.map(item => `
    <div class="cart-row" data-id="${item.id}">
      <div class="cart-product">
        <div class="cart-product-img">${item.icon}</div>
        <div class="cart-product-info">
          <div class="name">${item.name}</div>
          <div class="variant">${item.variant}</div>
          <span class="stock-tag">${item.stock}</span>
        </div>
      </div>
      <div class="cart-price">
        <span class="cart-cell-label">Price:</span>
        <span class="cart-price-val">${formatMoney(item.price)}</span>
      </div>
      <div class="cart-qty">
        <span class="cart-cell-label">Qty:</span>
        <div class="qty-control">
          <button type="button" class="qty-minus" aria-label="Decrease quantity">−</button>
          <span>${item.qty}</span>
          <button type="button" class="qty-plus" aria-label="Increase quantity">+</button>
        </div>
      </div>
      <div class="cart-total">
        <span class="cart-cell-label">Total:</span>
        <strong>${formatMoney(item.price * item.qty)}</strong>
      </div>
      <div class="cart-action">
        <button type="button" class="remove-btn" aria-label="Remove item" title="Remove item">
          <i class="bi bi-trash3-fill"></i>
        </button>
      </div>
    </div>
  `).join('');

  const itemCount = cart.reduce((s, i) => s + i.qty, 0);
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = SHIPPING;
  const total = Math.max(0, subtotal + shipping - discount);

  const itemCountEl = document.getElementById('itemCount');
  if (itemCountEl) itemCountEl.textContent = itemCount;

  const subtotalEl = document.getElementById('subtotalVal');
  if (subtotalEl) subtotalEl.textContent = formatMoney(subtotal);

  const shippingEl = document.getElementById('shippingVal');
  if (shippingEl) shippingEl.textContent = formatMoney(shipping);

  const totalEl = document.getElementById('totalVal');
  if (totalEl) totalEl.textContent = formatMoney(total);

  const navCountEl = document.getElementById('navCartCount');
  if (navCountEl) navCountEl.textContent = itemCount;

  const discountRow = document.getElementById('discountRow');
  if (discountRow) {
    if (discount > 0) {
      discountRow.hidden = false;
      const discountValEl = document.getElementById('discountVal');
      if (discountValEl) discountValEl.textContent = "-" + formatMoney(discount);
    } else {
      discountRow.hidden = true;
    }
  }
}

/* ---------------- CHECKOUT WIZARD & MODAL ---------------- */
const steps = ["Review Order", "Delivery Info", "Payment", "Confirmation"];
let currentStep = 0;
let delivery = { name: "", phone: "", address: "", city: "Phnom Penh" };
let payMethod = "cod";
let orderId = "";

function renderStepper() {
  const stepperEl = document.getElementById('stepper');
  if (!stepperEl) return;

  stepperEl.innerHTML = steps.map((label, i) => {
    const cls = i < currentStep ? 'done' : (i === currentStep ? 'active' : '');
    const dotContent = i < currentStep ? '✓' : (i + 1);
    const dotHtml = `<div class="step-dot-wrap ${cls}"><div class="step-dot">${dotContent}</div><div class="step-label">${label}</div></div>`;
    if (i < steps.length - 1) {
      const lineCls = i < currentStep ? 'done' : '';
      return dotHtml + `<div class="step-line ${lineCls}"></div>`;
    }
    return dotHtml;
  }).join('');
}

function renderStep() {
  renderStepper();
  const stepArea = document.getElementById('checkoutStepArea');
  if (!stepArea) return;

  const { subtotal, shipping, total } = getTotals();

  if (currentStep === 0) {
    stepArea.innerHTML = `
      <div class="step-panel">
        ${cart.map(i => `
          <div class="review-line"><span>${i.name} × ${i.qty}</span><span>${formatMoney(i.price * i.qty)}</span></div>
        `).join('')}
        <div class="review-line"><span>Subtotal</span><span>${formatMoney(subtotal)}</span></div>
        <div class="review-line"><span>Shipping</span><span>${formatMoney(shipping)}</span></div>
        <div class="review-line total"><span>Total</span><span>${formatMoney(total)}</span></div>
      </div>
      <div class="modal-nav">
        <span></span>
        <button type="button" class="btn-next" id="toStep2">Continue to Delivery</button>
      </div>`;

    const toStep2 = document.getElementById('toStep2');
    if (toStep2) toStep2.onclick = () => { currentStep = 1; renderStep(); };
  }

  else if (currentStep === 1) {
    stepArea.innerHTML = `
      <div class="step-panel">
        <div class="delivery-progress-bar">
          <div class="delivery-progress-fill" id="deliveryProgressFill" style="width: 0%;"></div>
        </div>
        <div id="deliveryNotice" class="delivery-notice warning">
          <i class="bi bi-heart-fill"></i> Please complete your name, phone, and address to continue 🌾
        </div>
        <div class="form-grid">
          <div class="field">
            <label>Full Name <span style="color:#C1462F;">*</span></label>
            <input id="dName" type="text" placeholder="e.g. Sok Dara" value="${delivery.name}">
            <span class="field-error" id="dNameErr"></span>
          </div>
          <div class="field">
            <label>Phone Number <span style="color:#C1462F;">*</span></label>
            <input id="dPhone" type="tel" placeholder="e.g. 012 345 678" value="${delivery.phone}">
            <span class="field-error" id="dPhoneErr"></span>
          </div>
          <div class="field full">
            <label>Delivery Address <span style="color:#C1462F;">*</span></label>
            <input id="dAddress" type="text" placeholder="e.g. House #12, Street 310, Boeung Keng Kang" value="${delivery.address}">
            <span class="field-error" id="dAddressErr"></span>
          </div>
          <div class="field">
            <label>City / Province</label>
            <select id="dCity">
              <option ${delivery.city === "Phnom Penh" ? "selected" : ""}>Phnom Penh</option>
              <option ${delivery.city === "Siem Reap" ? "selected" : ""}>Siem Reap</option>
              <option ${delivery.city === "Battambang" ? "selected" : ""}>Battambang</option>
              <option ${delivery.city === "Sihanoukville" ? "selected" : ""}>Sihanoukville</option>
              <option ${delivery.city === "Kampot" ? "selected" : ""}>Kampot</option>
              <option ${delivery.city === "Kandal" ? "selected" : ""}>Kandal</option>
            </select>
          </div>
          <div class="field">
            <label>Delivery Note (optional)</label>
            <input id="dNote" type="text" placeholder="e.g. Call before arrival">
          </div>
        </div>
      </div>
      <div class="modal-nav">
        <button type="button" class="btn-ghost" id="backTo0">Back</button>
        <button type="button" class="btn-next" id="toStep2b">Continue to Payment</button>
      </div>`;

    const nameEl = document.getElementById('dName');
    const phoneEl = document.getElementById('dPhone');
    const addrEl = document.getElementById('dAddress');
    const cityEl = document.getElementById('dCity');
    const noticeEl = document.getElementById('deliveryNotice');
    const nameErr = document.getElementById('dNameErr');
    const phoneErr = document.getElementById('dPhoneErr');
    const addrErr = document.getElementById('dAddressErr');

    function evaluateDeliveryForm() {
      const nameVal = nameEl ? nameEl.value.trim() : "";
      const phoneVal = phoneEl ? phoneEl.value.trim() : "";
      const addrVal = addrEl ? addrEl.value.trim() : "";

      const phoneDigits = phoneVal.replace(/[^0-9]/g, '');

      // 1. Live evaluation directly under Full Name box
      if (nameErr) {
        if (nameVal.length === 0) {
          nameErr.className = "field-eval error";
          nameErr.textContent = "🌿 Full name is required (at least 3 letters)";
        } else if (nameVal.length < 3) {
          nameErr.className = "field-eval hint";
          nameErr.textContent = `✍️ Keep typing... (${3 - nameVal.length} more letter${3 - nameVal.length > 1 ? 's' : ''} needed)`;
          if (nameEl) nameEl.classList.add('invalid');
        } else {
          nameErr.className = "field-eval valid";
          nameErr.textContent = "✓ Looks good!";
          if (nameEl) nameEl.classList.remove('invalid');
        }
      }

      // 2. Live evaluation directly under Phone Number box
      if (phoneErr) {
        if (phoneVal.length === 0) {
          phoneErr.className = "field-eval error";
          phoneErr.textContent = "📞 Phone number is required (at least 8 digits)";
        } else if (phoneDigits.length < 8) {
          phoneErr.className = "field-eval hint";
          phoneErr.textContent = `✍️ Need ${8 - phoneDigits.length} more digit${8 - phoneDigits.length > 1 ? 's' : ''}...`;
          if (phoneEl) phoneEl.classList.add('invalid');
        } else {
          phoneErr.className = "field-eval valid";
          phoneErr.textContent = "✓ Valid phone number!";
          if (phoneEl) phoneEl.classList.remove('invalid');
        }
      }

      // 3. Live evaluation directly under Delivery Address box
      if (addrErr) {
        if (addrVal.length === 0) {
          addrErr.className = "field-eval error";
          addrErr.textContent = "📍 Delivery address is required (at least 5 chars)";
        } else if (addrVal.length < 5) {
          addrErr.className = "field-eval hint";
          addrErr.textContent = `✍️ Need ${5 - addrVal.length} more char${5 - addrVal.length > 1 ? 's' : ''} for a clear address...`;
          if (addrEl) addrEl.classList.add('invalid');
        } else {
          addrErr.className = "field-eval valid";
          addrErr.textContent = "✓ Complete address!";
          if (addrEl) addrEl.classList.remove('invalid');
        }
      }

      const isNameValid = nameVal.length >= 3;
      const isPhoneValid = phoneDigits.length >= 8;
      const isAddrValid = addrVal.length >= 5;

      const validCount = (isNameValid ? 1 : 0) + (isPhoneValid ? 1 : 0) + (isAddrValid ? 1 : 0);
      const percent = Math.round((validCount / 3) * 100);

      const fillEl = document.getElementById('deliveryProgressFill');
      if (fillEl) fillEl.style.width = percent + "%";

      const toStep2bBtn = document.getElementById('toStep2b');

      if (validCount === 3) {
        if (noticeEl) {
          noticeEl.className = "delivery-notice ready";
          noticeEl.innerHTML = `<i class="bi bi-check-circle-fill"></i> Perfect! All details verified. Ready for payment! 🚚✨`;
        }
        if (toStep2bBtn) {
          toStep2bBtn.disabled = false;
          toStep2bBtn.style.opacity = "1";
          toStep2bBtn.style.cursor = "pointer";
          toStep2bBtn.title = "";
        }
        return true;
      } else {
        if (noticeEl) {
          noticeEl.className = "delivery-notice warning";
          if (validCount === 0) {
            noticeEl.innerHTML = `<i class="bi bi-heart-fill"></i> Please fill in your details below to continue 🌾`;
          } else if (validCount === 1) {
            noticeEl.innerHTML = `<i class="bi bi-balloon-heart"></i> Good start! Keep going (1/3 verified) 🌱`;
          } else {
            noticeEl.innerHTML = `<i class="bi bi-sparkles"></i> Almost done! 1 field needs a bit more detail (2/3 verified) 🍃`;
          }
        }
        if (toStep2bBtn) {
          toStep2bBtn.disabled = true;
          toStep2bBtn.style.opacity = "0.6";
          toStep2bBtn.style.cursor = "not-allowed";
          toStep2bBtn.title = "Please complete all fields with valid information first";
        }
        return false;
      }
    }

    [nameEl, phoneEl, addrEl].forEach(el => {
      if (!el) return;
      el.addEventListener('input', evaluateDeliveryForm);
    });

    evaluateDeliveryForm();

    const backTo0 = document.getElementById('backTo0');
    if (backTo0) backTo0.onclick = () => { currentStep = 0; renderStep(); };

    const toStep2b = document.getElementById('toStep2b');
    if (toStep2b) {
      toStep2b.onclick = () => {
        const isValid = evaluateDeliveryForm();

        const nameVal = nameEl ? nameEl.value.trim() : "";
        const phoneVal = phoneEl ? phoneEl.value.trim() : "";
        const addrVal = addrEl ? addrEl.value.trim() : "";

        const phoneDigits = phoneVal.replace(/[^0-9]/g, '');
        const isNameValid = nameVal.length >= 3;
        const isPhoneValid = phoneDigits.length >= 8;
        const isAddrValid = addrVal.length >= 5;

        if (!isValid) {
          if (!isNameValid && nameEl) nameEl.focus();
          else if (!isPhoneValid && phoneEl) phoneEl.focus();
          else if (!isAddrValid && addrEl) addrEl.focus();
          return;
        }

        delivery.name = nameVal;
        delivery.phone = phoneVal;
        delivery.address = addrVal;
        delivery.city = cityEl ? cityEl.value : "Phnom Penh";

        currentStep = 2;
        renderStep();
      };
    }
  }

  else if (currentStep === 2) {
    stepArea.innerHTML = `
      <div class="step-panel" id="paymentPanel">
        <div class="pay-option ${payMethod === 'cod' ? 'selected' : ''}" data-val="cod">
          <div class="ic">💵</div><div class="txt"><strong>Cash on Delivery</strong><span>Pay when your order arrives</span></div>
          <input type="radio" name="pay" ${payMethod === 'cod' ? 'checked' : ''}>
        </div>
        <div class="pay-option ${payMethod === 'card' ? 'selected' : ''}" data-val="card">
          <div class="ic">💳</div><div class="txt"><strong>Credit / Debit Card</strong><span>Visa, Mastercard accepted</span></div>
          <input type="radio" name="pay" ${payMethod === 'card' ? 'checked' : ''}>
        </div>
        <div class="review-line total" style="margin-top:14px;"><span>Amount to Pay</span><span>${formatMoney(total)}</span></div>
      </div>
      <div class="modal-nav">
        <button type="button" class="btn-ghost" id="backTo1">Back</button>
        <button type="button" class="btn-next" id="placeOrderBtn">Place Order</button>
      </div>`;

    stepArea.querySelectorAll('.pay-option').forEach(el => {
      el.onclick = () => { payMethod = el.dataset.val; renderStep(); };
    });

    const backTo1 = document.getElementById('backTo1');
    if (backTo1) backTo1.onclick = () => { currentStep = 1; renderStep(); };

    const placeOrderBtn = document.getElementById('placeOrderBtn');
    if (placeOrderBtn) placeOrderBtn.onclick = processOrder;
  }
}

function processOrder() {
  const stepArea = document.getElementById('checkoutStepArea');
  const stepperEl = document.getElementById('stepper');
  if (!stepArea) return;

  stepArea.innerHTML = `<div class="processing"><div class="spinner"></div><p style="color:var(--color-ink-soft);font-weight:600;">Processing your order…</p></div>
    <div class="modal-nav"><span></span><span></span></div>`;

  if (stepperEl) {
    const dots = stepperEl.querySelectorAll('.step-dot-wrap');
    if (dots[2]) dots[2].classList.add('active');
  }

  setTimeout(() => {
    currentStep = 3;
    orderId = "CH-" + Math.floor(100000 + Math.random() * 899999);
    const { total } = getTotals();
    renderStepper();
    stepArea.innerHTML = `
      <div class="confirm-panel">
        <div class="confirm-icon">✓</div>
        <h3>Order Confirmed!</h3>
        <p>Thank you, ${delivery.name || 'friend'}. Your order has been placed successfully.</p>
        <div class="order-id">Order #${orderId}</div>
        <p style="font-size:.85rem;">Delivering to: ${delivery.address || '—'}, ${delivery.city}</p>
        <p style="font-size:.85rem;margin-bottom:20px;">Total paid: <strong style="color:var(--color-dark-green)">${formatMoney(total)}</strong></p>
        <button type="button" class="btn-primary" id="finishCheckoutBtn" style="max-width:260px;margin:0 auto;">Continue Shopping</button>
      </div>`;

    const finishBtn = document.getElementById('finishCheckoutBtn');
    if (finishBtn) finishBtn.onclick = () => {
      cart = [];
      renderCart();
      closeCheckout();
    };
  }, 1600);
}

function openCheckout() {
  const checkoutOverlay = document.getElementById('checkoutOverlay');
  if (!checkoutOverlay) return;
  currentStep = 0;
  checkoutOverlay.hidden = false;
  requestAnimationFrame(() => checkoutOverlay.classList.add('open'));
  renderStepper();
  renderStep();
}

function closeCheckout() {
  const checkoutOverlay = document.getElementById('checkoutOverlay');
  if (!checkoutOverlay) return;
  checkoutOverlay.classList.remove('open');
  setTimeout(() => checkoutOverlay.hidden = true, 350);
}

/* ---------------- DOM READY LISTENERS ---------------- */
document.addEventListener('DOMContentLoaded', function () {
  renderCart();

  const rowsEl = document.getElementById('cartRows');
  if (rowsEl) {
    rowsEl.addEventListener('click', function (e) {
      const row = e.target.closest('.cart-row');
      if (!row) return;
      const id = Number(row.dataset.id);
      const item = cart.find(i => i.id === id);
      if (!item) return;

      if (e.target.closest('.qty-plus')) {
        item.qty++;
        renderCart();
      } else if (e.target.closest('.qty-minus')) {
        item.qty = Math.max(1, item.qty - 1);
        renderCart();
      } else if (e.target.closest('.remove-btn')) {
        cart = cart.filter(i => i.id !== id);
        renderCart();
      }
    });
  }

  const clearCartBtn = document.getElementById('clearCartBtn');
  if (clearCartBtn) clearCartBtn.addEventListener('click', () => { cart = []; renderCart(); });

  const continueBtn = document.getElementById('continueShoppingBtn');
  if (continueBtn) continueBtn.addEventListener('click', () => { window.location.href = '../product/product.html'; });

  const emptyContinueBtn = document.getElementById('emptyContinueBtn');
  if (emptyContinueBtn) emptyContinueBtn.addEventListener('click', () => { window.location.href = '../product/product.html'; });

  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function (e) {
      e.preventDefault();
      openCheckout();
    });
  }

  const checkoutCloseBtn = document.getElementById('checkoutCloseBtn');
  if (checkoutCloseBtn) checkoutCloseBtn.addEventListener('click', closeCheckout);

  const checkoutOverlay = document.getElementById('checkoutOverlay');
  if (checkoutOverlay) checkoutOverlay.addEventListener('click', e => { if (e.target === checkoutOverlay) closeCheckout(); });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (checkoutOverlay && !checkoutOverlay.hidden) closeCheckout();
    }
  });
});
