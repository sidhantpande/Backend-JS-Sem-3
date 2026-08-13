import http from 'http';

const server = http.createServer((req, res) => {
    // Print the requested URL and HTTP method in the terminal
    console.log(`Request received: ${req.method} ${req.url}`);
    
    // Send the response back to the browser
    res.end("Welcome to my server");
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log("Server is running! Open http://localhost:3000 in your browser.");
});