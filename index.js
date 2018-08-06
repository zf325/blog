"use strict";

const http = require("http");
const path = require("path");
const koa = require("koa");
const statics = require("koa-static");
const views = require("koa-views");
const koaBody = require("koa-body");
const config = require("./config.default");
const Log = require("./logs/log");
const router = require("./router");


let app = new koa();

app.use(views(path.join(__dirname,"view"),{map:{html:"ejs"}}));
app.use(statics(path.join(__dirname,"static")));
app.use(koaBody());

app.use(router.routes()).use(router.allowedMethods());



http.createServer(app.callback()).listen(config.port,config.host);

Log.info(`The server is running on ${config.host}:${config.port}`);

