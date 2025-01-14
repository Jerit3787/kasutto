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
        resolve(products.filter(product => product.id === parseInt(id))[0]);
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

export function sortByRating(products) {
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