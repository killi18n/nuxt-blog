"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var post = new Schema({
    title: String,
    body: String,
    tags: [String],
    publishedDate: {
        type: Date,
        default: new Date(),
    },
});
exports.default = mongoose.model('Post', post);
