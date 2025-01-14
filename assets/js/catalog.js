import { getProducts, createCard, getProductsByCategory, getQueryParams, getProductsByColour, addQueryParams, loadProducts, compileAvailableSizes, getProductsBySize, compileAvailableColours, getProductsByColourWithIndex, loadProductsWithColour, getProductByMinPrice, getProductByMaxPrice } from './utility.js';

function loadCategoryButtons() {
    var buttons = document.querySelectorAll('.filter-item');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            var category = button.querySelector('p').textContent;
            addQueryParams([{ "name": 'category', "value": category }]);
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
            addQueryParams([{ "name": 'size', "value": size }]);
        });

        document.getElementById('size-filter').appendChild(div).appendChild(p);
    });
}

function loadColours(colours) {
    colours.forEach((colour, index) => {
        var div = document.createElement('div');
        var p = document.createElement('p');

        div.setAttribute('class', 'size');
        p.textContent = colour;
        div.setAttribute('id', colour);

        div.addEventListener('click', () => {
            try {
                document.querySelector('.sizes.active').classList.remove('active');
            } catch (error) {
                console.log(error);
            }
            div.classList.add('active');
            addQueryParams([{ "name": 'colour', "value": colour }]);
        });

        document.getElementById('colour-filter').appendChild(div).appendChild(p);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const searchParams = new URLSearchParams(window.location.search);
    var hasQueryParams = searchParams.size === 0 ? false : true;
    var products = await getProducts();
    if (hasQueryParams) {
        var sizes = compileAvailableSizes(products).sort();
        var colours = compileAvailableColours(products).sort();
        loadSizes(sizes);
        loadColours(colours);
        loadPriceRangeSliders();
        products = await filterProducts(products, searchParams);
        if (searchParams.has('category')) {
            var category = getQueryParams('category');
            document.getElementById(category.toLowerCase().replace(" ", "-").replace(" ", "-")).classList.add('active');
            document.getElementById('page-title').textContent = category;
        }
        if (searchParams.has('size')) {
            var size = getQueryParams('size');
            document.getElementById(size).classList.add('active');
        }
        if (searchParams.has('colour')) {
            var colour = getQueryParams('colour');
            document.getElementById(colour).classList.add('active');
            var productsWithColours = await getProductsByColourWithIndex(products, colour);
        }
        if (searchParams.has('price-min')) {
            var priceMin = getQueryParams('price-min');
            updatePriceMinValue(priceMin);
        }
        if (searchParams.has('price-max')) {
            var priceMax = getQueryParams('price-max');
            updatePriceMaxValue(priceMax);
        }
        if (searchParams.has('colour')) {
            loadProductsWithColour(products, productsWithColours);
        } else {
            loadProducts(products);
        }
    } else {
        loadProducts(products);
        var sizes = compileAvailableSizes(products).sort();
        var colours = compileAvailableColours(products).sort();
        loadSizes(sizes);
        loadColours(colours);
        loadPriceRangeSliders();
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
                case 'colour':
                    products = await getProductsByColour(products, value);
                    break;
                case 'price-min':
                    products = await getProductByMinPrice(products, value);
                    break;
                case 'price-max':
                    products = await getProductByMaxPrice(products, value);
                    break;
                default:
                    console.log('Invalid query parameter:', key);
                    break;
            }
        }
        console.log(products);
        resolve(products);
    })
}

function loadPriceRangeSliders() {
    var priceMinRange = document.getElementById('price-min');
    var priceMaxRange = document.getElementById('price-max');

    priceMinRange.addEventListener('input', () => {
        updatePriceMinValue(priceMinRange.value);
    });

    priceMaxRange.addEventListener('input', () => {
        updatePriceMaxValue(priceMaxRange.value);
    });

    updatePriceMaxValue(priceMaxRange.value);
    updatePriceMinValue(priceMinRange.value);

    var applyButton = document.getElementById('price-filter-button');
    applyButton.addEventListener('click', () => {
        addQueryParams([{ "name": 'price-min', "value": priceMinRange.value }, { "name": 'price-max', "value": priceMaxRange.value }]);
    });
}

//helper functions for price filtering
function updatePriceMinValue(value) {
    document.getElementById('price-min-value').textContent = `RM ${value}`;
    updatePriceMinFormValue(value);
}

function updatePriceMinFormValue(value) {
    document.getElementById('price-min').value = value;
}

function updatePriceMaxFormValue(value) {
    document.getElementById('price-max').value = value;
}

function updatePriceMaxValue(value) {
    document.getElementById('price-max-value').textContent = `RM ${value}`;
    updatePriceMaxFormValue(value);
}