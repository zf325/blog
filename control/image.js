"use strict";

const fs = require("fs");

exports.upload = async(ctx,next)=>{
    let result = {code:-1,msg:"unknow error"};
    console.log(ctx.request.files);    

}

exports.download = async(ctx,next)=>{

}