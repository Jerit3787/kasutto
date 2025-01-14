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
    const searchParams = new URLSearchParams(window.location.search);
    var hasQueryParams = searchParams.size === 0 ? false : true;
    var products = await getProducts();
    if (hasQueryParams) {
        document.getElementById(category.toLowerCase().replace(" ", "-").replace(" ", "-")).classList.add('active');
        document.getElementById('page-title').textContent = category;
        var sizes = compileAvailableSizes(products).sort();
        loadSizes(sizes);
        products = await filterProducts(products, searchParams);
        loadProducts(products);
        try {
            console.log("Test")
            document.getElementById(size).classList.add('active');
        } catch (error) {
            console.log('Invalid size query parameter:', size);
        }
    } else {
        loadProducts(products);
        var sizes = compileAvailableSizes(products).sort();
        loadSizes(sizes);
    }
    loadCategoryButtons();
})

function filterProducts(products, searchParams) {
    return new Promise(async (resolve, reject) => {
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