// script_payment.js

// Function to toggle active state of payment method buttons
const paymentButtons = document.querySelectorAll('.form-button');
paymentButtons.forEach(button => {
    button.addEventListener('click', () => {
        paymentButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

// Validate email input
const emailInput = document.querySelector('input[type="email"]');
emailInput.addEventListener('input', () => {
    if (emailInput.validity.typeMismatch) {
        emailInput.setCustomValidity('Please enter a valid email address.');
    } else {
        emailInput.setCustomValidity('');
    }
});

// Format card expiry date
const expiryInput = document.querySelector('input[placeholder="MM/YY"]');
expiryInput.addEventListener('input', (event) => {
    const value = event.target.value.replace(/[^0-9]/g, '');
    if (value.length > 2) {
        event.target.value = value.substring(0, 2) + '/' + value.substring(2, 4);
    } else {
        event.target.value = value;
    }
});

// Restrict CVC/CCV input to 3-4 digits
const cvcInput = document.querySelector('input[placeholder="CVC/CCV"]');
cvcInput.addEventListener('input', () => {
    cvcInput.value = cvcInput.value.replace(/[^0-9]/g, '').substring(0, 4);
});

// Ensure card number input only allows numbers
const cardNumberInput = document.querySelector('input[placeholder="Enter card number"]');
cardNumberInput.addEventListener('input', () => {
    cardNumberInput.value = cardNumberInput.value.replace(/[^0-9]/g, '');
});

// Handle form submission (for demonstration purposes)
const checkoutButton = document.querySelector('.button.primary');
checkoutButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default form submission
    alert('Payment processing...'); // Placeholder action
});
