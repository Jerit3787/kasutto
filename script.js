document.addEventListener('DOMContentLoaded', function () {
    const card = document.querySelector('.card');

    // Add hover animation on mouse enter
    card.addEventListener('mouseenter', function () {
        card.classList.add('hovered');
    });

    // Remove hover animation on mouse leave
    card.addEventListener('mouseleave', function () {
        card.classList.remove('hovered');
    });
});

// Simulated shopping cart
let cart = [];

// Function to add product to the cart
function addToCart(productName, productPrice) {
    const product = { name: productName, price: productPrice };
    cart.push(product);

    // Display success message
    showToast(`${productName} has been added to your cart!`);
    console.log(cart); // Debug: Log current cart contents
}

// Function to display a toast message
function showToast(message) {
    // Create a toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;

    // Style the toast
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.padding = '10px 20px';
    toast.style.backgroundColor = '#333';
    toast.style.color = '#fff';
    toast.style.borderRadius = '5px';
    toast.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.3)';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';

    // Add the toast to the body
    document.body.appendChild(toast);

    // Make it visible
    setTimeout(() => {
        toast.style.opacity = '1';
    }, 100);

    // Remove the toast after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Attach event listeners to the cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');

    cards.forEach((card) => {
        card.addEventListener('click', () => {
            const productName = card.querySelector('.text.bold').textContent;
            const productPrice = card.querySelector('.text.bold:last-of-type').textContent;

            addToCart(productName, productPrice);
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-box input');
    const cards = document.querySelectorAll('.card');

    // Search functionality
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();

        cards.forEach((card) => {
            const productName = card.querySelector('.text.bold').textContent.toLowerCase();

            if (productName.includes(query)) {
                card.style.display = ''; // Show card
            } else {
                card.style.display = 'none'; // Hide card
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const mainImage = document.querySelector('.main-product');
    const thumbnails = document.querySelectorAll('.image-item img');
    const sizes = document.querySelectorAll('.size');
    const colors = document.querySelectorAll('.colour');
    const addToCartButton = document.querySelector('.button.primary');

    let selectedSize = null;
    let selectedColor = null;

    // Image Preview
    thumbnails.forEach((thumbnail) => {
        thumbnail.addEventListener('click', () => {
            // Update main image
            mainImage.src = thumbnail.src;

            // Highlight active thumbnail
            thumbnails.forEach((img) => img.parentElement.classList.remove('active'));
            thumbnail.parentElement.classList.add('active');
        });
    });

    // Size Selection
    sizes.forEach((size) => {
        size.addEventListener('click', () => {
            // Remove active class from all sizes
            sizes.forEach((s) => s.classList.remove('active'));

            // Add active class to the selected size
            size.classList.add('active');
            selectedSize = size.textContent.trim();
        });
    });

    // Color Selection
    colors.forEach((color) => {
        color.addEventListener('click', () => {
            // Remove active class from all colors
            colors.forEach((c) => c.classList.remove('active'));

            // Add active class to the selected color
            color.classList.add('active');
            selectedColor = color.querySelector('.circle').style.backgroundColor;
        });
    });

    // Add to Cart
    addToCartButton.addEventListener('click', () => {
        const productName = document.querySelector('h1').textContent;
        const productPrice = document.querySelector('.button.secondary').textContent.trim();

        if (!selectedSize || !selectedColor) {
            alert('Please select a size and color before adding to cart.');
            return;
        }

        const cartItem = {
            name: productName,
            price: productPrice,
            size: selectedSize,
            color: selectedColor,
        };

        console.log('Product added to cart:', cartItem);
        alert(`${productName} has been added to your cart!`);
    });
});





