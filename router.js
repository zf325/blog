"use strict";

const Router = require("koa-router");
const api_v1_router = require("./api_v1_router");
const {viewControl} = require("./control");


let router = new Router();

router.get("/",viewControl.index);//首页
router.get('/article',viewControl.articles);//文章列表页
router.get('/article/:id',viewControl.article);//文章详情页

router.use("/api/v1",api_v1_router.routes(),api_v1_router.allowedMethods());


module.exports = router;