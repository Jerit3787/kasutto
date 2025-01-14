import { getProductsById, getQueryParams } from "./utility.js";

document.addEventListener('DOMContentLoaded', () => {
    var id = getQueryParams('id');
    getProductsById(id).then((product) => {
        loadProduct(product);
    });
});

function loadProduct(product) {
    console.log(product);
    document.getElementById('directory-category').textContent = `${product.category} Shoes`;
    document.getElementById('title').textContent = product.title;
    document.getElementById('category').textContent = `${product.category} Shoes`;
    document.getElementById('rating-text').textContent = product.rating.toFixed(1);
    document.getElementById('comment-text').textContent = `${product.numOfComment} comments`;
    product.sizes.forEach(size => {
        var div = document.createElement('div');
        var p = document.createElement('p');

        div.setAttribute('class', 'size');
        p.textContent = size;

        document.getElementById('sizes').appendChild(div).appendChild(p);
    });

    console.log(product.colours);

    var int = 0;
    var colorNum = getQueryParams('color') ? getQueryParams('color') : 0;

    product.colours.forEach(colour => {
        var div = document.createElement('div');
        var img = document.createElement('img');
        var colourText = "";

        colour.colour.forEach(color => {
            colourText += "/" + color;
        });

        if (int === parseInt(colorNum)) {
            div.setAttribute('class', 'colour active');
        } else {
            div.setAttribute('class', 'colour');
        }
        img.setAttribute('src', colour.img);
        img.setAttribute('alt', colourText);

        document.getElementById('colours').appendChild(div).appendChild(img);
        int++;
    });

    document.querySelector('.main-product').src = product.images[colorNum][0];

    var int = 0;

    product.images[colorNum].forEach(image => {
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
                div.classList.add('active');
                document.querySelector('.image-item.active').classList.remove('active');
            });

            document.querySelector('.images').appendChild(div).appendChild(img);
            int++;
        }
    });
}