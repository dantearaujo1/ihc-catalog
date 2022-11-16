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
  type: {
    type:String,
    required:true,
  },
  year: {
    type:Number,
  },
  groups: {
    type:String,
  },
  contents: {
    type:String,
  },
})

const Article = mongoose.model('Articles', articleSchema)

module.exports = Article
