document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.querySelector('.cart-items');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Render Cart
    const renderCart = () => {
        cartContainer.innerHTML = cart.length
            ? cart.map((item, index) => createCartItem(item, index)).join('')
            : '<p>Your cart is empty!</p>';

        // Add event listeners after rendering
        document.querySelectorAll('.save').forEach((btn, i) =>
            btn.addEventListener('click', () => saveToFavorites(cart[i]))
        );
        document.querySelectorAll('.delete').forEach((btn, i) =>
            btn.addEventListener('click', () => deleteFromCart(i))
        );
        document.querySelectorAll('.increase').forEach((btn, i) =>
            btn.addEventListener('click', () => updateQuantity(i, 1))
        );
        document.querySelectorAll('.decrease').forEach((btn, i) =>
            btn.addEventListener('click', () => updateQuantity(i, -1))
        );
    };

    // Create Cart Item HTML
    const createCartItem = (item, index) => `
        <div class="cart-item" style="transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
            <img src="${item.image}" alt="${item.name}">
            <div>
                <p class="text bold">${item.name}</p>
                <p>${item.price} | <span class="text green">In stock</span></p>
                <div class="row">
                    <label for="size-${index}">Size:</label>
                    <select id="size-${index}" class="size-select">
                        <option value="${item.size}" selected>${item.size}</option>
                        <option value="UK 6">UK 6</option>
                        <option value="UK 7">UK 7</option>
                        <option value="UK 8">UK 8</option>
                        <option value="UK 9">UK 9</option>
                    </select>
                </div>
                <div class="row quantity-control">
                    <button class="decrease">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="increase">+</button>
                </div>
            </div>
            <div class="actions">
                <button class="save">❤️ Save</button>
                <button class="delete">🗑️ Delete</button>
            </div>
        </div>
    `;

    // Save to Favorites
    const saveToFavorites = (item) => {
        if (!favorites.some(fav => fav.name === item.name)) {
            favorites.push(item);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            alert(`${item.name} has been saved to your favorites!`);
        } else {
            alert(`${item.name} is already in your favorites.`);
        }
    };

    // Delete from Cart
    const deleteFromCart = (index) => {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    };

    // Update Quantity
    const updateQuantity = (index, delta) => {
        const newQuantity = cart[index].quantity + delta;
        if (newQuantity > 0) {
            cart[index].quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        } else {
            alert('Quantity cannot be less than 1.');
        }
    };

    // Initial Render
    renderCart();
});
