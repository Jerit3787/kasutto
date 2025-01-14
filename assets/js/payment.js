import { getProductsById, createPaymentCard, getProducts } from './utility.js';

document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    additionalFunction();
});

async function loadCart() {
    var cart = JSON.parse(localStorage.getItem('cart'));
    console.log(cart);
    createCart(cart)
    loadData();
}

function loadData() {
    var total = JSON.parse(localStorage.getItem('total-information'));

    document.getElementById('subtotal').textContent = total.subtotal;
    document.getElementById('discount').textContent = total.discount;
    document.getElementById('total').textContent = total.total;
}

function saveData() {
    var data = {
        "paymentType": document.querySelector('.form-button.active').textContent,
        "email": document.getElementById('email').value,
        "cardNumber": document.getElementById('card-number').value,
        "expiry": document.getElementById('card-expiry').value,
        "cvc": document.getElementById('card-secret').value,
        "name": document.getElementById('card-name').value,
        "billingAddress": document.getElementById('billing-address').value
    }

    localStorage.setItem('payment-information', JSON.stringify(data));
}

function createCart(cart) {
    return new Promise((resolve, reject) => {
        var total = 0;
        cart.forEach(async (item, index) => {
            var products = await getProducts();
            var productData = await getProductsById(products, item.id);
            console.log(productData);
            createPaymentCard(productData[0], parseInt(item.color), item.size, item.quantity, index);
            console.log(productData[0].price);
            total += productData[0].price * item.quantity;
        });
        resolve(total);
    })
}

function additionalFunction() {
    // Function to toggle active state of payment method buttons
    const paymentButtons = document.querySelectorAll('.form-button');
    paymentButtons.forEach(button => {
        button.addEventListener('click', () => {
            paymentButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            if (button.textContent.includes('Credit')) {
                document.querySelector('#form-credit-card').style.display = 'block';
            } else {
                document.querySelector('#form-credit-card').style.display = 'none';
            }
        });
    });

    // Handle form validations
    const form = document.querySelector(".form");
    const requiredFields = form.querySelectorAll("input[placeholder][type='text'], input[placeholder][type='email']");
    const checkoutButton = document.querySelector('.button.primary');

    // Validate email input
    const emailInput = document.querySelector('input[type="email"]');
    emailInput.addEventListener('input', () => {
        if (emailInput.validity.typeMismatch) {
            emailInput.setCustomValidity('Please enter a valid email address.');
            emailInput.setAttribute("class", "error");
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


    // Handle form submission)
    checkoutButton.addEventListener('click', (event) => {
        if (document.querySelector('.form-button.active').textContent.includes('Credit')) {
            let valid = true;
            requiredFields.forEach((field) => {
                if (!field.value.trim()) {
                    field.classList.add("error");
                    valid = false;
                } else {
                    field.classList.remove("error");
                }
            });
            if (!valid) {
                event.preventDefault();
                alert("Please fill in all required fields.");
            } else {
                saveData();
                alert('Payment processing...'); // Placeholder action
                window.location.href = "../complete/"
            }
        } else {
            alert('Payment processing...'); // Placeholder action
            saveData();
            window.location.href = "../complete/"
        }
    });
}