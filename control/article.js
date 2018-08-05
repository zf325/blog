"use strict";

const markdown = require("markdown-js");
const {ArticleModel} = require("./../model");
const Log = require("./../logs/log");

exports.latest = async(ctx,next)=>{

}

exports.hot = async(ctx,next)=>{


}

exports.detail = async(ctx,next)=>{

}

exports.list = async(ctx,next)=>{

}

exports.create = async(ctx,next)=>{
    const title = ctx.request.body.title||"";
    const body = ctx.request.body.body||"";
    const author = ctx.request.body.author||"";
    const tags = ctx.request.body.tags||"";

    let result = {code:-1,msg:"unknow err"};

    if(title&&body&&author&&tags){

        try{
            let article = ArticleModel.create({title,body,author,tags}).then();

            if(article){
                console.log(article);
                result.code = 0;
                result.msg = "Save successful.";
            }

        }catch(err){
            Log.error("Create new article",err.message);
        }

    }else{
        result.msg = "Some paramsters empty!"
    }

}

