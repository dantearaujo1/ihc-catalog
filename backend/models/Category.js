const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type:String,
    required:true,
    trim:true,
  },
  color: {
    type:String,
  }
})

const subCategorySchema = new mongoose.Schema({
  name: {
    type:String,
    required:true,
    trim:true,
  },
  categoryID:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }
})

const Category = mongoose.model('Category', categorySchema)
const SubCategory = mongoose.model('SubCategory', subCategorySchema)

module.exports.Category = Category
module.exports.SubCategory = SubCategory
