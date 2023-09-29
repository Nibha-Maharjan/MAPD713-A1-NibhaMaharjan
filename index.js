const http = require('http');
const url = require('url');

let proDB = [];
let getReq = 0;
let postReq = 0;

const server = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url, true);
    const path = reqUrl.pathname;

    console.log(`Processed Request Count--> Get: ${getReq}, Post: ${postReq}`);

    if (req.method === 'GET') {
        getReq++;
    } else if (req.method === 'POST') {
        postReq++;
    }

    console.log(`> ${path} ${req.method}: received request`);

    if (req.method === 'GET' && path === '/products') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(proDB));
        
        console.log(`< ${path} ${req.method}: sending response`);
    } else if (req.method === 'POST' && path === '/products') {
        let data = '';

        req.on('data', chunk => {
            data += chunk;
        });

        req.on('end', () => {
            const newProduct = JSON.parse(data);
            proDB.push(newProduct);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newProduct));
            
            console.log(`< ${path} ${req.method}: sending response`);
        });
    } else if (req.method === 'DELETE' && path === '/products') {
       
        proDB = [];
        res.writeHead(204, { 'Content-Type': 'text/plain' });
        res.end();
        
    
        console.log(`< ${path} ${req.method}: sending response (All records deleted)`);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
        
    
        console.log(`< ${path} ${req.method}: sending response (Not Found)`);
    }
});

const port = 3000;

server.listen(port, () => {
    console.log(`Server is listening at http://127.0.0.1:${port}`);
    console.log('Endpoints:');
    console.log(`http://127.0.0.1:${port}/products method: GET, POST, DELETE`);
});