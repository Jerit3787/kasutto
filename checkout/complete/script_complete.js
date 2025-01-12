// script_complete.js

// Function to simulate progress indicator updates
document.addEventListener("DOMContentLoaded", () => {
    const progressIndicators = document.querySelectorAll(".progress-indicator");
    const progressLines = document.querySelectorAll(".progress-line");

    // Simulate progress completion
    progressIndicators.forEach((indicator, index) => {
        setTimeout(() => {
            indicator.classList.add("completed");
            if (progressLines[index]) {
                progressLines[index].classList.add("active");
            }
        }, index * 1000); // 1-second delay for each step
    });
});

// Function to handle order summary interactions
const updateOrderSummary = () => {
    const orderSummary = document.querySelector(".cart");
    if (orderSummary) {
        console.log("Order Summary Loaded");
    }
};

// Function to handle confirmation message animations
const animateConfirmationMessage = () => {
    const confirmationMessage = document.querySelector(".dashboard .left h5");
    if (confirmationMessage) {
        confirmationMessage.style.transition = "opacity 2s ease-in-out";
        confirmationMessage.style.opacity = 1;
    }
};

// Run animation after the page loads
document.addEventListener("DOMContentLoaded", () => {
    animateConfirmationMessage();
    updateOrderSummary();
});

// Helper function to format currency
const formatCurrency = (value) => {
    return `RM ${value.toFixed(2)}`;
};

// Update payment details dynamically (if needed)
document.addEventListener("DOMContentLoaded", () => {
    const subtotalElement = document.querySelector(".summary-item:nth-child(1) .text.bold");
    const totalElement = document.querySelector(".summary-item:nth-child(4) .text.bold");

    if (subtotalElement && totalElement) {
        const subtotal = parseFloat(subtotalElement.textContent.replace(/[^\d.-]/g, ""));
        const taxRate = 0.08; // 8% SST
        const total = subtotal + subtotal * taxRate;

        totalElement.textContent = formatCurrency(total);
    }
});
