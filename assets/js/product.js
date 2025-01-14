import { getProducts, getProductsById, getQueryParams } from "./utility.js";

document.addEventListener('DOMContentLoaded', async () => {
    var id = getQueryParams('id');
    var products = await getProducts();
    var product = await getProductsById(products, id);
    loadProduct(product);
});

function loadProduct(product) {
    console.log(product);
    document.getElementById('directory-category').textContent = `${product.category} Shoes`;
    document.getElementById('title').textContent = product.title;
    document.getElementById('category').textContent = `${product.category} Shoes`;
    document.getElementById('comment-text').textContent = `${product.numOfComment} comments`;
    product.sizes.forEach(size => {
        var div = document.createElement('div');
        var p = document.createElement('p');

        div.setAttribute('class', 'size');
        p.textContent = size;

        div.addEventListener('click', () => {
            try {
                document.querySelector('.size.active').classList.remove('active');
            } catch (error) {
                console.log(error);
            }
            div.classList.add('active');
        });

        document.getElementById('sizes').appendChild(div).appendChild(p);
    });

    console.log(product.colours);

    var colorNum = getQueryParams('color') ? getQueryParams('color') : 0;

    product.colours.forEach((colour, index) => {
        var mainProduct = product;
        console.log(mainProduct);
        var div = document.createElement('div');
        var img = document.createElement('img');
        var colourText = "";

        colour.colour.forEach(color => {
            colourText += "/" + color;
        });

        if (index === parseInt(colorNum)) {
            div.setAttribute('class', 'colour active');
        } else {
            div.setAttribute('class', 'colour');
        }
        img.setAttribute('src', colour.img);
        img.setAttribute('alt', colourText);

        div.addEventListener('click', () => {
            console.log(mainProduct.images[index]);
            document.querySelector('.main-product').src = mainProduct.images[index][0];
            document.querySelector('.colour.active').classList.remove('active');
            div.classList.add('active');
            loadProductImages(mainProduct, index);
        });

        document.getElementById('colours').appendChild(div).appendChild(img);
    });

    document.getElementById('description').textContent = product.description;

    loadProductImages(product, colorNum);

    updateStarRating(product.rating);

    document.querySelector('#product-price').textContent = `RM ${product.price.toFixed(2)}`;
}

function loadProductImages(product, index) {
    document.querySelector('.images').innerHTML = '';
    document.querySelector('.main-product').src = product.images[index][0];

    product.images[index].forEach((image, int) => {
        if (int < 8) {
            var div = document.createElement('div');
            var img = document.createElement('img');
            if (int === 0) {
                div.setAttribute('class', 'image-item active');
            } else {
                div.setAttribute('class', 'image-item');
            }
            img.setAttribute('src', image);

            div.addEventListener('click', () => {
                document.querySelector('.main-product').src = image;
                document.querySelector('.image-item.active').classList.remove('active');
                div.classList.add('active');
            });

            document.querySelector('.images').appendChild(div).appendChild(img);
        }
    });
}

function updateStarRating(rating) {
    const starContainer = document.getElementById('star-container');
    const ratingText = document.createElement('p');
    starContainer.innerHTML = ''; // Clear existing stars

    for (let i = 0; i < 5; i++) {
        const star = document.createElement('i');

        if (i < Math.floor(rating)) {
            star.textContent = 'star';
            star.classList.add('material-symbols-outlined', 'filled', 'text', 'yellow');
        } else if (i < rating) {
            star.textContent = 'star_half';
            star.classList.add('material-symbols-outlined', 'text', 'yellow');
        } else {
            star.textContent = 'star_outline';
            star.classList.add('material-symbols-outlined', 'text', 'yellow');
        }

        starContainer.appendChild(star);
    }

    // Set the rating text
    ratingText.textContent = rating.toFixed(1);
    ratingText.setAttribute('class', 'text icon after no-margin');
    starContainer.appendChild(ratingText);
}