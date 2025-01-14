import { getProducts, loadProducts, sortProductsByRating } from "./utility.js"

document.addEventListener('DOMContentLoaded', () => {
    getProducts().then((products) => {
        var sortedProducts = sortProductsByRating(products);
        loadProducts(sortedProducts);
    })
})