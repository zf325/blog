"use strict";
const {TagModel} = require("./../model");
const Log = require("./../logs/log");
exports.list = async(ctx,next)=>{

    let result = {code:-1,msg:"unknow error"};

    try{
        let tags = await TagModel.find().select("tag").sort("-count").then();
        result.data = tags;
        result.code = 0;
        result.msg = "get hot Tags successful.";
    }catch(err){
        Log.error("get Tags by count desc",err.message);
    }

    ctx.body = result;
}

exports.articles = async(ctx,next)=>{
    
}