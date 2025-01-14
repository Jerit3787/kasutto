import { getProducts, loadProducts, sortByRating } from "./utility.js"

document.addEventListener('DOMContentLoaded', () => {
    getProducts().then((products) => {
        var sortedProducts = sortByRating(products);
        loadProducts(sortedProducts);
    })
})