"use strict";
/**
 * log middleware
 * 
 */
//todo 设计 log 结构，方法，形式 

function Log(){
    this.message = errMsg;
}

Log.debug = (desc,errMsg)=>{
    console.log(errMsg);
}

Log.info = (desc)=>{
    const env = process.env.NODE_ENV||"development";
    const temp = `[${new Date().toLocaleString()}][info] ${desc}`;
    if(env === 'development'){
        console.log(temp);
    }else{
        Log.writeLog(temp);
    }
}

Log.writeLog = (desc,err)=>{

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