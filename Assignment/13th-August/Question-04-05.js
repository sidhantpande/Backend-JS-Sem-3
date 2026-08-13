import express from 'express';

const app = express();

// --- QUESTION 5: Middleware ---
// This runs for EVERY request before hitting the routes below

app.use((req, res, next) => {
    console.log(`[Middleware log] Method: ${req.method} | URL: ${req.url}`);
    next(); // This tells Express to move on to the actual route!
});


// --- QUESTION 4: Routes ---
app.get('/', (req, res) => {
    res.send("Home Page");
});

app.get('/products', (req, res) => {
    res.send("Our Products");
});

app.get('/login', (req, res) => {
    res.send("Login Page");
});

app.get('/contact', (req, res) => {
    res.send("Contact Page");
});


// Start the server
app.listen(3000, () => {
    console.log("Express server running at http://localhost:3000");
});