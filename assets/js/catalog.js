import { getProducts, createCard, getProductsByCategory, getQueryParams, addQueryParams, loadProducts, compileAvailableSizes, getProductsBySize } from './utility.js';

function loadCategoryButtons() {
    var buttons = document.querySelectorAll('.filter-item');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            var category = button.querySelector('p').textContent;
            addQueryParams('category', category);
        });
    });
}

function loadSizes(sizes) {
    sizes.forEach(size => {
        var div = document.createElement('div');
        var p = document.createElement('p');

        div.setAttribute('class', 'size');
        p.textContent = size;
        div.setAttribute('id', size);

        div.addEventListener('click', () => {
            try {
                document.querySelector('.size.active').classList.remove('active');
            } catch (error) {
                console.log(error);
            }
            div.classList.add('active');
            addQueryParams('size', size);
        });

        document.getElementById('size-filter').appendChild(div).appendChild(p);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    var category = getQueryParams('category');
    var size = getQueryParams('size');
    var hasQueryParams = !category ? false : true;
    var products = await getProducts();
    if (hasQueryParams) {
        document.getElementById(category.toLowerCase().replace(" ", "-").replace(" ", "-")).classList.add('active');
        document.getElementById('page-title').textContent = category;
        products = await filterProducts(products);
        var sizes = compileAvailableSizes(products).sort();
        loadSizes(sizes);
        loadProducts(products);
        document.getElementById(size).classList.add('active');
    } else {
        loadProducts(products);
        var sizes = compileAvailableSizes(products).sort();
        loadSizes(sizes);
    }
    loadCategoryButtons();
})

function filterProducts(products) {
    return new Promise(async (resolve, reject) => {
        const searchParams = new URLSearchParams(window.location.search);
        for (const [key, value] of searchParams.entries()) {
            switch (key) {
                case 'category':
                    products = await getProductsByCategory(products, value);
                    break;
                case 'size':
                    products = await getProductsBySize(products, value);
                    break;
                default:
                    console.log('Invalid query parameter:', key);
                    break;
            }
        }
        resolve(products);
    })
}