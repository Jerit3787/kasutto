const API_PATH = `${window.location.origin}/api`;
const TEXT_BOLD = "text bold";
const TEXT_GREY = "text grey";
const COLOURS = ["Black", "Blue", "Brown", "Green", "Orange", "Pink", "Purple", "Red", "White", "Yellow"];

export function fetchJSON(jsonFilePath) {
    return new Promise((resolve, reject) => {
        fetch(jsonFilePath)
            .then(response => response.json())
            .then(jsonData => {
                console.log(jsonData);
                resolve(jsonData);
            })
            .catch(error => {
                console.error('Error fetching JSON:', error);
                reject(error);
            })
    })
}

export function createCard(product) {
    var card = document.createElement('div');
    var img = document.createElement('img');
    var title = document.createElement('p');
    var category = document.createElement('p');
    var color = document.createElement('p');
    var prices = document.createElement('p');

    card.classList.add("card");
    img.setAttribute("src", product.images[0][0]);
    img.setAttribute("alt", product.title);
    title.setAttribute("class", TEXT_BOLD);
    category.setAttribute("class", TEXT_GREY);
    color.setAttribute("class", TEXT_GREY);
    prices.setAttribute("class", TEXT_BOLD);

    title.textContent = product.title;
    category.textContent = `${product.category} Shoes`;
    color.textContent = `${product.numOfColours} Colours`;
    prices.textContent = `RM ${product.price.toFixed(2)}`;
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(category);
    card.appendChild(color);
    card.appendChild(prices);

    card.addEventListener('click', () => {
        window.location.href = `../product/?id=${product.id}&color=0`;
    });

    var catalog = document.getElementById("catalog");
    catalog.appendChild(card);
}

export function createCardWithColour(product, colorIndex) {
    var card = document.createElement('div');
    var img = document.createElement('img');
    var title = document.createElement('p');
    var category = document.createElement('p');
    var color = document.createElement('p');
    var prices = document.createElement('p');

    card.classList.add("card");
    console.log(product);
    console.log(colorIndex);
    img.setAttribute("src", product.images[colorIndex][0]);
    img.setAttribute("alt", product.title);
    title.setAttribute("class", TEXT_BOLD);
    category.setAttribute("class", TEXT_GREY);
    color.setAttribute("class", TEXT_GREY);
    prices.setAttribute("class", TEXT_BOLD);

    title.textContent = product.title;
    category.textContent = `${product.category} Shoes`;
    color.textContent = `${product.numOfColours} Colours`;
    prices.textContent = `RM ${product.price.toFixed(2)}`;
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(category);
    card.appendChild(color);
    card.appendChild(prices);

    card.addEventListener('click', () => {
        window.location.href = `../product/?id=${product.id}&color=${colorIndex}`;
    });

    var catalog = document.getElementById("catalog");
    catalog.appendChild(card);
}

export function getProducts() {
    return new Promise((resolve, reject) => {
        fetchJSON(`${API_PATH}/product/product.json`)
            .then(jsonData => {
                resolve(jsonData);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                reject(error);
            })
    });
}

export function getProductsByCategory(products, category) {
    return new Promise((resolve, reject) => {
        resolve(products.filter(product => product.category === category));
    })
}

export function getProductsBySize(products, size) {
    return new Promise((resolve, reject) => {
        resolve(products.filter(product => product.sizes.includes(size)));
    })
}

export function getProductsById(products, id) {
    return new Promise((resolve, reject) => {
        resolve(products.filter(product => product.id === parseInt(id)));
    });
}

export function getProductByMinPrice(products, minPrice) {
    return new Promise((resolve, reject) => {
        resolve(products.filter(product => product.price >= minPrice));
    });
}

export function getProductByMaxPrice(products, maxPrice) {
    return new Promise((resolve, reject) => {
        resolve(products.filter(product => product.price <= maxPrice));
    });
}

export function getProductsByColour(products, colour) {
    return new Promise((resolve, reject) => {
        const lowerCaseColour = colour.toLowerCase();
        resolve(products.filter(product =>
            product.colours.some(colourObj =>
                colourObj.colour.some(c =>
                    c.toLowerCase().includes(lowerCaseColour)
                )
            )
        ));
    });
}

export function getProductsByColourWithIndex(products, colour) {
    return new Promise((resolve, reject) => {
        const lowerCaseColour = colour.toLowerCase();
        const filteredProducts = products.map(product => {
            const matchingColourIndex = product.colours.findIndex(colourObj =>
                colourObj.colour.some(c =>
                    c.toLowerCase().includes(lowerCaseColour)
                )
            );
            if (matchingColourIndex !== -1) {
                return {
                    ...product,
                    matchingColourIndex
                };
            }
            return null;
        }).filter(product => product !== null);
        resolve(filteredProducts);
    });
}

export function getQueryParams(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

export function addQueryParams(params) {
    const urlParams = new URLSearchParams(window.location.search);
    params.forEach(item => {
        urlParams.set(item.name, item.value);
    });
    window.location.search = urlParams.toString();
}

export function loadProducts(products) {
    products.forEach(product => {
        createCard(product);
    });
}

export function loadProductsWithColour(products, colorIndexArray) {
    products.forEach(product => {
        const colorIndexObj = colorIndexArray.find(item => item.id === product.id);
        const colorIndex = colorIndexObj ? colorIndexObj.matchingColourIndex : 0;
        createCardWithColour(product, colorIndex);
    });
}

export function sortProductsByRating(products) {
    return products.sort((a, b) => b.rating - a.rating);
}

export function compileAvailableSizes(products) {
    const sizes = [];

    products.forEach(product => {
        product.sizes.forEach(size => {
            if (!sizes.includes(size)) {
                sizes.push(size);
            }
        });
    });
    console.log(sizes);
    return sizes;
}

export function compileAvailableColours() {
    return COLOURS;
}

export function sortProductsByPrice(products) {
    return products.sort((a, b) => a.price - b.price);
}

export function sortProductsByName(products) {
    return products.sort((a, b) => a.title.localeCompare(b.title));
}

export function sortProductsByCategory(products) {
    return products.sort((a, b) => a.category.localeCompare(b.category));
}

export function createCartCard(productItem, indexImg, size, quantityValue, indexCart) {
    var item = document.createElement('div');
    var product = document.createElement('div');
    var img = document.createElement('img');
    var productDetails = document.createElement('div');
    var title = document.createElement('p');
    var price = document.createElement('p');
    var productOptions = document.createElement('div');
    var select = document.createElement('select');
    var quantityInput = document.createElement('div');
    var minusButton = document.createElement('button');
    var quantity = document.createElement('input');
    var plusButton = document.createElement('button');
    var itemOptions = document.createElement('div');
    var favouriteButton = document.createElement('a');
    var removeButton = document.createElement('a');

    console.log(productItem);

    img.setAttribute('src', productItem.images[indexImg][0]);
    img.setAttribute('alt', productItem.title);
    img.setAttribute('class', 'product-image');
    title.textContent = `${productItem.title} - ${productItem.category} Shoes`;
    price.textContent = `RM ${productItem.price.toFixed(2)} | In stock`;
    select.setAttribute('id', 'size');
    select.setAttribute('name', 'size');
    select.setAttribute('title', 'Size');
    select.setAttribute('class', 'size-input');

    productItem.sizes.forEach(size => {
        var option = document.createElement('option');
        option.setAttribute('value', size);
        option.textContent = size;
        select.appendChild(option);
    });

    select.value = size;
    quantityInput.setAttribute('class', 'quantity-input');
    minusButton.setAttribute('class', 'quantity-button');
    plusButton.setAttribute('class', 'quantity-button');
    plusButton.textContent = '+';
    minusButton.textContent = '-';
    quantity.setAttribute('type', 'text');
    quantity.setAttribute('value', quantityValue);
    itemOptions.setAttribute('class', 'item-options');
    favouriteButton.setAttribute('class', 'option-button');
    favouriteButton.innerHTML = '<i class="material-symbols-outlined">favorite</i> Save';
    removeButton.setAttribute('class', 'option-button');
    removeButton.innerHTML = '<i class="material-symbols-outlined">delete</i> Remove';
    item.setAttribute('class', 'item');
    product.setAttribute('class', 'product');
    productDetails.setAttribute('class', 'product-details');
    productOptions.setAttribute('class', 'product-options');

    removeButton.addEventListener('click', () => {
        removeCartItem(indexCart);
    });

    select.setAttribute('id', `select-${indexCart}`);
    quantity.setAttribute('id', `quantity-${indexCart}`);

    plusButton.addEventListener('click', () => {
        quantity.value = parseInt(quantity.value) + 1;
        updateCart(indexCart);
    });

    minusButton.addEventListener('click', () => {
        if (parseInt(quantity.value) > 1) {
            quantity.value = parseInt(quantity.value) - 1;
            updateCart(indexCart);
        }
    });

    select.addEventListener('change', () => {
        updateCart(indexCart);
    });

    itemOptions.appendChild(favouriteButton);
    itemOptions.appendChild(removeButton);
    quantityInput.appendChild(minusButton);
    quantityInput.appendChild(quantity);
    quantityInput.appendChild(plusButton);
    productOptions.appendChild(select);
    productOptions.appendChild(quantityInput);
    productDetails.appendChild(title);
    productDetails.appendChild(price);
    productDetails.appendChild(productOptions);
    product.appendChild(img);
    product.appendChild(productDetails);
    item.appendChild(product);
    item.appendChild(itemOptions);

    document.querySelector('.cart').appendChild(item);
}

export function updateCart(indexBefore) {
    var cart = JSON.parse(localStorage.getItem('cart'));
    var old = cart[indexBefore];
    cart.splice(indexBefore, 1);
    old.size = document.querySelector(`#select-${indexBefore}`).value;
    old.quantity = document.getElementById(`quantity-${indexBefore}`).value;
    cart.splice(indexBefore, 0, old);
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.reload();
}

export function removeCartItem(index) {
    var cart = JSON.parse(localStorage.getItem('cart'));
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.reload();
}