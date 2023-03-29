//server creation

//1. http module require

const http = require('http');
const fs = require('fs');
const _= require('lodash');
const server = http.createServer((req,res)=>{
console.log('request has been made from browser to server');
// console.log(req.method);
// console.log(req.url);
//  res.setHeader('Content-Type', 'text/html');
//  res.write('<h1>hello,prashant !:)</h1>');
//  res.end();
let num=_.random(0,20);
console.log(num);
   
});
// port number,host,callback func
server.listen (3000, 'localhost', ()=>{
 console.log('server is listening on port 3000');
});