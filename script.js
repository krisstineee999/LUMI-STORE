
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
const cartButton = document.getElementById("cart-button");
const cartBox = document.getElementById("cart-box");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const closeCart = document.getElementById("close-cart");

let cart = [];

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
            <button class="add-button">კალათაში დამატება</button>
        `;

        card.querySelector(".add-button").addEventListener("click", function() {
            addToCart(product);
        });

        productList.appendChild(card);
    });
}

function addToCart(product) {
    const existingProduct = cart.find(function(item) {
        return item.name === product.name;
    });

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
}

function updateCart() {
    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    cart.forEach(function(item) {
        total += item.price * item.quantity;
        count += item.quantity;

        const itemElement = document.createElement("div");
        itemElement.className = "cart-item";

        itemElement.innerHTML = `
            <p><strong>${item.name}</strong></p>
            <p>${item.price} ₾ × ${item.quantity}</p>
            <button class="minus-button">−</button>
            <button class="plus-button">+</button>
            <button class="remove-button">წაშლა</button>
        `;

        itemElement.querySelector(".minus-button").addEventListener("click", function() {
            changeQuantity(item.name, -1);
        });

        itemElement.querySelector(".plus-button").addEventListener("click", function() {
            changeQuantity(item.name, 1);
        });

        itemElement.querySelector(".remove-button").addEventListener("click", function() {
            removeFromCart(item.name);
        });

        cartItems.appendChild(itemElement);
    });

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>კალათა ცარიელია.</p>";
    }

    cartCount.textContent = count;
    cartTotal.textContent = total;
}

function changeQuantity(productName, amount) {
    const item = cart.find(function(product) {
        return product.name === productName;
    });

    if (item) {
        item.quantity += amount;

        if (item.quantity <= 0) {
            removeFromCart(productName);
        } else {
            updateCart();
        }
    }
}

function removeFromCart(productName) {
    cart = cart.filter(function(item) {
        return item.name !== productName;
    });

    updateCart();
}

cartButton.addEventListener("click", function() {
    cartBox.classList.toggle("active");
});

closeCart.addEventListener("click", function() {
    cartBox.classList.remove("active");
});

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

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", function() {
    navMenu.classList.toggle("active");
});

const navLinks = navMenu.querySelectorAll("a");

navLinks.forEach(function(link) {
    link.addEventListener("click", function() {
        navMenu.classList.remove("active");
    });
});

const slides = document.querySelectorAll(".hero-slide");
const nextSlide = document.getElementById("next-slide");
const prevSlide = document.getElementById("prev-slide");
const sliderDots = document.getElementById("slider-dots");

let currentSlide = 0;
let sliderInterval;

slides.forEach(function(slide, index) {
    const dot = document.createElement("button");
    dot.className = "slider-dot";
    dot.setAttribute("aria-label", "სლაიდი " + (index + 1));

    dot.addEventListener("click", function() {
        showSlide(index);
        startSlider();
    });

    sliderDots.appendChild(dot);
});

const dots = sliderDots.querySelectorAll(".slider-dot");

function showSlide(index) {
    slides[currentSlide].classList.remove("active");
    dots[currentSlide].classList.remove("active");

    currentSlide = (index + slides.length) % slides.length;

    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
}

function startSlider() {
    clearInterval(sliderInterval);

    sliderInterval = setInterval(function() {
        showSlide(currentSlide + 1);
    }, 4000);
}

nextSlide.addEventListener("click", function() {
    showSlide(currentSlide + 1);
    startSlider();
});

prevSlide.addEventListener("click", function() {
    showSlide(currentSlide - 1);
    startSlider();
});

showProducts(products);
updateCart();
showSlide(0);
startSlider();
