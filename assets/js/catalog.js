import { getProducts, createCard, getCategoryProducts } from './utility.js';

function loadCatalog(products) {
    products.forEach(product => {
        createCard(product);
    });
}

function checkQueryParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams;
}

function addQueryParams(name, value) {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set(name, value);
    window.location.search = urlParams.toString();
}

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
    var queryParams = checkQueryParams();
    var hasQueryParams = queryParams.size == 0 ? false : true;
    if (hasQueryParams) {
        var category = queryParams.get('category');
        console.log(category.toLowerCase().replace(" ", "-"))
        document.getElementById(category.toLowerCase().replace(" ", "-").replace(" ", "-")).classList.add('active');
        document.getElementById('page-title').textContent = category;
        getCategoryProducts(category).then((products) => {
            loadCatalog(products);
        });
    } else {
        getProducts().then((products) => {
            loadCatalog(products);
        })
    }
    loadCategoryButtons();
})