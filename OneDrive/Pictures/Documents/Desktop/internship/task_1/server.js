const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Set the view engine to EJS and configure views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Route to render the form page
app.get('/', (req, res) => {
    res.render('index');
});

// Route to handle form submission
app.post('/addUser', (req, res) => {
    const { name, email } = req.body;
    // Pass submitted data to success view
    res.render('success', { name, email });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
