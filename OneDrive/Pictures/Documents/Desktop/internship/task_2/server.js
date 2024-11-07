const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Route to render the form page
app.get('/', (req, res) => {
    res.render('index', { errors: [], name: '', email: '' });
});

// Handle form submission with server-side validation
app.post('/addUser', (req, res) => {
    const { name, email, password } = req.body;

    // Server-side validation
    let errors = [];
    if (!name || name.length < 3) errors.push("Name must be at least 3 characters.");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Enter a valid email.");
    if (!password || password.length < 6) errors.push("Password must be at least 6 characters.");

    if (errors.length > 0) {
        // Pass errors and previously entered values back to the form
        res.render('index', { errors, name, email });
    } else {
        res.render('success', { name, email });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
