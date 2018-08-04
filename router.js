"use strict";

const Router = require("koa-router");
const {articleControl,commentControl,categoryControl,tagControl} = require("./control");


let router = new Router();
router.get("/test",async(ctx,next)=>{
    ctx.body = {code:0};
});
router.get("/",async(ctx,next)=>{
    await ctx.render("index.jade");
});


router.get('/article/latest',articleControl.latest);
router.get('/article/hot',articleControl.hot);
router.get('/article/:id',articleControl.detail);
router.get('/article/:id/comment',commentControl.detail);
router.get('/category',categoryControl.list);//
router.get('/category/:category/article',categoryControl.articles);//
router.get('/tag',tagControl.list);
router.get('/tag/:tag/article',tagControl.articles);



module.exports = router;