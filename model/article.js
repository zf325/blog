"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title:{
        type:String,
        require:true,
        index:true
    },
    desc:{
        type:String
    },
    body:{
        type:String,
        require:true
    },
    author:{
        type:String
    },
    tags:[String],
    coments:[
        {
            username:String,
            email:{
                type:String,
                validate:function(email){
                    return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(email);
                },
                require:true
            },
            content:{
                type:String,

            }

        }
    ],
    hidden:{
        type:Boolean,
        default:false
    },
    views:{
        type:Number,
        default:1
    },
    likes:{
        type:Number,
        default:1
    },
    category:String,
    createdAt:{
        type:Date,
        default:Date.now()
    }
});

module.exports = ArticleSchema;