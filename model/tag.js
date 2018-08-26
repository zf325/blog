"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TagSchema = new Schema({
    tag:{
        type:String,
        unique:true,
        index:true
    },
    name:{
        type:String,
        unique:true
    },
    count:{
        type:Number,
        default:0
    }
});

module.exports = TagSchema;