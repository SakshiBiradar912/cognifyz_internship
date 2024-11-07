// app.js

const itemList = document.getElementById("item-list");
const itemForm = document.getElementById("item-form");

// Fetch and display items
const fetchItems = async () => {
    const res = await fetch("/api/items");
    const items = await res.json();
    itemList.innerHTML = items.map(item => `
        <div class="item" data-id="${item.id}">
            <span><strong>${item.name}</strong>: ${item.description}</span>
            <button onclick="deleteItem(${item.id})">Delete</button>
        </div>
    `).join("");
};

// Add new item
itemForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("item-name").value;
    const description = document.getElementById("item-description").value;
    const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description })
    });
    if (res.ok) {
        fetchItems(); // Refresh the list
        itemForm.reset(); // Clear form fields
    }
});

// Delete item
const deleteItem = async (id) => {
    await fetch(`/api/items/${id}`, { method: "DELETE" });
    fetchItems(); // Refresh the list
};

// Load items on page load
fetchItems();
