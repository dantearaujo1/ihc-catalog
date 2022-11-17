
const {SubCategory, Category}  = require('../models/Category');
const json = require('../dataa.json');

const createSubCategory = async (req,res) => {

  const {name, categoryID} = req.body;
  const subcategory =  {
    name,
    categoryID,
  }

  if(!name || !categoryID) {
    res.status(422).json({error: 'Fill mandatory fields!'})
    return;
  }

  try {
    await SubCategory.create(subcategory);
    res.status(201).json({message: 'SubCategory successfully stored!'});

  } catch (error) {
     res.status(500).json({error:error});
  }

}

const getSubCategoryById = async (req,res) => {
  const id = req.params.id;
  try {

    const subcategory = await SubCategory.findOne({_id: id});
    if(!subcategory){
      res.status(422).json({message: "SubCategory wasn't found!"});
      return;
    }
    res.status(200).json(subcategory);

  } catch {
     res.status(500).json({error:error});
  }
}

const getSubCategories = async (req, res) => {
  try {
    const subcategories = await SubCategory.find();
    res.status(200).json(subcategories);

  } catch (error) {
     res.status(500).json({error:error});
  }
}

const patchSubCategory = async (req,res) => {
  const id = req.params.id;
  const {name, categoryID }= req.body;
  const subcategory =  {
    name,
    categoryID,
  }

  try {

    const updatedSubCategory = await SubCategory.updateOne({ _id:id }, subcategory);
    if ( updatedSubCategory.matchedCount === 0 ){
      res.status(422).json({message:"SubCategory not found for update!"})
    }
    res.status(200).json(updatedSubCategory);

  } catch {
     res.status(500).json({error:error});
  }
}

const deleteSubCategory = async (req,res) => {
  const id = req.params.id;
  const subcategory = await SubCategory.findOne({_id: id});
  if(!subcategory){
    res.status(422).json({message: "SubCategory not found for delete!"});
    return;
  }
  try {
    await SubCategory.deleteOne({_id:id});
    res.status(200).json({message:'SubCategory removed successfully!'});

  } catch {
     res.status(500).json({error:error});
  }
}

// Send Local data to the database
// const sendToDatabase =  () => {
//   json.complete_detailed_list.map(async  (item) => {
//     const {ux_instruments, reference, year, main_ideia, general_procedure} = item;
//     const article = {
//       name:ux_instruments,
//       reference,
//       year,
//       main:main_ideia,
//       general:general_procedure,
//     }
//
//     try {
//       await Article.create(article);
//       console.log('Article successfully stored');
//     } catch (error){
//       console.log ('Not added with sendToDatabase');
//       console.log (error);
//     }
//
//   });
// }
// module.exports.sendToDatabase = sendToDatabase;


module.exports.createSubCategory = createSubCategory;
module.exports.getSubCategoryById = getSubCategoryById;
module.exports.getSubCategories = getSubCategories;
module.exports.patchSubCategory = patchSubCategory;
module.exports.deleteSubCategory = deleteSubCategory;

const createCategory = async (req,res) => {

  const {name, color} = req.body;
  const subcategory =  {
    name,
    color,
  }

  if(!name) {
    res.status(422).json({error: 'Fill mandatory fields!'})
    return;
  }

  try {
    await Category.create(subcategory);
    res.status(201).json({message: 'Category successfully stored!'});

  } catch (error) {
     res.status(500).json({error:error});
  }

}

const getCategories = async (req, res) => {
 try {
  const categories = await Category.find();
  res.status(200).json(categories);
 } catch (error) {
  res.status(500).json({error:error});
 }
}

module.exports.createCategory = createCategory;
module.exports.getCategories = getCategories;
