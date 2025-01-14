// script_complete.js

document.addEventListener("DOMContentLoaded", () => {

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


    // Handle progress indicator
    const progressIndicators = document.querySelectorAll(".progress-indicator");
    const progressLines = document.querySelectorAll(".progress-line");

    progressIndicators.forEach((indicator, index) => {
        indicator.addEventListener("click", () => {
            progressIndicators.forEach((item, i) => {
                if (i <= index) {
                    item.classList.add("active");
                    if (progressLines[i]) progressLines[i].classList.add("active");
                } else {
                    item.classList.remove("active");
                    if (progressLines[i]) progressLines[i].classList.remove("active");
                }
            });
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
            const subtotalElement = document.querySelector(".summary-item:nth-child(1) .text.bold");
            const totalElement = document.querySelector(".summary-item:nth-child(4) .text.bold");

            let subtotal = parseFloat(subtotalElement.textContent.replace(/[^\d.-]/g, ""));
            subtotal = subtotal * 0.9; // 10% discount

            subtotalElement.textContent = `RM ${subtotal.toFixed(2)}`;
            const total = subtotal + subtotal * 0.08; // Adding SST
            totalElement.textContent = `RM ${total.toFixed(2)}`;
        } else {
            alert("Invalid promo code.");
        }
    });

    // Dynamic SST calculation
    const calculateTotal = () => {
        const subtotalElement = document.querySelector(".summary-item:nth-child(1) .text.bold");
        const totalElement = document.querySelector(".summary-item:nth-child(4) .text.bold");

        if (subtotalElement && totalElement) {
            const subtotal = parseFloat(subtotalElement.textContent.replace(/[^\d.-]/g, ""));
            const total = subtotal + subtotal * 0.08; // 8% SST
            totalElement.textContent = `RM ${total.toFixed(2)}`;
        }
    };

    calculateTotal();
});
