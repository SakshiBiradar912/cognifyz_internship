// server.js
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static("public")); // Serves static files from the "public" directory

// Simulated data
let items = [
    { id: 1, name: "Item 1", description: "This is item 1" },
    { id: 2, name: "Item 2", description: "This is item 2" },
];

// GET: Retrieve all items
app.get("/api/items", (req, res) => {
    res.json(items);
});

// POST: Create a new item
app.post("/api/items", (req, res) => {
    const newItem = { id: items.length + 1, ...req.body };
    items.push(newItem);
    res.status(201).json(newItem);
});

// PUT: Update an existing item by ID
app.put("/api/items/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
        items[index] = { id, ...req.body };
        res.json(items[index]);
    } else {
        res.status(404).json({ error: "Item not found" });
    }
});

// DELETE: Remove an item by ID
app.delete("/api/items/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
        const deletedItem = items.splice(index, 1);
        res.json(deletedItem[0]);
    } else {
        res.status(404).json({ error: "Item not found" });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
