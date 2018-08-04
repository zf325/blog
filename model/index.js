const mongoose = require("mongoose");
const config = require("./../config.default");
mongoose.connect(config.db,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("connect to mongoodb successful!");
    }
});