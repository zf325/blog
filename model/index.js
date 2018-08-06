const mongoose = require("mongoose");
const config = require("./../config.default");
mongoose.connect(config.db,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("connect to mongoodb successful!");
    }
});

const ArticleModel = mongoose.model("article",require("./article"));
const TagModel = mongoose.model("tag",require("./tag"));

module.exports = {
    ArticleModel,
    TagModel
};