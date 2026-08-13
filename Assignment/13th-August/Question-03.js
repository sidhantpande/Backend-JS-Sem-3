import http from 'http';

const server = http.createServer((req, res) => {
    
    if (req.url === '/') {
        res.end("Home Page");
    } 
    else if (req.url === '/products') {
        res.end("Our Products");
    } 
    else if (req.url === '/login') {
        res.end("Login Page");
    } 
    else {
        // Any other URL gets a 404 error
        res.statusCode = 404;
        res.end("Page Not Found");
    }
});

server.listen(3000, () => {
    console.log("Routing server running at http://localhost:3000");
});