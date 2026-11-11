const products = [
    {
        name: "ქალის პერანგი",
        price: 65,
        category: "ტანსაცმელი",
        image: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=500"
    },
    {
        name: "კლასიკური კაბა",
        price: 120,
        category: "ტანსაცმელი",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500"
    },
    {
        name: "თეთრი ფეხსაცმელი",
        price: 150,
        category: "ფეხსაცმელი",
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500"
    },
    {
        name: "ქალის ჩანთა",
        price: 95,
        category: "აქსესუარები",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500"
    },
    {
        name: "სათვალე",
        price: 45,
        category: "აქსესუარები",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500"
    },
    {
        name: "სპორტული ფეხსაცმელი",
        price: 180,
        category: "ფეხსაცმელი",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    }
];

const productList = document.getElementById("product-list");
const cartCount = document.getElementById("cart-count");
const searchInput = document.getElementById("search");

let cart = 0;
function showProducts(productArray) {

    productList.innerHTML = "";

    if (productArray.length === 0) {
        productList.innerHTML = "<p>პროდუქტი ვერ მოიძებნა.</p>";
        return;
    }

    productArray.forEach(function(product) {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>ფასი: ${product.price} ₾</p>
            <button onclick="addToCart()">კალათაში დამატება</button>
        `;

        productList.appendChild(card);
    });
}
function addToCart() {

    cart++;

    cartCount.textContent = cart;

    alert("პროდუქტი დაემატა კალათაში!");
}
function filterProducts(category) {

    let filteredProducts;

    if (category === "ყველა") {
        filteredProducts = products;
    } else {
        filteredProducts = products.filter(function(product) {
            return product.category === category;
        });
    }
    showProducts(filteredProducts);
}
searchInput.addEventListener("input", function() {

    const searchText = searchInput.value.toLowerCase();

    const filteredProducts = products.filter(function(product) {
        return product.name.toLowerCase().includes(searchText);
    });

    showProducts(filteredProducts);
});
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    alert("მადლობა, " + name + "! თქვენი შეტყობინება მიღებულია.");
    contactForm.reset();
});
showProducts(products);
