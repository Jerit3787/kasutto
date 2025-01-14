import { getProducts, createCard, getCategoryProducts, getQueryParams, addQueryParams, loadProducts } from './utility.js';

function loadCategoryButtons() {
    var buttons = document.querySelectorAll('.filter-item');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            var category = button.querySelector('p').textContent;
            addQueryParams('category', category);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    var category = getQueryParams('category');
    var hasQueryParams = !category ? false : true;
    if (hasQueryParams) {
        console.log(category.toLowerCase().replace(" ", "-"))
        document.getElementById(category.toLowerCase().replace(" ", "-").replace(" ", "-")).classList.add('active');
        document.getElementById('page-title').textContent = category;
        getCategoryProducts(category).then((products) => {
            loadCatalog(products);
        });
    } else {
        getProducts().then((products) => {
            loadProducts(products);
        })
    }
    loadCategoryButtons();
})