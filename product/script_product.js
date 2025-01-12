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
        const productName = document.querySelector('h1').textContent.trim();
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
            image: mainImage.src,
        };

        // Retrieve existing cart from localStorage or initialize a new one
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Add the new item to the cart
        cart.push(cartItem);

        // Save the updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Show confirmation
        alert(`${productName} has been added to your cart!`);
    });
});