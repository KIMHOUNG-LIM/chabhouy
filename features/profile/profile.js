(() => {
    'use strict';

    /* ============================================================
       Reveal-on-scroll
       ============================================================ */
    const revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        revealEls.forEach((el) => io.observe(el));
    } else {
        revealEls.forEach((el) => el.classList.add('is-visible'));
    }

    /* ============================================================
       Toast
       ============================================================ */
    const toastEl = document.getElementById('toast');
    let toastTimer = null;
    function showToast(message, icon = 'bi bi-check-circle-fill') {
        if (!toastEl) return;
        toastEl.innerHTML = `<i class="${icon}"></i> ${message}`;
        toastEl.classList.add('is-visible');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toastEl.classList.remove('is-visible'), 3200);
    }

    /* ============================================================
       Modal Engine
       ============================================================ */
    let activeModal = null;
    let lastFocusedEl = null;

    function openModal(modal) {
        if (!modal) return;
        lastFocusedEl = document.activeElement;
        const overlay = document.getElementById('modal-overlay');
        if (overlay) {
            overlay.style.display = 'block';
            overlay.classList.add('is-visible');
        }
        modal.style.display = 'block';
        modal.classList.add('is-visible');
        activeModal = modal;
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modal) {
        if (!modal) return;
        const overlay = document.getElementById('modal-overlay');
        if (overlay) {
            overlay.classList.remove('is-visible');
            overlay.style.display = 'none';
        }
        modal.classList.remove('is-visible');
        modal.style.display = 'none';
        document.body.style.overflow = '';
        activeModal = null;
        if (lastFocusedEl) lastFocusedEl.focus();
    }

    const overlayEl = document.getElementById('modal-overlay');
    if (overlayEl) {
        overlayEl.addEventListener('click', () => { if (activeModal) closeModal(activeModal); });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && activeModal) closeModal(activeModal);
    });

    document.querySelectorAll('[data-close-modal]').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal(btn.closest('.modal'));
        });
    });

    /* ============================================================
       1. Manage Addresses State & Engine
       ============================================================ */
    let savedAddresses = [
        {
            id: 1,
            label: 'Home',
            lines: '#123, Street 271, Sangkat Boeung Tumpun, Khan Meanchey, Phnom Penh',
            phone: '+855 12 345 678',
            isDefault: true
        },
        {
            id: 2,
            label: 'Office',
            lines: '#45, Monivong Blvd, Sangkat Boeung Keng Kang 1, Phnom Penh',
            phone: '+855 98 765 432',
            isDefault: false
        },
        {
            id: 3,
            label: 'Condo',
            lines: '#88, Russian Blvd, Sangkat Kakab, Phnom Penh',
            phone: '+855 77 112 233',
            isDefault: false
        }
    ];

    function renderManageAddressList() {
        const container = document.getElementById('modal-address-list');
        if (!container) return;

        if (savedAddresses.length === 0) {
            container.innerHTML = '<p class="text-muted text-center my-3 fs-sm">No saved addresses. Add one below!</p>';
            return;
        }

        container.innerHTML = savedAddresses.map(addr => `
            <div class="p-3 border rounded-4 bg-white shadow-sm d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2 ${addr.isDefault ? 'border-success border-2' : ''}" data-addr-id="${addr.id}">
                <div>
                    <div class="d-flex align-items-center gap-2 mb-1">
                        <strong class="fs-sm fw-bold text-dark"><i class="bi bi-geo-alt-fill text-success"></i> ${addr.label}</strong>
                        ${addr.isDefault ? '<span class="badge bg-success text-white rounded-pill px-2 py-1 fs-xs">Default 🎉</span>' : ''}
                    </div>
                    <p class="mb-0 fs-xs text-muted text-start">${addr.lines}</p>
                    <p class="mb-0 fs-xs text-muted text-start mt-1"><i class="bi bi-telephone-fill me-1"></i>${addr.phone}</p>
                </div>
                <div class="d-flex align-items-center gap-2 align-self-end align-self-sm-center flex-shrink-0 text-nowrap">
                    ${!addr.isDefault ? `<button type="button" class="btn btn-xs btn-outline-success rounded-pill px-2 py-1 fs-xs fw-bold text-nowrap btn-set-default-addr" style="white-space: nowrap;" data-addr-id="${addr.id}">Set Default</button>` : ''}
                    <button type="button" class="btn btn-xs btn-outline-primary rounded-pill px-2 py-1 fs-xs fw-bold text-nowrap btn-edit-addr-item" style="white-space: nowrap;" data-addr-id="${addr.id}">Edit</button>
                    ${!addr.isDefault ? `<button type="button" class="btn btn-xs btn-outline-danger border-0 px-2 py-1 fs-xs btn-delete-addr-item" data-addr-id="${addr.id}"><i class="bi bi-trash3"></i></button>` : ''}
                </div>
            </div>
        `).join('');

        container.querySelectorAll('.btn-set-default-addr').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const id = parseInt(btn.getAttribute('data-addr-id'), 10);
                savedAddresses.forEach(a => { a.isDefault = (a.id === id); });
                renderManageAddressList();
            });
        });

        container.querySelectorAll('.btn-edit-addr-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const id = parseInt(btn.getAttribute('data-addr-id'), 10);
                const addr = savedAddresses.find(a => a.id === id);
                if (addr) {
                    document.getElementById('manage-addr-id').value = addr.id;
                    document.getElementById('manage-addr-label').value = addr.label;
                    document.getElementById('manage-addr-phone').value = addr.phone;
                    document.getElementById('manage-addr-lines').value = addr.lines;
                    document.getElementById('address-edit-title').innerHTML = `<i class="bi bi-pencil-square"></i> Edit "${addr.label}" Address`;
                    document.getElementById('address-edit-box').style.display = 'block';
                }
            });
        });

        container.querySelectorAll('.btn-delete-addr-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const id = parseInt(btn.getAttribute('data-addr-id'), 10);
                savedAddresses = savedAddresses.filter(a => a.id !== id);
                renderManageAddressList();
            });
        });
    }

    function syncMainDefaultAddress() {
        const defaultAddr = savedAddresses.find(a => a.isDefault) || savedAddresses[0];
        if (!defaultAddr) return;

        const labelEl = document.getElementById('display-addr-label');
        const linesEl = document.getElementById('display-addr-lines');
        const phoneEl = document.getElementById('display-addr-phone');

        if (labelEl) labelEl.textContent = defaultAddr.label;
        if (linesEl) linesEl.innerHTML = defaultAddr.lines;
        if (phoneEl) phoneEl.innerHTML = `<i class="fa-solid fa-phone"></i> ${defaultAddr.phone}`;
    }

    const btnShowAddAddr = document.getElementById('btn-show-add-addr');
    if (btnShowAddAddr) {
        btnShowAddAddr.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('manage-addr-id').value = '';
            document.getElementById('manage-addr-label').value = '';
            document.getElementById('manage-addr-phone').value = '';
            document.getElementById('manage-addr-lines').value = '';
            document.getElementById('address-edit-title').innerHTML = '<i class="bi bi-plus-circle"></i> Add New Address';
            document.getElementById('address-edit-box').style.display = 'block';
        });
    }

    const btnCancelAddrEdit = document.getElementById('btn-cancel-addr-edit');
    if (btnCancelAddrEdit) {
        btnCancelAddrEdit.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('address-edit-box').style.display = 'none';
        });
    }

    const formManageAddressItem = document.getElementById('form-manage-address-item');
    if (formManageAddressItem) {
        formManageAddressItem.addEventListener('submit', (e) => {
            e.preventDefault();
            const idVal = document.getElementById('manage-addr-id').value;
            const label = document.getElementById('manage-addr-label').value.trim();
            const phone = document.getElementById('manage-addr-phone').value.trim();
            const lines = document.getElementById('manage-addr-lines').value.trim();

            if (idVal) {
                const id = parseInt(idVal, 10);
                const addr = savedAddresses.find(a => a.id === id);
                if (addr) {
                    addr.label = label;
                    addr.phone = phone;
                    addr.lines = lines;
                }
            } else {
                savedAddresses.push({
                    id: Date.now(),
                    label: label || 'New Place',
                    phone: phone || '+855 12 345 678',
                    lines: lines || 'Phnom Penh, Cambodia',
                    isDefault: savedAddresses.length === 0
                });
            }

            document.getElementById('address-edit-box').style.display = 'none';
            renderManageAddressList();
            showToast('Address details saved!', 'bi bi-check-circle-fill');
        });
    }

    const btnSaveManageAddresses = document.getElementById('btn-save-manage-addresses');
    if (btnSaveManageAddresses) {
        btnSaveManageAddresses.addEventListener('click', () => {
            syncMainDefaultAddress();
            const defaultAddr = savedAddresses.find(a => a.isDefault);
            showToast(`Default delivery address updated to ${defaultAddr ? defaultAddr.label : 'Home'}! 🏡`, 'bi bi-geo-alt-fill');
        });
    }

    /* ============================================================
       2. Manage Payment Cards State & Engine
       ============================================================ */
    let savedCards = [
        { id: 1, type: 'VISA', number: 'VISA •••• 1234', expiry: '08/27', logoClass: 'payment-item__logo--visa', logoText: 'VISA' },
        { id: 2, type: 'ABA PAY', number: 'ABA PAY •••• 5678', expiry: '11/26', logoClass: 'payment-item__logo--aba', logoText: 'ABA' }
    ];

    function renderManageCardsList() {
        const container = document.getElementById('modal-cards-list');
        if (!container) return;

        if (savedCards.length === 0) {
            container.innerHTML = '<p class="text-muted text-center my-3 fs-sm">No saved payment cards. Add one below!</p>';
            return;
        }

        container.innerHTML = savedCards.map(card => `
            <div class="p-3 border rounded-4 bg-white shadow-sm d-flex justify-content-between align-items-center flex-wrap gap-2" data-card-id="${card.id}">
                <div class="d-flex align-items-center gap-2 flex-grow-1" style="min-width: 0;">
                    <span class="payment-item__logo ${card.logoClass} px-3 py-2 fw-bold rounded flex-shrink-0">${card.logoText}</span>
                    <div style="min-width: 0; word-break: break-word;">
                        <p class="mb-0 fw-bold fs-sm text-dark text-truncate">${card.number}</p>
                        <span class="text-muted fs-xs">Expires ${card.expiry}</span>
                    </div>
                </div>
                <button type="button" class="btn btn-sm btn-outline-danger border-0 btn-delete-card-item flex-shrink-0 ms-auto" data-card-id="${card.id}" title="Delete Card">
                    <i class="bi bi-trash3 fs-6"></i>
                </button>
            </div>
        `).join('');

        container.querySelectorAll('.btn-delete-card-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const cardId = parseInt(btn.getAttribute('data-card-id'), 10);
                savedCards = savedCards.filter(c => c.id !== cardId);
                renderManageCardsList();
            });
        });
    }

    function syncMainPaymentList() {
        const list = document.getElementById('payment-list');
        if (!list) return;

        if (savedCards.length === 0) {
            list.innerHTML = '<li class="text-muted fs-sm py-2">No payment methods saved yet.</li>';
            return;
        }

        list.innerHTML = savedCards.map(card => `
            <li class="payment-item">
                <span class="payment-item__logo ${card.logoClass}">${card.logoText}</span>
                <div class="payment-item__info">
                    <p>${card.number}</p>
                    <span>Expires ${card.expiry}</span>
                </div>
                <i class="fa-solid fa-chevron-right"></i>
            </li>
        `).join('');
    }

    const btnShowAddCard = document.getElementById('btn-show-add-card');
    if (btnShowAddCard) {
        btnShowAddCard.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('card-add-box').style.display = 'block';
        });
    }

    const btnCancelCardAdd = document.getElementById('btn-cancel-card-add');
    if (btnCancelCardAdd) {
        btnCancelCardAdd.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('card-add-box').style.display = 'none';
        });
    }

    const formManageCardAdd = document.getElementById('form-manage-card-add');
    if (formManageCardAdd) {
        formManageCardAdd.addEventListener('submit', (e) => {
            e.preventDefault();
            const type = document.getElementById('manage-card-type').value;
            const rawNumber = document.getElementById('manage-card-number').value.replace(/\D/g, '');
            const last4 = rawNumber.slice(-4) || '1234';
            const expiry = document.getElementById('manage-card-expiry').value.trim() || '12/28';

            const logoClass = type === 'VISA' ? 'payment-item__logo--visa' : (type === 'ABA PAY' ? 'payment-item__logo--aba' : 'payment-item__logo--visa');
            const logoText = type === 'ABA PAY' ? 'ABA' : type.slice(0, 4).toUpperCase();

            savedCards.push({
                id: Date.now(),
                type: type,
                number: `${type} •••• ${last4}`,
                expiry: expiry,
                logoClass: logoClass,
                logoText: logoText
            });

            document.getElementById('manage-card-number').value = '';
            document.getElementById('manage-card-expiry').value = '';
            document.getElementById('card-add-box').style.display = 'none';
            renderManageCardsList();
            showToast('New payment card added!', 'bi bi-credit-card-2-front-fill');
        });
    }

    const btnSaveManageCards = document.getElementById('btn-save-manage-cards');
    if (btnSaveManageCards) {
        btnSaveManageCards.addEventListener('click', () => {
            syncMainPaymentList();
            showToast('Payment methods saved successfully! 💳', 'bi bi-check-circle-fill');
        });
    }

    /* ============================================================
       3. Real-time Field Evaluation Engine for Personal Information
       ============================================================ */
    function evaluateFullname(val) {
        const evalEl = document.getElementById('eval-fullname');
        const inputEl = document.getElementById('input-edit-fullname');
        if (!evalEl || !inputEl) return false;

        const trimmed = val.trim();
        if (trimmed.length === 0) {
            evalEl.className = 'field-eval-msg fs-xs mt-1 text-start text-danger';
            evalEl.innerHTML = '<i class="bi bi-exclamation-circle-fill me-1"></i>Please enter your full name 🌿';
            inputEl.classList.add('border-danger');
            inputEl.classList.remove('border-success');
            return false;
        } else if (trimmed.length < 3) {
            evalEl.className = 'field-eval-msg fs-xs mt-1 text-start text-warning-emphasis';
            evalEl.innerHTML = '<i class="bi bi-info-circle-fill me-1"></i>Full name should be at least 3 characters long ✏️';
            inputEl.classList.add('border-danger');
            inputEl.classList.remove('border-success');
            return false;
        } else {
            evalEl.className = 'field-eval-msg fs-xs mt-1 text-start text-success';
            evalEl.innerHTML = '<i class="bi bi-check-circle-fill me-1"></i>Looks great! ✨';
            inputEl.classList.remove('border-danger');
            inputEl.classList.add('border-success');
            return true;
        }
    }

    function evaluateEmail(val) {
        const evalEl = document.getElementById('eval-email');
        const inputEl = document.getElementById('input-edit-email');
        if (!evalEl || !inputEl) return false;

        const trimmed = val.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (trimmed.length === 0) {
            evalEl.className = 'field-eval-msg fs-xs mt-1 text-start text-danger';
            evalEl.innerHTML = '<i class="bi bi-exclamation-circle-fill me-1"></i>Please enter your email address ✉️';
            inputEl.classList.add('border-danger');
            inputEl.classList.remove('border-success');
            return false;
        } else if (!emailRegex.test(trimmed)) {
            evalEl.className = 'field-eval-msg fs-xs mt-1 text-start text-warning-emphasis';
            evalEl.innerHTML = '<i class="bi bi-info-circle-fill me-1"></i>Please enter a valid email format (e.g. name@example.com) 📧';
            inputEl.classList.add('border-danger');
            inputEl.classList.remove('border-success');
            return false;
        } else {
            evalEl.className = 'field-eval-msg fs-xs mt-1 text-start text-success';
            evalEl.innerHTML = '<i class="bi bi-check-circle-fill me-1"></i>Valid email address! ✨';
            inputEl.classList.remove('border-danger');
            inputEl.classList.add('border-success');
            return true;
        }
    }

    function evaluatePhone(val) {
        const evalEl = document.getElementById('eval-phone');
        const inputEl = document.getElementById('input-edit-phone');
        if (!evalEl || !inputEl) return false;

        const trimmed = val.trim();
        const phoneDigits = trimmed.replace(/\D/g, '');
        if (trimmed.length === 0) {
            evalEl.className = 'field-eval-msg fs-xs mt-1 text-start text-danger';
            evalEl.innerHTML = '<i class="bi bi-exclamation-circle-fill me-1"></i>Please enter your phone number 📱';
            inputEl.classList.add('border-danger');
            inputEl.classList.remove('border-success');
            return false;
        } else if (phoneDigits.length < 8) {
            evalEl.className = 'field-eval-msg fs-xs mt-1 text-start text-warning-emphasis';
            evalEl.innerHTML = '<i class="bi bi-info-circle-fill me-1"></i>Phone number should be at least 8 digits 📞';
            inputEl.classList.add('border-danger');
            inputEl.classList.remove('border-success');
            return false;
        } else {
            evalEl.className = 'field-eval-msg fs-xs mt-1 text-start text-success';
            evalEl.innerHTML = '<i class="bi bi-check-circle-fill me-1"></i>Valid phone number! ✨';
            inputEl.classList.remove('border-danger');
            inputEl.classList.add('border-success');
            return true;
        }
    }

    function evaluateDob(val) {
        const evalEl = document.getElementById('eval-dob');
        const inputEl = document.getElementById('input-edit-dob');
        if (!evalEl || !inputEl) return false;

        const trimmed = val.trim();
        if (trimmed.length === 0) {
            evalEl.className = 'field-eval-msg fs-xs mt-1 text-start text-danger';
            evalEl.innerHTML = '<i class="bi bi-exclamation-circle-fill me-1"></i>Please enter your date of birth 📅';
            inputEl.classList.add('border-danger');
            inputEl.classList.remove('border-success');
            return false;
        } else if (trimmed.length < 4) {
            evalEl.className = 'field-eval-msg fs-xs mt-1 text-start text-warning-emphasis';
            evalEl.innerHTML = '<i class="bi bi-info-circle-fill me-1"></i>Please enter a valid birthdate (e.g. May 12, 1995) 🎂';
            inputEl.classList.add('border-danger');
            inputEl.classList.remove('border-success');
            return false;
        } else {
            evalEl.className = 'field-eval-msg fs-xs mt-1 text-start text-success';
            evalEl.innerHTML = '<i class="bi bi-check-circle-fill me-1"></i>Looks good! ✨';
            inputEl.classList.remove('border-danger');
            inputEl.classList.add('border-success');
            return true;
        }
    }

    function runAllPersonalEvaluations() {
        const inputFullname = document.getElementById('input-edit-fullname');
        const inputEmail = document.getElementById('input-edit-email');
        const inputPhone = document.getElementById('input-edit-phone');
        const inputDob = document.getElementById('input-edit-dob');

        const isNameValid = inputFullname ? evaluateFullname(inputFullname.value) : true;
        const isEmailValid = inputEmail ? evaluateEmail(inputEmail.value) : true;
        const isPhoneValid = inputPhone ? evaluatePhone(inputPhone.value) : true;
        const isDobValid = inputDob ? evaluateDob(inputDob.value) : true;

        return isNameValid && isEmailValid && isPhoneValid && isDobValid;
    }

    // Wire live input listeners for real-time field evaluation
    const inputEditFullname = document.getElementById('input-edit-fullname');
    const inputEditEmail = document.getElementById('input-edit-email');
    const inputEditPhone = document.getElementById('input-edit-phone');
    const inputEditDob = document.getElementById('input-edit-dob');

    if (inputEditFullname) inputEditFullname.addEventListener('input', (e) => evaluateFullname(e.target.value));
    if (inputEditEmail) inputEditEmail.addEventListener('input', (e) => evaluateEmail(e.target.value));
    if (inputEditPhone) inputEditPhone.addEventListener('input', (e) => evaluatePhone(e.target.value));
    if (inputEditDob) inputEditDob.addEventListener('input', (e) => evaluateDob(e.target.value));

    // Submit handler
    const formEditPersonal = document.getElementById('form-edit-personal');
    if (formEditPersonal) {
        formEditPersonal.addEventListener('submit', (e) => {
            e.preventDefault();

            // Run real-time evaluation across all fields
            const isAllValid = runAllPersonalEvaluations();
            if (!isAllValid) {
                showToast('Please fix the highlighted field evaluations! ✏️', 'bi bi-exclamation-triangle-fill');
                return;
            }

            const fullname = document.getElementById('input-edit-fullname').value.trim();
            const email = document.getElementById('input-edit-email').value.trim();
            const phone = document.getElementById('input-edit-phone').value.trim();
            const dob = document.getElementById('input-edit-dob').value.trim();
            const gender = document.getElementById('input-edit-gender').value;

            // Show Cute Evaluation & Success View inside modal
            const formView = document.getElementById('personal-edit-form-view');
            const successView = document.getElementById('personal-edit-success-view');

            if (formView && successView) {
                formView.style.display = 'none';
                successView.style.display = 'block';
            }

            // Update page live
            if (document.getElementById('info-fullname')) document.getElementById('info-fullname').textContent = fullname;
            if (document.getElementById('info-email')) document.getElementById('info-email').textContent = email;
            if (document.getElementById('info-phone')) document.getElementById('info-phone').textContent = phone;
            if (document.getElementById('info-dob')) document.getElementById('info-dob').textContent = dob;
            if (document.getElementById('info-gender')) document.getElementById('info-gender').textContent = gender;

            if (document.getElementById('display-name')) document.getElementById('display-name').textContent = fullname;
            if (document.getElementById('display-email')) document.getElementById('display-email').textContent = email;
            if (document.getElementById('display-phone-hero')) document.getElementById('display-phone-hero').textContent = phone;

            // 2-second pause for cute evaluation animation, then close
            setTimeout(() => {
                const modalPersonal = document.getElementById('modal-edit-personal');
                closeModal(modalPersonal);

                if (formView && successView) {
                    formView.style.display = 'block';
                    successView.style.display = 'none';
                }

                showToast('Personal information updated successfully! ✨', 'bi bi-person-check-fill');
            }, 2000);
        });
    }

    /* ============================================================
       Order Details Data & Handler
       ============================================================ */
    const ORDERS = {
        CHB12345: {
            id: 'CHB12345',
            date: 'May 20, 2025',
            status: 'Delivered',
            statusClass: 'bg-success text-white',
            address: 'Home — #123, Street 271, Sangkat Boeung Tumpun, Phnom Penh',
            phone: '+855 12 345 678',
            subtotal: '$26.00',
            deliveryFee: 'Free',
            total: '$28.50',
            items: [
                { name: 'Organic Fresh Vegetable Basket', qty: 2, price: '$12.50', icon: 'bi bi-egg-fried' },
                { name: 'Fresh Green Apple Pack', qty: 1, price: '$3.50', icon: 'bi bi-apple' }
            ]
        },
        CHB12344: {
            id: 'CHB12344',
            date: 'May 15, 2025',
            status: 'Processing',
            statusClass: 'bg-warning text-dark',
            address: 'Home — #123, Street 271, Sangkat Boeung Tumpun, Phnom Penh',
            phone: '+855 12 345 678',
            subtotal: '$14.30',
            deliveryFee: '$2.50',
            total: '$16.80',
            items: [
                { name: 'Crunchy Nut Snack Pack', qty: 1, price: '$12.50', icon: 'bi bi-bag-check' },
                { name: 'Dried Fruit Mix', qty: 1, price: '$4.30', icon: 'bi bi-box-seam' }
            ]
        },
        CHB12343: {
            id: 'CHB12343',
            date: 'May 10, 2025',
            status: 'Cancelled',
            statusClass: 'bg-secondary text-white',
            address: 'Home — #123, Street 271, Sangkat Boeung Tumpun, Phnom Penh',
            phone: '+855 12 345 678',
            subtotal: '$12.30',
            deliveryFee: 'Free',
            total: '$12.30',
            items: [
                { name: 'Ramen Noodle Value Pack', qty: 1, price: '$12.30', icon: 'bi bi-cup-hot' }
            ]
        }
    };

    function openOrderDetailsModal(orderId) {
        const order = ORDERS[orderId] || ORDERS['CHB12345'];
        const modalOrder = document.getElementById('modal-order-details');
        if (!modalOrder) return;

        const idEl = document.getElementById('order-modal-id');
        const dateEl = document.getElementById('order-modal-date');
        const statusEl = document.getElementById('order-modal-status');

        if (idEl) idEl.textContent = `Order #${order.id}`;
        if (dateEl) dateEl.textContent = `Placed on ${order.date}`;
        if (statusEl) {
            statusEl.textContent = order.status;
            statusEl.className = `badge ${order.statusClass} px-3 py-2 fs-xs rounded-pill`;
        }

        const itemsContainer = document.getElementById('order-modal-items');
        if (itemsContainer) {
            itemsContainer.innerHTML = order.items.map(item => `
                <div class="d-flex align-items-center justify-content-between p-2 bg-white rounded border">
                    <div class="d-flex align-items-center gap-2">
                        <span class="p-2 bg-light rounded text-success fs-5"><i class="${item.icon}"></i></span>
                        <div>
                            <p class="mb-0 fw-bold fs-sm">${item.name}</p>
                            <span class="text-muted fs-xs">Qty: ${item.qty}</span>
                        </div>
                    </div>
                    <strong class="fs-sm">${item.price}</strong>
                </div>
            `).join('');
        }

        const addressEl = document.getElementById('order-modal-address');
        const phoneEl = document.getElementById('order-modal-phone');
        const subtotalEl = document.getElementById('order-modal-subtotal');
        const deliveryEl = document.getElementById('order-modal-delivery');
        const totalEl = document.getElementById('order-modal-total');

        if (addressEl) addressEl.textContent = order.address;
        if (phoneEl) phoneEl.textContent = order.phone;
        if (subtotalEl) subtotalEl.textContent = order.subtotal;
        if (deliveryEl) deliveryEl.textContent = order.deliveryFee;
        if (totalEl) totalEl.textContent = order.total;

        openModal(modalOrder);
    }

    /* ============================================================
       Global Click Listener
       ============================================================ */
    document.addEventListener('click', (e) => {
        // 1. Referral Modal
        const inviteBtn = e.target.closest('#btn-invite-now, .refer-card__btn');
        if (inviteBtn) {
            e.preventDefault();
            const modalInvite = document.getElementById('modal-invite');
            if (modalInvite) {
                const copyBtn = document.getElementById('btn-copy-referral');
                if (copyBtn) {
                    copyBtn.innerHTML = '<i class="bi bi-copy"></i> Copy';
                    copyBtn.className = 'btn btn-outline-success fs-sm fw-bold px-3';
                }
                openModal(modalInvite);
            }
            return;
        }

        // 2. View Rewards Modal
        const rewardsBtn = e.target.closest('#btn-view-rewards, .rewards-card__btn');
        if (rewardsBtn) {
            e.preventDefault();
            const modalRewards = document.getElementById('modal-rewards');
            if (modalRewards) {
                openModal(modalRewards);
            }
            return;
        }

        // 3. Manage Addresses Modal
        const manageAddressBtn = e.target.closest('#link-manage-addresses');
        if (manageAddressBtn) {
            e.preventDefault();
            const modalManageAddr = document.getElementById('modal-manage-addresses');
            if (modalManageAddr) {
                renderManageAddressList();
                openModal(modalManageAddr);
            }
            return;
        }

        // 4. Manage Cards Modal
        const manageCardsBtn = e.target.closest('#link-manage-cards');
        if (manageCardsBtn) {
            e.preventDefault();
            const modalManageCards = document.getElementById('modal-manage-cards');
            if (modalManageCards) {
                renderManageCardsList();
                openModal(modalManageCards);
            }
            return;
        }

        // 5. Edit Personal Information Modal
        const editPersonalBtn = e.target.closest('#btn-edit-personal');
        if (editPersonalBtn) {
            e.preventDefault();
            const modalPersonal = document.getElementById('modal-edit-personal');
            if (modalPersonal) {
                const nameEl = document.getElementById('info-fullname');
                const emailEl = document.getElementById('info-email');
                const phoneEl = document.getElementById('info-phone');
                const dobEl = document.getElementById('info-dob');
                const genderEl = document.getElementById('info-gender');

                if (nameEl) document.getElementById('input-edit-fullname').value = nameEl.textContent.trim();
                if (emailEl) document.getElementById('input-edit-email').value = emailEl.textContent.trim();
                if (phoneEl) document.getElementById('input-edit-phone').value = phoneEl.textContent.trim();
                if (dobEl) document.getElementById('input-edit-dob').value = dobEl.textContent.trim();
                if (genderEl) document.getElementById('input-edit-gender').value = genderEl.textContent.trim();

                // Run initial evaluation for modal fields
                runAllPersonalEvaluations();

                openModal(modalPersonal);
            }
            return;
        }

        // 6. Order Item Click (Recent Orders)
        const orderItem = e.target.closest('.order-item');
        if (orderItem) {
            e.preventDefault();
            const orderId = orderItem.getAttribute('data-order') || 'CHB12345';
            openOrderDetailsModal(orderId);
            return;
        }
    });

    // Copy Referral Link Handler
    const btnCopyReferral = document.getElementById('btn-copy-referral');
    if (btnCopyReferral) {
        btnCopyReferral.addEventListener('click', () => {
            const input = document.getElementById('referral-link-input');
            if (input) {
                input.select();
                navigator.clipboard.writeText(input.value).then(() => {
                    btnCopyReferral.innerHTML = '<i class="bi bi-check-lg"></i> Copied!';
                    btnCopyReferral.className = 'btn btn-success fs-sm fw-bold px-3';
                    showToast('Referral link copied to clipboard!', 'bi bi-clipboard-check-fill');
                }).catch(() => {
                    document.execCommand('copy');
                    btnCopyReferral.innerHTML = '<i class="bi bi-check-lg"></i> Copied!';
                    showToast('Referral link copied to clipboard!', 'bi bi-clipboard-check-fill');
                });
            }
        });
    }

    // Done Copy Handler
    const btnDoneCopy = document.getElementById('btn-done-copy');
    if (btnDoneCopy) {
        btnDoneCopy.addEventListener('click', () => {
            showToast('Referral link ready to share!', 'bi bi-share-fill');
        });
    }

    /* ============================================================
       Avatar edit feedback
       ============================================================ */
    const avatarEditBtn = document.querySelector('.profile-hero__avatar-edit');
    if (avatarEditBtn) {
        avatarEditBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showToast('Photo upload is coming soon.', 'bi bi-camera');
        });
    }
})();
