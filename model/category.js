"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    category:String,
    article_count:{
        type:String,
        default:0
    }
});

module.exports = CategorySchema;