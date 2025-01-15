import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

const port = 3000;

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);

    // Handle specific routes
    if (req.url.startsWith('/catalog/')) {
        filePath = path.join(__dirname, 'catalog', 'index.html');
    } else if (req.url.startsWith('/product/')) {
        filePath = path.join(__dirname, 'product', 'index.html');
    } else if (req.url.startsWith('/cart/')) {
        filePath = path.join(__dirname, 'cart', 'index.html');
    } else if (req.url.startsWith('/checkout/payment/')) {
        filePath = path.join(__dirname, 'checkout', 'payment', 'index.html');
    } else if (req.url.startsWith('/checkout/complete/')) {
        filePath = path.join(__dirname, 'checkout', 'complete', 'index.html');
    } else if (req.url.startsWith('/checkout/')) {
        filePath = path.join(__dirname, 'checkout', 'index.html');
    } else if (req.url.startsWith('/contact-us/')) {
        filePath = path.join(__dirname, 'contact-us', 'index.html');
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                fs.readFile(path.join(__dirname, '404.html'), (error, content) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf-8');
                });
            } else {
                res.writeHead(500);
                res.end(`Sorry, check with the site admin for error: ${error.code} ..\n`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});