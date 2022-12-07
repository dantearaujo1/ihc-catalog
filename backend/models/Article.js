const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  name: {
    type:String,
    required:true,
    trim:true,
  },
  reference: {
    type:String,
    required:true,
    trim:true,
  },
  year: {
    type:Number,
    required:true,
  },
  main: {
    type:String,
  },
  general: {
    type:String,
  },
  link: {
    type:String,
  },
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article
