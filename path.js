const path = require('path');

// console.log(path.join(__dirname, '..', './var.js'));
// console.log(path.resolve(__dirname, '..', './var.js'));

const url = require('url');
const queryString = require('querystring');

const parsedUrl = url.parse('http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs');
const query = queryString.parse(parsedUrl.query);
console.log(query);
console.log(`queryString.stringify(query) : ${queryString.stringify(query)}`);