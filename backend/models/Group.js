const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: {
    type:String,
    required:true,
    trim:true,
  },
  articleID: {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Article'
  },
  subcategoryID: {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'SubCategory'
  },
})


const Group = mongoose.model('Group', groupSchema)

module.exports.Category = Category
module.exports.SubCategory = SubCategory
