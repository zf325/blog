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
app.use(koaBody({
    multipart:true,
    formidable:{
        hash:"md5",
        maxFieldsSize:10*1024*1024
    }
}));

app.use(router.routes()).use(router.allowedMethods());

app.use(async(ctx,next)=>{
    try{
        await next();
    }catch(err){
        Log.error("uncatch error",err.message);
        ctx.status = 500;//inside err
        await ctx.render("500.ejs");
    }
});

http.createServer(app.callback()).listen(config.port,config.host);

Log.info(`The server is running on ${config.host}:${config.port}`);

