"use strict";

const http = require("http");
const koa = require("koa");
const koaStatic = require("koa-static");
const koaRouter = require("koa-router");
const config = require("./config.default");
const Log = require("./common/log");
const router = require("./router");


let app = new koa();







const server = http.createServer(app.callback(),()=>{
    const host = server.address.host;
    const port = server.address.post;
    

}).listen(config.port,config.host);

console.log(`The server is running on ${config.host}:${config.port}`);

