"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title:{
        type:String,
        require:true,
        index:true
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
    hidden:Boolean,
    views:{
        type:Number,
        default:0
    },
    likes:{
        type:Number,
        default:0
    },
    category:String,
    createdAt:{
        type:Date,
        default:Date.now()
    }
});

module.exports = ArticleSchema;