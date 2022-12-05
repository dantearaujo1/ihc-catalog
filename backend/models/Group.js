const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  articleID: {
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref: 'Article'
  },
  subcategoryID: {
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref: 'SubCategory'
  },
})


const Group = mongoose.model('Group', groupSchema)

module.exports.Group = Group
