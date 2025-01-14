import { getProductsById, createCartCard, getProducts } from './utility.js';

document.addEventListener('DOMContentLoaded', () => {
    loadCart();
});

async function loadCart() {
    var cart = JSON.parse(localStorage.getItem('cart'));
    console.log(cart);

    createCart(cart)
}

function updateTotal(total) {
    document.getElementById('total').textContent = `RM ${total.toFixed(2)}`;
    document.getElementById('subtotal').textContent = `RM ${total.toFixed(2)}`;
}

function createCart(cart) {
    return new Promise((resolve, reject) => {
        var total = 0;
        cart.forEach(async (item, index) => {
            var products = await getProducts();
            var productData = await getProductsById(products, item.id);
            console.log(productData);
            createCartCard(productData[0], parseInt(item.color), item.size, item.quantity, index);
            console.log(productData[0].price);
            total += productData[0].price * item.quantity;
            updateTotal(total);
        });
        resolve(total);
    })
}