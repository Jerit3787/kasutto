import { getProducts, createCard } from '../utility.js';

function loadCatalog(products) {
    products.forEach(product => {
        createCard(product.title, product.category, product.numOfColours, product.price, product.images[0][0]);
    });
}

document.addEventListener('DOMContentLoaded', async function () {
    getProducts().then((products) => {
        loadCatalog(products);
    })
})