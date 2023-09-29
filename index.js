const http = require('http');
const url = require('url');


const server = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url, true);

});

const port = 3000;

server.listen(port, () => {
    console.log(`Server is listening at http://127.0.0.1:${port}`);
    console.log('Endpoints:');
    console.log(`http://127.0.0.1:${port}/products method: GET, POST, DELETE`);
});