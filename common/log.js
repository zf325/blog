"use strict";
/**
 * log middleware
 * 
 */
//todo 设计 log 结构，方法，形式 

function Log(){
    this.message = errMsg;
}

Log.prototype.debug = (errMsg)=>{
    console.log(errMsg);
}

module.exports = Log;