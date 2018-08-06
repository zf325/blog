"use strict";
const Markdown = require("markdown-it");
const Log = require("./../logs/log");
const {ArticleModel} = require("./../model");
//首页
exports.index = async(ctx,next)=>{

    await ctx.render("index.ejs");

}

//文章详情页
exports.article = async(ctx,next)=>{
    const id = ctx.params.id ||"";

    if(id){
        try{

            let article = await ArticleModel.findOne({_id:id}).select("title body authors tages views likes coments").then();

            if(article){

                const md = new Markdown();
                article.body = md.render(article.body);
                await ctx.render('article.ejs',article);
                
            }else{
               await ctx.render("404.ejs");
            }

        }catch(err){
            Log.error("render the article Id:"+id+"failed",err.message);
            await ctx.render("404.ejs");
        }
        
    }else{
        result.msg = "The article Id is empty.";
        await ctx.render("404.ejs");
    }
}

//文章列表页
exports.articles = async(ctx,next)=>{

}