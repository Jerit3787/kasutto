const API_PATH = "${window.location.origin}/api";

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

export function createCard(titleStr, categoryStr, colorStr, priceStr, imgURL) {
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

function getProducts() {
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