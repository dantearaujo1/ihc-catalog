const mongoose = require("mongoose");

const Article = mongoose.model('Article', {
  name: String,
  reference: String,
  year: Number,
  type: String,
  groups: Array,
  contents: Object
})

module.exports = Article
