const mongoose = require("mongoose");

const suggestionSchema = new mongoose.Schema({
  name: {
    type:String,
    required:true,
    trim:true,
  },
  email: {
    type:String,
    required:true,
    trim:true,
  },
  link:{
    type:String,
    required:true,
    trim:true,
  },
  status: {
    type:String,
    default: 'Not checked'
  },
  description: {
    type:String,
  },
  sentDate: {
    type:Date,
    default: Date.now,
  },
  updateAt: {
    type:Date,
    default: null
  }
})

const Suggestion = mongoose.model('Suggestion', suggestionSchema)

module.exports = Suggestion
