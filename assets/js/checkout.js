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

    form.addEventListener("submit", (e) => {
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