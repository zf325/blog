"use strict";

const Router = require("koa-router");
const markdown = require("markdown-it");
const {viewControl,articleControl,commentControl,categoryControl,tagControl} = require("./control");
const md = new markdown();
const body =md.render("# first");


let router = new Router();
router.get("/test",async(ctx,next)=>{
    ctx.body = {code:0};
});
router.get("/",viewControl.index);

router.post("/article",articleControl.create);
router.get('/article/latest',articleControl.latest);
router.get('/article/hot',articleControl.hot);
router.get('/article/:id',articleControl.detail);
router.put('/article/:id/view',articleControl.view);
router.put('/article/:id/like',articleControl.like);
router.get('/article/:id/comment',commentControl.detail);

router.get('/category',categoryControl.list);
router.post('/category',categoryControl.new);
router.get('/category/:category/article',categoryControl.articles);

router.get('/tag',tagControl.list);
router.get('/tag/:tag/article',tagControl.articles);





module.exports = router;