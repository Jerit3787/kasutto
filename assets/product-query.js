console.log("collecting data");
var title = document.querySelector(".product-title h1").innerHTML;
var categoryRAW = document.querySelector(".product-title h2").innerHTML;

if (categoryRAW.includes("Men's")) {
    var category = categoryRAW.split("Men's ")[1];
    var gender = "Men";
} else if (categoryRAW.includes("Women's")) {
    var category = categoryRAW.split("Women's")[1];
    var gender = "Women";
} else {
    var category = categoryRAW;
    var gender = undefined;
}

var price = parseInt(document.querySelector('#price-container span').innerHTML.split("RM&nbsp;")[1]);
var sizesRAW = document.querySelectorAll('#size-selector fieldset .d-sm-flx.flx-dir-sm-c.flx-dir-lg-cr div div');
var sizes = [];
sizesRAW.forEach(size => {
    sizes.push(size.querySelector('label').innerHTML);
});

var coloursRAW = document.querySelectorAll('#colorway-picker-container a');
var colours = [];
var numOfColours = 0;
var formattedImages = [];

coloursRAW.forEach(colour => {
    let colourDiv = colour.querySelector('#colorway-chip-design-your-own');
    if (!colourDiv) {
        colour.click();
        var img = colour.querySelector('div img').getAttribute('src');
        var colourArray = colour.querySelector('div img').getAttribute('alt').split("/");
        colours.push({
            "img": img,
            "colour": colourArray
        });
        numOfColours++;
        pullImages();
        console.log(`${numOfColours} colours pulled`);
        sleep(5000); //5 seconds
    } else {
        console.log("Design your own colour ignored");
    }
});

if (numOfColours == 0) {
    console.log("no colour selection detected! pulling current colour instead");
    numOfColours++;
    pullImages();
    var img = formattedImages[0][0];
    var colourArray = document.querySelector('li[data-testid="product-description-color-description"]').innerHTML.split('Colour Shown:\x3C!-- --> \x3C!-- -->')[1].split("/");
    colours.push({
        "img": img,
        "colour": colourArray
    });
    console.log(`${numOfColours} colour(s) pulled`);
}

var ratingRAW = document.querySelector('div[data-testid="reviews-title-rating"]').getAttribute('title').split(" Stars")[0];

if (ratingRAW.includes("No")) {
    console.log("no rating detected! setting as 0")
    var rating = 0;
} else {
    var rating = parseInt(ratingRAW);
}

var numOfComment = parseInt(document.querySelector('summary span div h4').innerHTML.split("Reviews (")[1].split(")")[0]);

var description = document.querySelector('p[data-testid="product-description"]').innerHTML;

function pullImages() {
    var imagesRAW = document.querySelectorAll('#hero-image img');

    var images = [];

    imagesRAW.forEach(img => {
        images.push(img.getAttribute('src'));
    });

    formattedImages.push(images);
}

var json = {
    "title": title,
    "category": category,
    "gender": gender,
    "price": price,
    "sizes": sizes,
    "images": formattedImages,
    "numOfColours": numOfColours,
    "colours": colours,
    "rating": rating,
    "numOfComment": numOfComment,
    "description": description
}

console.log("collecting data completed!");
console.log(json);

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}