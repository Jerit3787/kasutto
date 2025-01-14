import { getProducts, getProductsById, createCheckoutCard } from './utility.js';

document.addEventListener('DOMContentLoaded', () => {
    var cart = JSON.parse(localStorage.getItem('cart'));
    loadCart(cart);
    formFunction();
});

async function loadCart() {
    var cart = JSON.parse(localStorage.getItem('cart'));
    console.log(cart);
    createCart(cart);
}

function createCart(cart) {
    return new Promise((resolve, reject) => {
        var total = 0;
        cart.forEach(async (item, index) => {
            var products = await getProducts();
            var productData = await getProductsById(products, item.id);
            console.log(productData);
            createCheckoutCard(productData[0], parseInt(item.color), item.size, item.quantity, index);
            console.log(productData[0].price);
            total += productData[0].price * item.quantity;
            updateTotal(total);
        });
        resolve(total);
    })
}

function updateTotal(total) {
    document.getElementById('total').textContent = `RM ${total.toFixed(2)}`;
    document.getElementById('subtotal').textContent = `RM ${total.toFixed(2)}`;
}

function saveData() {
    var data = {
        "name": document.getElementById('name').value,
        "email": document.getElementById('email').value,
        "phone": `${document.getElementById('country-code').value}${document.getElementById('phone-number').value}`,
        "address": document.getElementById('address').value,
        "city": document.getElementById('city').value,
        "state": document.getElementById('state').value,
        "postcode": document.getElementById('postcode').value,
        "country": document.getElementById('country').value
    }
    localStorage.setItem('personal-information', JSON.stringify(data));

    var payment = {
        "subtotal": document.getElementById('subtotal').textContent,
        "discount": document.getElementById('discount').textContent,
        "total": document.getElementById('total').textContent
    }

    localStorage.setItem('total-information', JSON.stringify(payment));
}

function formFunction() {
    // Select all buttons in the shipping method section
    const shippingButtons = document.querySelectorAll('.form-button.fixed');

    // Add a click event listener to each button
    shippingButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove 'active' class from all buttons
            shippingButtons.forEach(btn => btn.classList.remove('active'));

            // Add 'active' class to the clicked button
            button.classList.add('active');
        });
    });

    // Handle form validations
    const form = document.querySelector(".form");
    const requiredFields = form.querySelectorAll("input[placeholder][type='text'], input[placeholder][type='email']");
    const paynowButton = document.querySelector("#pay-now");

    paynowButton.addEventListener("click", (e) => {
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
            e.preventDefault();
            alert("Please fill in all required fields.");
        } else {
            saveData();
            window.location.href = "./payment/"
        }
    });

    // Promo code handling
    const promoInput = document.querySelector("input[placeholder='Enter promo code']");
    const applyPromoButton = document.querySelector(".text.blue.bold.hover");

    applyPromoButton.addEventListener("click", () => {
        const promoCode = promoInput.value.trim();
        if (promoCode === "DISCOUNT10") {
            alert("Promo code applied! 10% discount added.");
            const subtotalElement = document.querySelector("#subtotal");
            const totalElement = document.querySelector("#total");
            const discountElement = document.querySelector("#discount");

            let subtotal = parseFloat(subtotalElement.textContent.replace(/[^\d.-]/g, ""));
            discountElement.textContent = `- RM ${(subtotal * 0.1).toFixed(2)}`;
            subtotal = subtotal * 0.9; // 10% discount
            totalElement.textContent = `RM ${subtotal.toFixed(2)}`;
        } else {
            alert("Invalid promo code.");
        }
    });
}