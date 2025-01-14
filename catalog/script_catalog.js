// script_catalog.js

// Initialize product data


// Reference DOM elements
const catalog = document.querySelector(".cards.catalog");
const filterItems = document.querySelectorAll(".filter-item");
const sortDropdown = document.querySelector("select[name='sort']");
const searchBox = document.querySelector(".search-box input");

// Function to render products
function renderProducts(filteredProducts) {
    catalog.innerHTML = ""; // Clear catalog
    filteredProducts.forEach((product) => {
        const productCard = `
            <div class="card">
                <img src="${product.image}" alt="Product Image">
                <p class="text bold">${product.name}</p>
                <p class="text grey">${product.description}</p>
                <p class="text grey">${product.colors} Colours</p>
                <p class="text bold">RM ${product.price.toFixed(2)}</p>
            </div>
        `;
        catalog.innerHTML += productCard;
    });
}

// Filter products by type
filterItems.forEach((item) => {
    item.addEventListener("click", () => {
        const filterType = item.querySelector("p").textContent;
        const filteredProducts = products.filter(
            (product) => product.type === filterType
        );
        renderProducts(filteredProducts);
    });
});

// Sort products
sortDropdown.addEventListener("change", (e) => {
    const sortValue = e.target.value;
    let sortedProducts = [...products];

    if (sortValue === "Name") {
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortValue === "Price") {
        sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortValue === "Type") {
        sortedProducts.sort((a, b) => a.type.localeCompare(b.type));
    }

    renderProducts(sortedProducts);
});

// Search products
searchBox.addEventListener("input", (e) => {
    const searchText = e.target.value.toLowerCase();
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchText)
    );
    renderProducts(filteredProducts);
});

// Initial render
renderProducts(products);