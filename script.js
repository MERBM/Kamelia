document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    updateCartCount();
    updateNavbarBasedOnLoginStatus();
    updateCategories();
});
const BaseUrl = 'https://merbmd-001-site1.itempurl.com/';
//const BaseUrl = 'https://localhost:7200/';

var products;
var Categories;

function updateCategories() {
    fetch(BaseUrl + 'api/Categories')
        .then(async response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            this.Categories = await response.json();
            return this.Categories;
        })
        .then(Categories => {
            const categoryList = document.getElementById('categoryList');
            categoryList.innerHTML = ''; // Clear existing list

            Categories.forEach(category => {
                const listItem = document.createElement('li');
                listItem.className = 'nav-item';
                const link = document.createElement('a');
                link.className = 'nav-link';
                link.href = '#';
                link.textContent = `${category.name} (${category.count})`; // Display name and count
                link.onclick = function () { filterProductsByCategory(category.categoryID); }; // Use 'categoryID' for filtering

                listItem.appendChild(link);
                categoryList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function setupEventListeners() {
    const loginButton = document.getElementById('loginButton');
    if (loginButton) loginButton.addEventListener('click', () => loadLoginContent());

    const signupButton = document.getElementById('signupButton');
    if (signupButton) signupButton.addEventListener('click', () => loadSignupContent());

    const productsLink = document.getElementById('productsLink');
    const MyOrders = document.getElementById('MyOrders');
    if (MyOrders) MyOrders.addEventListener('click', (event) =>{
        event.preventDefault(); loadMyOrdersContent();
    } );

    if (productsLink) productsLink.addEventListener('click', (event) => {
        // Prevent the default link behavior to prevent the page from reloading when the link is clicked
        event.preventDefault();
        loadProductContent();
    });
}
function clearCart(){
    deleteCookie('cart');
    let cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = ''; // Clear existing items
    updateCartCount();
}
function loadMyOrdersContent() {
    const productsContainer = document.getElementById('productsContainer');
    //take all width 100%
    productsContainer.innerHTML = ` `;

    fetch(BaseUrl + 'api/Orders/GetOrdersByUserId/'+getCookie('userId'))
        .then(async response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
             
            return await response.json();
        })
        .then(OrderItems => {
            if (OrderItems.length === 0) {
                productsContainer.innerHTML += '<p>No Orders available.</p>';
            } else {
                const OrdersHtml =  OrderItems.map(order => `
                <div class="card mb-3" id="orderCard-${+order.orderID}">
                    <div class="card-header">
                        Order #${order.orderID} - <small class="text-muted">Placed by: ${order.user.username}</small>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Total Amount: $${order.totalAmount.toFixed(2)}</h5>
                        <p class="card-text">Delivery Address: ${order.deliveryAddress}</p>
                        <p class="card-text">Phone Number: ${order.phoneNumber}</p>
                        <p class="card-subtitle mb-2">Order Date: ${new Date(order.orderDate).toLocaleDateString()}</p>
                        <div>
                            <strong>Items:</strong>
                            <ul>
                                ${order.orderItems.map(item => `
                                    <li>
                                        <strong>${item.product.name}</strong> (ID: ${item.productID})
                                        - Quantity: ${item.quantity}
                                        - Price at Order: $${item.priceAtOrder.toFixed(2)}
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                        <button class="btn btn-danger" onclick="deleteOrder(${order.userID},${order.orderID})">Cancel Order</button>
                    </div>
                </div>
            `).join('');
                productsContainer.innerHTML += OrdersHtml;
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            productsContainer.innerHTML += '<p>Error loading products.</p>';
        });
}
function loadProductContent() {
    const productsContainer = document.getElementById('productsContainer');
    //take all width 100%
    productsContainer.innerHTML = ` `;

    fetch(BaseUrl + 'api/Products')
        .then(async response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            this.products = await response.json();
            return this.products;
        })
        .then(products => {
            if (products.length === 0) {
                productsContainer.innerHTML += '<p>No products available.</p>';
            } else {
                const productHtml = products.map(product => `
                    <div class="col-md-4 mb-3">
                        <img src="${BaseUrl}${product.imageURL}" class="card-img-top img-fluid" alt="${product.name}">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-text">${product.description}</p>
                                <p class="card-text"><strong>Price:</strong> $${product.price}</p>
                                <a class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</a>
                            </div>
                        </div>
                    </div>
                `).join('');
                productsContainer.innerHTML += productHtml;
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            productsContainer.innerHTML += '<p>Error loading products.</p>';
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
    <form id="signupForm" onsubmit="handleSignup(event)">
        <div class="form-group">
            <label for="Name">Name:</label>
            <input type="text" class="form-control" id="Name" name="Name" required>
            </div>
        <div class="form-group">
            <label for="email">Email address:</label>
            <input type="email" class="form-control" id="email" name="email" required>
        </div>
        <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" class="form-control" id="password" name="password" required>
        </div>
        <button type="submit" class="btn btn-primary">Sign Up</button>
    </form>
    </div>
    `;

}
function handleSignup(event) {
    event.preventDefault(); // Prevents the default form submission
    const userName = document.getElementById('Name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const signupData = {
        username: userName,
        email: email,
        passwordHash: password
    };

    console.log('Signup Data:', signupData); // For demonstration

   // Replace with your API endpoint and implement the API request
    fetch(BaseUrl+'api/Account/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupData)
    })
    .then(response => {
        if (!response.ok) {
            // If the response status code is not 200-299, it's an error
            throw new Error(`Error: ${response.status} ${response.statusText} email already exists`);
        }
        return response; // Assuming the server returns JSON
    })
    .then(data => {
        console.log('Success:', data);
        loadLoginContent(); // Handle success, e.g., loading the login content
    })
    .catch((error) => {
        console.error('Error:', error);
        alert(error.message); // Display an alert with the error message
    });
}



function setupLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            // Prevent the default form submission behavior to prevent the page from reloading when the form is submitted
            event.preventDefault();
            performLogin();
        });
    }
}

function performLogin() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('pwd').value;
    const loginData = {
        email: email,
        password: password
    };

    console.log('login Data:', loginData); // For demonstration

   // Replace with your API endpoint and implement the API request
    fetch(BaseUrl+'api/Account/login?email='+email+'&password='+password, {
        method: 'POST',
    })
    .then(response => {
        if (!response.ok) {
            // If the response status code is not 200-299, it's an error
            throw new Error(`Error: ${response.status} ${response.statusText} `);
        }
        return response.json(); // Assuming the server returns JSON
    })
    .then(data => {
        Toastify({
            text: `Hello ${data.username} you are logged in !`,
            duration: 3000,
            close: true,
            gravity: "top",  // `top` or `bottom`
            position: "right",  // `left`, `center` or `right`
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        }).showToast();
        console.log('Success:', data);
        setCookie("currentUser", email, 7);
        setCookie('userId', data.userID, 7); // Sets the cookie for 7 days
        updateNavbar(email);
        const productsContainer = document.getElementById('productsContainer');
        productsContainer.innerHTML = `  `;
        loadProductContent(); // Handle success, e.g., loading the login content
    })
    .catch((error) => {
        console.error('Error:', error);
        alert("Incorrect username or password!");
        });
    
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
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
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
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
    Toastify({
        text: `Item added to cart ${ product.name } successfully!`,
        duration: 3000,
        close: true,
        gravity: "top",  // `top` or `bottom`
        position: "right",  // `left`, `center` or `right`
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
    }).showToast();
    
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
    let user = getCookie('currentUser');
    if (!user) {
        alert("Please login first.");
        return;
    }

    
    let userAddress = document.getElementById('userAddress').value;
    let userPhone = document.getElementById('userPhone').value;

    if ( !userAddress || !userPhone) {
        alert("Please fill in all your details.");
        return;
    }

    let orderDetails = {
            UserID: +getCookie('userId'),
            TotalAmount: +cart.reduce((total, item) => total + item.price, 0), 
            DeliveryAddress: userAddress,
            PhoneNumber: userPhone,
            OrderItems: cart.map(item => ({
                ProductID: +item.productID,
                Quantity: 1 ,
                PriceAtOrder: +item.price
                
            }))
        } ;
        console.log(cart);
        console.log(orderDetails);
    fetch(BaseUrl+'api/Orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderDetails)
    }).then(response => {
        if (!response.ok) {

            throw new Error(`Error: ${response.status} ${response.statusText} `);
        }
        return response; // Assuming the server returns JSON
    }).then(data => {
        console.log('Success:', data);
        setCookie('ordered', JSON.stringify(data), 7);
        setCookie('cart', '', -1); // Clearing the cart cookie
        // Update UI
        updateCartCount();
        $('#cartModal').modal('hide'); // Hide the cart modal
    
        alert("Checkout successful! Your order has been placed.");
    }).catch(error => {
        console.error('Error:', error);
    })

}
function deleteOrder(userId, orderId) {
    fetch(BaseUrl+`api/Orders/delete/${userId}/${orderId}`, {
        method: 'DELETE',
    })
    .then( async response => {
        if (!response.ok) {
           
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    })
    .then(data => {
        console.log(data.message);
        const orderCard = document.getElementById(`orderCard-${orderId}`);
        if (orderCard) {
            orderCard.remove();
        }
        // Handle the successful deletion here (e.g., update the UI or notify the user)
    })
    .catch(error => {
        Toastify({
            text: ` Order cannot be deleted. It may be older than 3 hours or does not exist. `,
            duration: 3000,
            close: true,
            gravity: "top",  // `top` or `bottom`
            position: "right",  // `left`, `center` or `right`
            backgroundColor: "linear-gradient(to right,red, gray)",
        }).showToast();
        console.error('Error deleting the order:', error);
        
        // Handle the error here (e.g., display an error message to the user)
    });
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
    const filteredProducts = products.filter(product => product.categoryID === category);
    displayProducts(filteredProducts);
}

function displayProducts(productsList) {
    const productsContainer = document.getElementById('productsContainer');
    productsContainer.innerHTML = `  ` + productsList.map(product => `
        <div class="col-md-4 mb-3">
            <div class="card">
            <img src="${BaseUrl}${product.imageURL}" class="card-img-top img-fluid" alt="${product.name}">

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



