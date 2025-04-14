document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbar = document.querySelector('.navbar');
    
    mobileMenuBtn.addEventListener('click', function() {
        navbar.classList.toggle('active');
    });

    // Auth Modal
    const authModal = document.getElementById('auth-modal');
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const closeModal = document.querySelector('.close-modal');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const authForms = document.querySelectorAll('.auth-form');

    // Show modal when login/signup buttons are clicked
    [loginBtn, signupBtn].forEach(btn => {
        btn.addEventListener('click', function() {
            authModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    closeModal.addEventListener('click', function() {
        authModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === authModal) {
            authModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Tab switching in auth modal
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab
            tabBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding form
            authForms.forEach(form => form.style.display = 'none');
            document.getElementById(`${tabId}-form`).style.display = 'block';
        });
    });

    // Add to cart functionality
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    const cartCount = document.getElementById('cart-count');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // Update cart count on page load
    updateCartCount();

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            
            // Check if product already in cart
            const existingItem = cartItems.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cartItems.push({
                    id: productId,
                    quantity: 1
                });
            }
            
            // Save to localStorage
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            
            // Update cart count
            updateCartCount();
            
            // Show feedback
            alert('Product added to cart!');
        });
    });

    function updateCartCount() {
        const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

    // Quantity adjusters in cart
    const quantityBtns = document.querySelectorAll('.quantity-btn');
    
    quantityBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            let value = parseInt(input.value);
            
            if (this.classList.contains('minus') && value > 1) {
                input.value = value - 1;
            } else if (this.classList.contains('plus')) {
                input.value = value + 1;
            }
            
            // Update cart total (in a real app, you would update localStorage here)
            updateCartTotal();
        });
    });

    // Remove item from cart
    const removeItemBtns = document.querySelectorAll('.remove-item');
    
    removeItemBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const cartItem = this.closest('.cart-item');
            const productId = cartItem.getAttribute('data-id');
            
            // Remove item from cartItems array
            cartItems = cartItems.filter(item => item.id !== productId);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            
            // Remove item from DOM
            cartItem.remove();
            
            // Update cart count and total
            updateCartCount();
            updateCartTotal();
        });
    });

    function updateCartTotal() {
        const subtotal = cartItems.reduce((total, item) => {
            // Assuming each item has a price stored in localStorage or fetched from a database
            const price = parseFloat(item.price || 0); // Replace with actual price logic
            return total + price * item.quantity;
        }, 0);
        const tax = subtotal * 0.08; // Example tax rate of 8%
        const total = subtotal + tax;
        
        document.querySelector('.summary-row.total span:last-child').textContent = `$${total.toFixed(2)}`;
    }

    // Initialize deals scroll
    const dealsScroll = document.querySelector('.deals-scroll');
    if (dealsScroll) {
        dealsScroll.scrollLeft = 0;
    }
});