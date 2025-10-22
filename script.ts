// ======== Shared Menu List ========
let menu = JSON.parse(localStorage.getItem("menu")) || [
  { item: "Burger", price: 50 },
  { item: "Pizza", price: 100 },
  { item: "Coffee", price: 30 },
  { item: "Juice", price: 40 }
];

// ======== USER PAGE FUNCTIONS ========
let cart = [];
let total = 0;

function loadMenu() {
  const menuDiv = document.getElementById("menu");
  if (!menuDiv) return; // not on user page

  menuDiv.innerHTML = "<h2>Menu</h2>";
  menu.forEach((m) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "item";
    itemDiv.innerHTML = `
      <p>${m.item} - ₹${m.price}</p>
      <button onclick="addToCart('${m.item}', ${m.price})">Add to Cart</button>
    `;
    menuDiv.appendChild(itemDiv);
  });
}

function addToCart(item, price) {
  cart.push({ item, price });
  total += price;
  displayCart();
}

function displayCart() {
  const cartList = document.getElementById("cart");
  const totalDisplay = document.getElementById("total");
  if (!cartList) return;

  cartList.innerHTML = "";
  cart.forEach((c) => {
    const li = document.createElement("li");
    li.textContent = `${c.item} - ₹${c.price}`;
    cartList.appendChild(li);
  });

  totalDisplay.textContent = `Total: ₹${total}`;
}

function placeOrder() {
  if (cart.length === 0) {
    document.getElementById("message").textContent = "Your cart is empty!";
    return;
  }

  document.getElementById("message").textContent = "✅ Order placed successfully!";
  cart = [];
  total = 0;
  displayCart();
}

// ======== ADMIN PAGE FUNCTIONS ========
function loadAdminMenu() {
  const menuList = document.getElementById("menuList");
  if (!menuList) return;

  menuList.innerHTML = "";
  menu.forEach((m, index) => {
    const li = document.createElement("li");
    li.textContent = `${m.item} - ₹${m.price}`;
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = () => deleteMenuItem(index);
    li.appendChild(delBtn);
    menuList.appendChild(li);
  });
}

function addMenuItem() {
  const name = document.getElementById("itemName").value.trim();
  const price = document.getElementById("itemPrice").value;

  if (!name || !price) {
    alert("Please enter item name and price.");
    return;
  }

  menu.push({ item: name, price: Number(price) });
  localStorage.setItem("menu", JSON.stringify(menu));
  loadAdminMenu();
  alert("Item added successfully!");
  document.getElementById("itemName").value = "";
  document.getElementById("itemPrice").value = "";
}

function deleteMenuItem(index) {
  menu.splice(index, 1);
  localStorage.setItem("menu", JSON.stringify(menu));
  loadAdminMenu();
}

// ======== PAGE LOADER ========
window.onload = function () {
  loadMenu();
  loadAdminMenu();
};
