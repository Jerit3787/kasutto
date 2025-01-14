import { getProducts, createCard, getProductsByCategory, getQueryParams, getProductsByColour, addQueryParams, loadProducts, compileAvailableSizes, getProductsBySize, compileAvailableColours, getProductsByColourWithIndex, loadProductsWithColour, getProductByMinPrice, getProductByMaxPrice, sortProductsByPrice, sortProductsByName, sortProductsByCategory, sortProductsByRating } from './utility.js';

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
    var button = document.getElementById('size-button')
    button.addEventListener('click', () => {
        toggleFilter('size-filter', button);
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
    var button = document.getElementById('colour-button')
    button.addEventListener('click', () => {
        toggleFilter('colour-filter', button);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const searchParams = new URLSearchParams(window.location.search);
    var hasQueryParams = searchParams.size === 0 ? false : true;
    var products = await getProducts();
    if (hasQueryParams) {
        loadForms(products);
        products = await filterProducts(products, searchParams);
        if (searchParams.has('category')) {
            var category = getQueryParams('category');
            document.getElementById(category.toLowerCase().replace(" ", "-").replace(" ", "-")).classList.add('active');
            document.getElementById('page-title').textContent = category;
        }
        if (searchParams.has('size')) {
            var size = getQueryParams('size');
            document.getElementById(size).classList.add('active');
            toggleFilter('size-filter', document.getElementById('size-button'));
        }
        if (searchParams.has('colour')) {
            var colour = getQueryParams('colour');
            document.getElementById(colour).classList.add('active');
            var productsWithColours = await getProductsByColourWithIndex(products, colour);
            toggleFilter('colour-filter', document.getElementById('colour-button'));
        }
        if (searchParams.has('price-min')) {
            var priceMin = getQueryParams('price-min');
            updatePriceMinValue(priceMin);
        }
        if (searchParams.has('price-max')) {
            var priceMax = getQueryParams('price-max');
            updatePriceMaxValue(priceMax);
        }
        if ((searchParams.has('price-min') && searchParams.has('price-max')) || (searchParams.has('price-min') && !searchParams.has('price-max'))) {
            toggleFilter('price-filter', document.getElementById('price-button'));
        }
        if (searchParams.has('sort')) {
            var sortType = getQueryParams('sort');
            document.getElementById('sort-products').value = sortType;
            products = await sortProducts(products, sortType);
        }
        if (searchParams.has('colour')) {
            loadProductsWithColour(products, productsWithColours);
        } else {
            loadProducts(products);
        }
    } else {
        loadProducts(products);
        loadForms(products);
    }
    loadCategoryButtons();
})

function loadForms(products) {
    var sizes = compileAvailableSizes(products).sort();
    var colours = compileAvailableColours(products).sort();
    loadSizes(sizes);
    loadColours(colours);
    loadPriceRangeSliders();
    loadSort();
    document.getElementById('clear-filters').addEventListener('click', () => {
        window.location.search = '';
    });
}

function toggleFilter(filterId, parent) {
    const filterContent = document.getElementById(filterId);
    if (filterContent.style.display === "none" || filterContent.style.display === "") {
        filterContent.style.display = "grid";
        parent.style.margin = "8px 0px";
        parent.querySelector('i').textContent = 'keyboard_arrow_up';
    } else {
        filterContent.style.display = "none";
        parent.style.margin = "0";
        parent.querySelector('i').textContent = 'keyboard_arrow_down';
    }
}

function loadSort() {
    var sortObj = document.getElementById('sort-products');
    sortObj.addEventListener('change', () => {
        addQueryParams([{ "name": 'sort', "value": sortObj.value }]);
    });
}

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

function sortProducts(products, sortType) {
    return new Promise((resolve, reject) => {
        switch (sortType) {
            case 'price':
                resolve(sortProductsByPrice(products));
                break;
            case 'rating':
                resolve(sortProductsByRating(products));
                break;
            case 'name':
                resolve(sortProductsByName(products));
                break;
            case 'category':
                resolve(sortProductsByCategory(products));
                break;
            default:
                break;
        }
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

    var button = document.getElementById('price-button')
    button.addEventListener('click', () => {
        toggleFilter('price-filter', button);
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