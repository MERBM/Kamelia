document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    updateCartCount();
    updateNavbarBasedOnLoginStatus();
});

const products = [
    // GEO COLLECTION
    {
        id: 1,
        name: 'Geo Pattern Rug',
        description: 'Geometrically inspired rug with modern patterns.',
        price: 120.99,
        category: 'GEO COLLECTION',
        image: 'images/geo_pattern_rug.png'
    },
    // CLASSIC
    {
        id: 2,
        name: 'Classic Oriental Rug',
        description: 'Traditional oriental rug with timeless appeal.',
        price: 200.50,
        category: 'CLASSIC',
        image: 'images/classic_oriental_rug.png'
    },
    // MODERN
    {
        id: 3,
        name: 'Contemporary Art Rug',
        description: 'A modern rug inspired by contemporary art.',
        price: 180.75,
        category: 'MODERN',
        image: 'images/contemporary_art_rug.png'
    },
    // INDOOR-OUTDOOR
    {
        id: 4,
        name: 'Versatile Indoor-Outdoor Rug',
        description: 'Perfect for both indoor and outdoor settings.',
        price: 150.00,
        category: 'INDOOR-OUTDOOR',
        image: 'images/indoor_outdoor_rug.png'
    },
    // KIDS RUGS
    {
        id: 5,
        name: 'Colorful Kids Rug',
        description: 'Bright and playful rug for children\'s rooms.',
        price: 85.00,
        category: 'KIDS RUGS',
        image: 'images/colorful_kids_rug.png'
    },
    // HAND TUFT
    {
        id: 6,
        name: 'Hand Tufted Wool Rug',
        description: 'Handcrafted tufted rug made from the finest wool.',
        price: 220.00,
        category: 'HAND TUFT',
        image: 'images/hand_tufted_wool_rug.png'
    },
    // SHAG
    {
        id: 7,
        name: 'Luxury Shag Rug',
        description: 'Ultra-soft shag rug for a cozy feel.',
        price: 250.00,
        category: 'SHAG',
        image: 'images/luxury_shag_rug.png'
    },
    // GOBELIN
    {
        id: 8,
        name: 'Gobelin Style Rug',
        description: 'Elegant gobelin rug with intricate designs.',
        price: 300.00,
        category: 'GOBELIN',
        image: 'images/gobelin_style_rug.png'
    },
    // BATHROOM MAT
    {
        id: 9,
        name: 'Soft Bathroom Mat',
        description: 'Comfortable and absorbent mat for bathrooms.',
        price: 50.00,
        category: 'BATHROOM MAT',
        image: 'images/soft_bathroom_mat.png'
    },
    // ... continue adding products for each category ...
    // Continuing from the previous products...

    // GEO COLLECTION
    {
        id: 10,
        name: 'Geometric Abstract Rug',
        description: 'A rug featuring bold geometric patterns for a modern look.',
        price: 210.00,
        category: 'GEO COLLECTION',
        image: 'images/geometric_abstract_rug.png'
    },
    {
        id: 11,
        name: 'Minimalist Geo Rug',
        description: 'Sleek and minimalist design with subtle geometric shapes.',
        price: 190.00,
        category: 'GEO COLLECTION',
        image: 'images/minimalist_geo_rug.png'
    },

    // CLASSIC
    {
        id: 12,
        name: 'Vintage Classic Rug',
        description: 'A classic rug with a vintage feel, perfect for elegant spaces.',
        price: 250.00,
        category: 'CLASSIC',
        image: 'images/vintage_classic_rug.png'
    },
    {
        id: 13,
        name: 'Royal Classic Carpet',
        description: 'A carpet that exudes classic elegance and royal charm.',
        price: 300.00,
        category: 'CLASSIC',
        image: 'images/royal_classic_carpet.png'
    },

    // MODERN
    {
        id: 14,
        name: 'Urban Chic Rug',
        description: 'A rug that embodies the essence of modern urban design.',
        price: 220.00,
        category: 'MODERN',
        image: 'images/urban_chic_rug.png'
    },
    {
        id: 15,
        name: 'Modern Artistic Rug',
        description: 'A creatively designed rug, perfect for modern art lovers.',
        price: 245.00,
        category: 'MODERN',
        image: 'images/modern_artistic_rug.png'
    },

    // INDOOR-OUTDOOR
    {
        id: 16,
        name: 'Versatile All-Weather Rug',
        description: 'Designed for both indoor and outdoor use, resilient in all weather conditions.',
        price: 180.00,
        category: 'INDOOR-OUTDOOR',
        image: 'images/all_weather_rug.png'
    },
    {
        id: 17,
        name: 'Patio-Friendly Rug',
        description: 'A perfect addition to your patio, blending durability with style.',
        price: 160.00,
        category: 'INDOOR-OUTDOOR',
        image: 'images/patio_friendly_rug.png'
    },

// ... continue in the same pattern for other categories ...

    // MAC COLLECTION
    {
        id: 28,
        name: 'Mac Collection Elegant Rug',
        description: 'Part of the exclusive Mac Collection, offering sophistication and style.',
        price: 345.00,
        category: 'MAC COLLECTION',
        image: 'images/mac_collection_elegant_rug.png'
    },
    // ROUND AREA RUG
    {
        id: 29,
        name: 'Round Area Rug',
        description: 'A beautifully designed round rug, perfect for any area.',
        price: 180.00,
        category: 'ROUND AREA RUG',
        image: 'images/round_area_rug.png'
    },
    // GOBELIN TABLEAU
    {
        id: 30,
        name: 'Gobelin Tableau Rug',
        description: 'Artistic and ornate, a masterpiece for your floor.',
        price: 375.00,
        category: 'GOBELIN TABLEAU',
        image: 'images/gobelin_tableau_rug.png'
    }
];


function setupEventListeners() {
    const loginButton = document.getElementById('loginButton');
    if (loginButton) loginButton.addEventListener('click', () => loadLoginContent());

    const signupButton = document.getElementById('signupButton');
    if (signupButton) signupButton.addEventListener('click', () => loadSignupContent());

    const productsLink = document.getElementById('productsLink');
    if (productsLink) productsLink.addEventListener('click', (event) => {
        // Prevent the default link behavior to prevent the page from reloading when the link is clicked
        event.preventDefault();
        loadProductContent();
    });
}

function loadProductContent() {
    const productsContainer = document.getElementById('productsContainer');
    productsContainer.innerHTML = ` <h2 class="mb-4">Our Products</h2> `;
    productsContainer.innerHTML = products.map(product => `
        <div class="col-md-4 mb-3">
        <img src="./${product.image}" class="card-img-top img-fluid" alt="${product.name}">
        <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text"><strong>Price:</strong> $${product.price}</p>
                    <a  class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</a>
                </div>
            </div>
        </div>
    `).join('');
}

function loadContent(page) {
    fetch(page)
        .then(response => response.text())
        .then(html => {
            document.getElementById('productsContainer').innerHTML = html;
            if(page === './login.html') {
                setupLoginForm();
            }
        })
        .catch(error => {
            console.error('Error loading page:', error);
            document.getElementById('productsContainer').innerHTML = '<p>Error loading content.</p>';
        });
}
function loadLoginContent() {
   
    document.getElementById('productsContainer').innerHTML = `
    <div id="content" class="container">
    <h2>Login</h2>
    <form id="loginForm">
        <div class="form-group">
            <label for="email">Email address:</label>
            <input type="email" class="form-control" id="email" required>
        </div>
        <div class="form-group">
            <label for="pwd">Password:</label>
            <input type="password" class="form-control" id="pwd" required>
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
    </form>
    </div>`;
    setupLoginForm();
       
}
function loadSignupContent() {
   
    document.getElementById('productsContainer').innerHTML = `
    <div class="container">
    <h2>Sign Up</h2>
    <form id="signupForm">
        <div class="form-group">
            <label for="newEmail">Email address:</label>
            <input type="email" class="form-control" id="newEmail" required>
        </div>
        <div class="form-group">
            <label for="newPwd">Password:</label>
            <input type="password" class="form-control" id="newPwd" required>
        </div>
        <button type="submit" class="btn btn-primary">Sign Up</button>
    </form>
    </div>`;
}
function setupLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            // Prevent the default form submission behavior to prevent the page from reloading when the form is submitted
            event.preventDefault();
            performLogin();
        });
    }
}

function performLogin() {
    var username = document.getElementById('email').value;
    var password = document.getElementById('pwd').value;
    if (username === "user@gmail.com" && password === "password123") {
        setCookie("currentUser", username, 7);
        updateNavbar(username);
        const productsContainer = document.getElementById('productsContainer');
         productsContainer.innerHTML =  `  `;
         loadProductContent();
        // window.location.href = './index.html';
    } else {
        alert("Incorrect username or password!");
    }
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function updateNavbar(username) {
    document.getElementById('loginButton').style.display = 'none';
    document.getElementById('signupButton').style.display = 'none';
    var usernameDisplay = document.getElementById('usernameDisplay');
    usernameDisplay.textContent = username;
    usernameDisplay.style.display = 'block';
    document.getElementById('logoutButton').style.display = 'block';
}

function updateNavbarBasedOnLoginStatus() {
    var currentUser = getCookie("currentUser");
    if (currentUser) {
        updateNavbar(currentUser);
    } else {
        // Reset Navbar for non-logged in users
        document.getElementById('loginButton').style.display = 'block';
        document.getElementById('signupButton').style.display = 'block';
        document.getElementById('logoutButton').style.display = 'none';
        document.getElementById('usernameDisplay').style.display = 'none';
        // document.getElementById('cartCount').style.display = 'none';
        document.getElementById('cartIcon').style.display = 'none';
    }
}

function logout() {
    deleteCookie("currentUser");
    deleteCookie('cart');
    updateCartCount();
    updateNavbarBasedOnLoginStatus();
}

function deleteCookie(name) {
    setCookie(name, '', -1);
}

function addToCart(productId) {
    let product = products.find(p => p.id === productId);
    if (!product) return;

    let cart = getCart();
    cart.push(product);
    setCookie('cart', JSON.stringify(cart), 7);
    updateCartCount();
}

function getCart() {
    let cartCookie = getCookie('cart');
    return cartCookie ? JSON.parse(cartCookie) : [];
}

function updateCartCount() {
    let cart = getCart();
    let count = cart.length;
    document.getElementById('cartCount').textContent = count;
}

function showCartDetails() {
    let cart = getCart();
    let cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = ''; // Clear existing items

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            cartItemsContainer.innerHTML += `
                <div class="card mb-2">
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text">${item.description}</p>
                        <p class="card-text">Price: $${item.price}</p>
                        <!-- You can add more details like quantity, remove button, etc. -->
                    </div>
                </div>
            `;
        });
    }

    $('#cartModal').modal('show'); // Use Bootstrap's modal method to show the modal
}


function checkout() {
    let cart = getCart();
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    let userName = document.getElementById('userName').value;
    let userEmail = document.getElementById('userEmail').value;
    let userAddress = document.getElementById('userAddress').value;
    let userPhone = document.getElementById('userPhone').value;

    if (!userName || !userEmail || !userAddress || !userPhone) {
        alert("Please fill in all your details.");
        return;
    }

    let orderDetails = {
        user: {
            name: userName,
            email: userEmail,
            address: userAddress,
            phone: userPhone
        },
        items: cart
    };

    // Set the "ordered" cookie with the order details
    setCookie('ordered', JSON.stringify(orderDetails), 7); // Storing the order for 7 days

    // Clear the cart
    setCookie('cart', '', -1); // Clearing the cart cookie

    // Update UI
    updateCartCount();
    $('#cartModal').modal('hide'); // Hide the cart modal

    alert("Checkout successful! Your order has been placed.");
}


function getOrderedDetails() {
    let orderedCookie = getCookie('ordered');
    if (orderedCookie) {
        return JSON.parse(orderedCookie);
    }
    return null;
}

function showDashboard() {
    // ... existing showDashboard functionality ...
}
function filterProductsByCategory(category) {
    const filteredProducts = products.filter(product => product.category === category);
    displayProducts(filteredProducts);
}

function displayProducts(productsList) {
    const productsContainer = document.getElementById('productsContainer');
    productsContainer.innerHTML =  `  `+ productsList.map(product => `
        <div class="col-md-4 mb-3">
            <div class="card">
            <img src="${product.image}" class="card-img-top img-fluid" alt="${product.name}">

                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text"><strong>Price:</strong> $${product.price}</p>
                    <a  class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</a>
                </div>
            </div>
        </div>
    `).join('');
}

function filterProducts(event) {
    event.preventDefault(); // Prevent the form from submitting traditionally

    const name = document.getElementById('productName').value.toLowerCase();
    const minPrice = document.getElementById('minPrice').value;
    const maxPrice = document.getElementById('maxPrice').value;

    const filteredProducts = products.filter(product => {
        const meetsNameCriteria = name ? product.name.toLowerCase().includes(name) : true;
        const meetsMinPriceCriteria = minPrice ? product.price >= minPrice : true;
        const meetsMaxPriceCriteria = maxPrice ? product.price <= maxPrice : true;
        return meetsNameCriteria && meetsMinPriceCriteria && meetsMaxPriceCriteria;
    });

    displayProducts(filteredProducts); // Assuming you have a function to display products
}



