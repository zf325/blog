"use strict";

const markdown = require("markdown-js");
const {ArticleModel} = require("./../model");
const Log = require("./../logs/log");

exports.latest = async(ctx,next)=>{
    const kw = ctx.query.kw||"";
    const page = ctx.query.page||1;
    const size = ctx.query.size||10;
    const sortby = ctx.query.sortby||"createdAt";
    const sort = ctx.query.sort||-1;

    let result = {code:-1,msg:"unknow error"};

    try{
        let where = {};
        if(kw){
            where = {$or:{title:kw,body:kw}};
        }
        let articles = await ArticleModel.find(where).select("id title desc views likes tags").limit(size).skip((page-1) * size).sort({sortby:sort}).then();

        if(articles){
            result.data = articles;   
        }

        result.code = 0;
    }catch(err){
        Log.error("Get latest articles",err.message);
    }

    ctx.body = result;
}

exports.hot = async(ctx,next)=>{


}

exports.detail = async(ctx,next)=>{

}

exports.list = async(ctx,next)=>{

    const kw = ctx.query.kw||"";
    const page = ctx.query.page||1;
    const size = ctx.query.size||10;
    const sortby = ctx.query.sortby||"createdAt";
    const sort = ctx.query.sort||-1;

    let result = {code:-1,msg:"unknow error"};

    try{
        let where = {};
        if(kw){
            where = {$or:{title:kw,body:kw}};
        }
        let articles = await ArticleModel.find(where).limit(size).skip((page-1) * size).sortby(sortby,sort).then();

        if(articles){
            console.log(articles);
            result.data = articles;   
        }

        result.code = 0;
    }catch(err){
        Log.error("Get articles' list",err.message);
    }

    ctx.body = result;

}

exports.create = async(ctx,next)=>{
    const title = ctx.request.query.title||"";
    const body = ctx.request.query.body||"";
    const author = ctx.request.query.author||"";
    const tags = ctx.request.query.tags||"";

    let result = {code:-1,msg:"unknow err"};

    if(title&&body&&author&&tags){

        try{
            let article = await ArticleModel.create({title,body,author,tags}).then();

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

