// Name: Nibha Maharjan
// Student ID: 301282952
// Date Completed: 25th Sep 2023
// App Desc: Node.js http server to store, retrieve and delete information using GET,POST and DELETE requests and JSON data format.

//Importing nodejs modules for HTTP and URL
const http = require('http');
const url = require('url');

//Counter for GET and POST methods
let proDB = [];
let getReq = 0;
let postReq = 0;

//Setting up HTTP server
const server = http.createServer((req, res) => {
    //URL Handle
    const reqUrl = url.parse(req.url, true);
    const path = reqUrl.pathname;

    //Counter log message
    console.log(`Processed Request Count--> Get: ${getReq}, Post: ${postReq}`);

    //Counter function to increase if GET or POST is called
    if (req.method === 'GET') {
        getReq++;
    } else if (req.method === 'POST') {
        postReq++;
    }
    //Logging which request was called using req.method
    console.log(`> ${path} ${req.method}: Request recieved`);

    //Request handling and error messages
    //Get Request
    if (req.method === 'GET' && path === '/products') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(proDB));
        console.log(`< ${path} ${req.method}: Sending response`);
    } else if (
        //Post Request
        req.method === 'POST' && path === '/products') {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', () => {
            const addProd = JSON.parse(data);
            proDB.push(addProd);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(addProd));
            
            console.log(`< ${path} ${req.method}: Sending response`);
        });
    } else if (
        //Delete Request
        req.method === 'DELETE' && path === '/products') {
        proDB = [];
        res.writeHead(204, { 'Content-Type': 'text/plain' });
        res.end();
        console.log(`< ${path} ${req.method}: (All records deleted)`);
    } else {
        //404 Error
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
        console.log(`< ${path} ${req.method}: (Not Found)`);
    }
});

//Port number where the server runs
const port = 3000;

//Server startup message on log
server.listen(port, () => {
    console.log(`Server is listening at http://127.0.0.1:${port}`);
    console.log('Endpoints:');
    console.log(`http://127.0.0.1:${port}/products method: GET, POST, DELETE`);
});

//The end