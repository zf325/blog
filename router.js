"use strict";

const Router = require("koa-router");


let router = new Router();
router.get("/test",async(ctx,next)=>{
    ctx.body = {code:0};
});
router.get("/",async(ctx,next)=>{
    await ctx.render("index.jade");
});

router.get('/categoty/article');


module.exports = router;