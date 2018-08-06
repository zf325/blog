"use strict";

const markdown = require("markdown-js");
const {ArticleModel,TagModel} = require("./../model");
const Log = require("./../logs/log");

exports.latest = async(ctx,next)=>{
    const kw = ctx.query.kw||"";
    const page = ctx.query.page||1;
    const size = ctx.query.size||10;
    let sortby = "createdAt";
    const sort = ctx.query.sort||-1;

    let result = {code:-1,msg:"unknow error"};
    sortby = sort === 1?sortby:"-"+sortby;
    try{
        let where = {};
        if(kw){
            where = {$or:{title:kw,body:kw}};
        }
        let articles = await ArticleModel.find(where).select("id title desc views likes tags").limit(size).skip((page-1) * size).sort(sortby).then();

        if(articles){
            result.data = articles;   
        }

        result.code = 0;
        result.msg = "Get latest articles successful."
    }catch(err){
        Log.error("Get latest articles",err.message);
    }

    ctx.body = result;
}

exports.hot = async(ctx,next)=>{


}

//render ejs to html
exports.detail = async(ctx,next)=>{
    const id = ctx.params.id ||"";

    if(id){
        try{

            let article = await ArticleModel.findOne({_id:id}).select("title body authors tages views likes coments").then();

            if(article){

                await ctx.render('article.ejs',article);
                
            }else{
               await ctx.render("404.ejs");
            }

        }catch(err){
            Log.error("Get detail of the article Id:"+id,err.message);
            await ctx.render("400.ejs");
        }
        
    }else{
        result.msg = "The article Id is empty.";
        await ctx.render("404.ejs");
    }

}

exports.list = async(ctx,next)=>{

    const kw = ctx.query.kw||"";
    const page = ctx.query.page||1;
    const size = ctx.query.size||10;
    const sortby = ctx.query.sortby||"createdAt";
    const sort = ctx.query.sort||-1;

    let result = {code:-1,msg:"unknow error"};

    sortby = sort === 1?sortby:"-"+sortby;

    try{
        let where = {};
        if(kw){
            where = {$or:{title:kw,body:kw}};
        }
        let articles = await ArticleModel.find(where).select("title desc author views likes tags").limit(size).skip((page-1) * size).sort(sortby).then();

        if(articles){
            result.data = articles;   
        }

        result.code = 0;
    }catch(err){
        Log.error("Get articles' list",err.message);
    }

    ctx.body = result;

}

exports.create = async(ctx,next)=>{
    const title = ctx.request.body.title||"";
    const body = ctx.request.body.body||"";
    const author = ctx.request.body.author||"";
    let tags = ctx.request.body.tags||"";

    let result = {code:-1,msg:"unknow err"};

    if(title&&body&&author&&tags){

        try{
            tags = tags.split("|")||[];
            let article = await ArticleModel.create({title,body,author,tags}).then();

            tags.map(async(tag)=>{
                await TagModel.update({tag},{$inc:{count:1}},{upsert:true});
            });

            if(article){

                result.code = 0;
                result.msg = "Save successful.";
            }

        }catch(err){
            Log.error("Create new article",err.message);
        }

    }else{
        result.msg = "Some paramsters empty!"
    }
    ctx.body = result;
}

exports.view = async(ctx,next)=>{

    const id = ctx.params.id || "";
    let result = {code:-1,msg:"unknow error"};
    if(id){
        await ArticleModel.update({_id:id},{$inc:{views:1}}).then();
        result.code = 0;
        result.msg = "views increase succesful."
    }else{
        result.msg = "article id empty";
    }

    ctx.body = result;

}

exports.like = async(ctx,next)=>{
    const id = ctx.params.id || "";
    let result = {code:-1,msg:"unknow error"};
    if(id){
       await ArticleModel.update({_id:id},{$inc:{likes:1}}).then();
        result.code = 0;
        result.msg = "likes increase succesful."
    }else{
        result.msg = "article id empty";
    }

    ctx.body = result;
}

