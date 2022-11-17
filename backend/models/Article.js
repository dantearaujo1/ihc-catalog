const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  name: {
    type:String,
    required:true,
    trim:true,
  },
  reference: {
    type:String,
    trim:true,
  },
  year: {
    type:Number,
  },
  main: {
    type:String,
  },
  general: {
    type:String,
  },
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article
