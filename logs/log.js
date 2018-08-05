"use strict";
/**
 * log middleware
 * 
 */
//todo 设计 log 结构，方法，形式 
const fs = require("fs");
const path = require("path");

function Log(){
    this.message = errMsg;
}

Log.debug = (desc,errMsg)=>{
    console.log(errMsg);
}

Log.info = (desc)=>{
    const env = process.env.NODE_ENV||"development";
    const temp = `[${new Date().toLocaleString()}][info] ${desc}`;
    if(env === 'development1'){
        console.log(temp);
    }else{
        Log.writeLog(temp);
    }
}

Log.writeLog = (log)=>{
    const date = new Date();
    const file = `${date.getFullYear()}-${date.getMonth() + 1}`;
    const filepath = path.join(__dirname,`./${file}.log`);
    if(fs.existsSync(filepath)){
        fs.appendFileSync(filepath,log+"\r\n");
    }else{
        fs.writeFileSync(filepath,log)+"\r\n";
    }
}

Log.error = (desc,err)=>{
    const env = process.env.NODE_ENV||"development";
    const temp = `[${new Date().toLocaleString()}][error][${desc}] ${err}`;
    if(env === 'development'){
        console.log(temp);
    }else{
        Log.writeLog(temp);
    }
}

module.exports = Log;