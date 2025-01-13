const API_PATH = `${window.location.origin}/api`

async function getProducts() {
    var jsonRAW = await fetch(`${API_PATH}/product/product.json`);
    console.log(jsonRAW.json());
    return JSON.parse(jsonRAW.json());
}

function createCard(titleStr, categoryStr, colorStr, priceStr, imgURL) {
    var card = document.createElement('div');
    var img = document.createElement('img');
    var title = document.createElement('p');
    var category = document.createElement('p');
    var color = document.createElement('p');
    var prices = document.createElement('p');

    card.classList.add("card");
    img.setAttribute("src", imgURL);
    img.setAttribute("alt", titleStr);
    title.classList.add("text bold");
    category.classList.add("text grey");
    color.classList.add("text grey");
    prices.classList.add("text bold");

    title.textContent = titleStr;
    category.textContent = categoryStr;
    color.textContent = colorStr;
    prices.textContent = priceStr;
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(category);
    card.appendChild(color);
    card.appendChild(prices);

    var catalog = document.getElementById("catalog");
    catalog.appendChild(card);
}

function loadCatalog(products) {
    products.forEach(product => {
        createCard(product.title,product.category, product.numOfColours, product.price, product.images[0][0]);
    });
}

document.addEventListener('DOMContentLoaded', async function() {
    var products = await getProducts();
    console.log(products);
    loadCatalog(products);
})