"use strict";
const fs = require("fs");
const path = require("path");
const koaSend = require("koa-send");
const Log = require("./../logs/log");

exports.upload = async(ctx,next)=>{

    let result = {code:-1,msg:"unknow error"};
    
    try{
        const file = ctx.request.files.file;
        const extName = path.extname(file.name);
        const savePath = path.join(__dirname,`./../data/images/${file.hash}${extName}`);

        if(fs.existsSync(`${file.hash}${extName}`)){
            return ctx.body = {code:0,msg:"upload image successful.",reqUrl:`/images/${file.hash}${extName}`};
        }

        await copyFile(file.path,savePath,true);

        return ctx.body = {code:0,msg:"upload image successful.",reqUrl:`/images/${file.hash}${extName}`};

    }catch(err){

        Log.error("User uploaded image failed.",err.message);
    }

    ctx.body = result;

}

exports.download = async(ctx,next)=>{
    const image = ctx.path.split("/").pop();
    const imagePath = path.join("./../data/images",image);
    try{
        if(fs.existsSync(path.join(__dirname,imagePath))){
            await koaSend(ctx,image,{root:path.join(__dirname,"./../data/images")});
        }else{
            return ctx.statusCode = 404;
        }
    }catch(err){
        Log.error("dwnload image failed.",err.message);
        await ctx.render("500.ejs");

    }

}

/**
 * 
 * @param {string} from 文件原路径
 * @param {string} to 文件拷贝路径
 * @param {boolean} unlink 删除？true:删除
 */
function copyFile(from,to,unlink){
    const fs = require("fs");

    if(from&&to){
        return new Promise((resolve,reject)=>{
            fs.createReadStream(from).pipe(fs.createWriteStream(to)).on("error",(err)=>{
                return reject(err);
            })
            .on("close",()=>{

                if(unlink){
                    fs.unlinkSync(from);
                }
                return resolve({msg:"ok",path:to});
            });
        });
    }else{
        return Promise.reject(new Error("params error"));
    }

}

