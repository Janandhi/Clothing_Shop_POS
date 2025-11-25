console.log("JS is loaded");

// Simple product database
const products = {
    shirts: [
        { name: "Casual Shirt", price: 2500 },
        { name: "Formal Shirt", price: 3500 },
        { name: "T-Shirt", price: 1500 }
    ],
    pants: [
        { name: "Jeans", price: 3000 },
        { name: "Shorts", price: 1800 },
        { name: "Formal Pants", price: 4000 }
    ],
    accessories: [
        { name: "Cap", price: 800 },
        { name: "Belt", price: 1200 },
        { name: "Sunglasses", price: 2000 }
    ]
};

let cart = [];
let total = 0;

// Display category items
function showCategory(category) {
    let list = document.getElementById("product-list");
    list.innerHTML = "";

    products[category].forEach(item => {
        list.innerHTML += `
            <div>
                <span>${item.name} - Rs.${item.price}</span>
                <button onclick="addToCart('${item.name}', ${item.price})">Add</button>
            </div>
        `;
    });
}

// Add item to cart
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

// Apply Discount
function applyDiscount() {
    let discount = Number(document.getElementById("discount-input").value);
    let discountAmount = (total * discount) / 100;
    let finalTotal = total - discountAmount;

    document.getElementById("total-display").innerHTML =
        "Total After Discount: Rs. " + finalTotal;
}

// Generate Receipt
function generateReceipt() {
    let text = "----- FashionRack Receipt -----\n";

    cart.forEach(item => {
        text += `${item.name} - Rs.${item.price}\n`;
    });

    text += "-------------------------------\n";
    text += "Total: Rs." + total + "\n";

    document.getElementById("receipt-box").innerText = text;
}







// Simple CRUD list
let customProducts = [];

function addNewProduct() {
    let name = document.getElementById("pname").value;
    let price = Number(document.getElementById("pprice").value);

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
