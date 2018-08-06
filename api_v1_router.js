"use strict";

const Router = require("koa-router");
const {articleControl,commentControl,categoryControl,tagControl} = require("./control");
const router = new Router();


router.get('/article',articleControl.list);//文章列表
router.post("/article",articleControl.create);//写文章
router.get('/article/latest',articleControl.latest);//最新文章列表
router.get('/article/hot',articleControl.hot);//热门文章推荐
router.put('/article/:id/view',articleControl.view);//浏览
router.put('/article/:id/like',articleControl.like);//喜欢
router.get('/article/:id/comment',commentControl.detail);//文章评论

router.get('/category',categoryControl.list);
router.post('/category',categoryControl.new);
router.get('/category/:category/article',categoryControl.articles);
router.get('/tag',tagControl.list);
router.get('/tag/:tag/article',tagControl.articles);

module.exports = router;

