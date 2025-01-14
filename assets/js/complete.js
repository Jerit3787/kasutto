import { getProductsById, createPaymentCard, getProducts } from './utility.js';

document.addEventListener('DOMContentLoaded', () => {
    loadCart();
});

async function loadCart() {
    var cart = JSON.parse(localStorage.getItem('cart'));
    console.log(cart);
    loadData();
    createCart(cart)
}

function loadData() {
    var total = JSON.parse(localStorage.getItem('total-information'));
    var personal = JSON.parse(localStorage.getItem('personal-information'));
    var payment = JSON.parse(localStorage.getItem('payment-information'));


    document.getElementById('subtotal').textContent = total.subtotal;
    document.getElementById('discount').textContent = total.discount;
    document.getElementById('total').textContent = total.total;
    document.getElementById('email').innerHTML = `We've sent a confirmation email to <b>${personal.email}</b>`;
    document.getElementById('address').innerHTML = `Shipping Address<br>${personal.name}<br>${personal.address}<br>${personal.postcode}, ${personal.city}, ${personal.state},<br>${personal.country}`;
    document.getElementById('payment-method').innerHTML = `<b>${payment.paymentType}</b>`;

    createDeliveryDate();
    createOrderNumber();
    createTrackingNumber();
}

function createDeliveryDate() {
    var date = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    date.setDate(date.getDate() + 7);
    document.getElementById('delivery-date').textContent = `Expected Delivery: ${date.toLocaleDateString("en-US", options)}`;
}

function createOrderNumber() {
    var date = new Date();
    var orderNumber = Math.floor(Math.random() * 1000000000);
    document.getElementById('order-number').innerHTML = `Your order number is <b>x${orderNumber}</b>`;
}

function createTrackingNumber() {
    var trackingNumber = Math.floor(Math.random() * 1000000000);
    document.getElementById('tracking-number').innerHTML = `Tracking Number: MY${trackingNumber}`;
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