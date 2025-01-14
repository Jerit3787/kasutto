const API_PATH = `${window.location.origin}/api`;
const TEXT_BOLD = "text bold";
const TEXT_GREY = "text grey";

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

export function getCategoryProducts(category) {
    return new Promise((resolve, reject) => {
        getProducts().then((products) => {
            resolve(products.filter(product => product.category === category));
        });
    })
}