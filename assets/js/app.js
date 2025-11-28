console.log("JS is loaded");

function toggleMode() {
    document.body.classList.toggle("dark-mode");
    let btn = document.getElementById("modeToggle");

    btn.innerText = document.body.classList.contains("dark-mode")
        ? "☀️ Light Mode"
        : "🌙 Dark Mode";
}

const products = {
    shirts: [
        { name: "Casual Shirt", price: 2500, img: "shirt1.jpg" },
        { name: "Formal Shirt", price: 3500, img: "shirt2.jpg" },
        { name: "T-Shirt", price: 1500, img: "shirt3.jpg" }
    ],
    pants: [
        { name: "Jeans", price: 3000, img: "pants1.jpg" },
        { name: "Shorts", price: 1800, img: "pants2.jpg" },
        { name: "Formal Pants", price: 4000, img: "pants3.jpg" }
    ],
    accessories: [
        { name: "Cap", price: 800, img: "cap.jpg" },
        { name: "Belt", price: 1200, img: "belt.jpg" },
        { name: "Sunglasses", price: 2000, img: "sun.jpg" }
    ]
};

let cart = [];
let total = 0;

function showCategory(category) {
    let list = document.getElementById("product-list");
    list.innerHTML = "";

    products[category].forEach(item => {
        list.innerHTML += `
            <div class="card">
                <img src="assets/img/${item.img}">
                <h3>${item.name}</h3>
                <p>Rs. ${item.price}</p>
                <button class="add-btn" onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button>
            </div>
        `;
    });
}

function addToCart(name, price) {
    cart.push({ name, price });

    let table = document.getElementById("cart-table");
    let row = table.insertRow();
    row.insertCell(0).innerHTML = name;
    row.insertCell(1).innerHTML = price;
    row.insertCell(2).innerHTML = `<button onclick="removeItem(this, ${price})">X</button>`;

    total += price;
    updateTotal();
}

function removeItem(button, price) {
    let row = button.parentNode.parentNode;
    row.remove();
    total -= price;
    updateTotal();
}

function updateTotal() {
    document.getElementById("total-display").innerHTML = "Total: Rs. " + total;
}

let finalTotal = total; 
let appliedDiscount = 0;

function applyDiscount() {
    appliedDiscount = Number(document.getElementById("discount-input").value);
    finalTotal = total - (total * appliedDiscount) / 100;

    document.getElementById("total-display").innerHTML =
        "Total After Discount: Rs. " + finalTotal;
}

function generateReceipt() {
    let text = "----- FashionRack Receipt -----\n\n";

    cart.forEach(item => {
        text += `${item.name} - Rs.${item.price}\n`;
    });

    text += "\n---------------------------\n";
    text += "Total Before Discount: Rs." + total + "\n";
    text += "Discount Applied: " + appliedDiscount + "%\n";
    text += "Final Total: Rs." + finalTotal;

    document.getElementById("receipt-box").innerText = text;
}

let customProducts = [];

function addNewProduct() {
    let name = document.getElementById("pname").value;
    let price = Number(document.getElementById("pprice").value);

    if (name === "" || price <= 0) {
        alert("Enter valid product details!");
        return;
    }

    customProducts.push({ name, price });
    showCustomProducts();
}

function showCustomProducts() {
    let list = document.getElementById("product-list-crud");
    list.innerHTML = "";

    customProducts.forEach((item, index) => {
        list.innerHTML += `
            <li>
                ${item.name} - Rs.${item.price}
                <button onclick="deleteProduct(${index})">Delete</button>
            </li>
        `;
    });
}

function deleteProduct(i) {
    customProducts.splice(i, 1);
    showCustomProducts();
}
