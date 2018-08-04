"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Article = new Schema({
    // id:{
    //     type:Schema.ObjectId
    // },
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

        }
    ],
    hidden:Boolean,
    meta:{
        like:Number,
        votes:Number
    },
    category:String,
    createdAt:{
        type:Date,
        default:Date.now()
    }
})