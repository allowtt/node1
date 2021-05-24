const http = require('http');

const server =http.createServer((req, res) => {
    res.write('<h1>Hello Node!</h1>');
    res.write('<h1>Hello Server!</h1>');
    res.end('end');
})
    .listen(8080);

server.on('listening', () => {
    console.log('8080대기중');
});

server.on('error', (error) => {
    console.error(error);
})