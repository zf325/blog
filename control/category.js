"use strict";
const {CategoryModel,ArticleModel} = require("./../model");
const Log = require("./../logs/log");

exports.list = async(ctx,next)=>{
    let result = {code:-1,msg:"unknow error"};

    try{
        let categories = await CategoryModel.find().select("category").then();
        result.data = categories;
        result.code = 0;
        result.msg = "get all categories successful.";
    }catch(err){
        Log.error("get all categories",err.message);
    }
    ctx.body = result;
}

exports.articles = async(ctx,next)=>{

    let result = {code:-1,msg:"unknow error"};

    const category = ctx.params.category||"";

    if(category){
        let articles = await ArticleModel.find({category}).then();
        result.data = articles;
        result.code = 0;
        result.msg = "get articles by category successful.";
    }else{
        result.msg = "params category empty";
    }

    ctx.body = result;
}

exports.new = async(ctx,next)=>{
    let category = ctx.request.body||"";
    let result = {code:-1,msg:"unknow error"};
    if(category){
        try{
            await CategoryModel.create({category}).then();
            result = {code:0,msg:"create new category successful."};
        }catch(err){
            Log.error("create new category",err.message);
        }
    }else{
        result.msg = "params error";
    }
    ctx.body = result;
}

