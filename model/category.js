"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    category:{
        type:String,
        index:true,
        unique:true
    },
    name:{
        type:String,
        unique:true
    },
    article_count:{
        type:String,
        default:0
    }
});

module.exports = CategorySchema;