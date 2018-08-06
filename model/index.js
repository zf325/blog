"use strict";
const mongoose = require("mongoose");
const config = require("./../config.default");
const Log = require("./../logs/log");

mongoose.connect(config.db,(err)=>{
    if(err){
        Log.error("create connection to mongodb,"+config.db,err);
    }else{
       Log.info("connect to mongoodb successful!");
    }
});

const ArticleModel = mongoose.model("article",require("./article"));
const TagModel = mongoose.model("tag",require("./tag"));
const CategoryModel = mongoose.model("category",require("./category"));

module.exports = {
    ArticleModel,
    TagModel,
    CategoryModel
};