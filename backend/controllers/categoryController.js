
const {SubCategory, Category}  = require('../models/Category');
const { Group }  = require('../models/Group');
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
    res.status(201).json({message: 'Subcategory successfully stored!'});

  } catch (error) {
     res.status(500).json({error:error});
  }

}

const getSubCategoryByName = async (req,res) => {
  const subName = req.params.name;
  try {

    const subcategory = await SubCategory.findOne({name: subName});
    if(!subcategory){
      res.status(422).json({message: "SubCategory wasn't found!"});
      return;
    }
    res.status(200).json(subcategory);

  } catch {
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

  } catch (error) {
     res.status(500).json({error:error});
  }
}
const getSubCategoriesByGroupName = async (req,res) => {
  const name = req.params.name;
  try {

    const category = await Category.findOne({name:name});
    if(!category){
      return res.status(422).json({message: "Couldn't find any category with this name!"})
    }
    // Getting subcategorys from a category sorted ascendent by name
    const subcategoryList = await SubCategory.find({categoryID: category._id}).sort({name:1});
    if(!subcategoryList){
      return res.status(422).json({message: "There is no subcategory inside this category group"});
    }
    res.status(200).json(subcategoryList);

  } catch (error) {
     res.status(500).json({error:error});
  }
}

const getSubCategoriesByGroupId = async (req,res) => {
  const id = req.params.id;
  try {
    const subcategoryList = await SubCategory.find({categoryID: id});
    if(!subcategoryList){
      res.status(422).json({message: "There is no subcategory inside this category group"});
      return;
    }
    res.status(200).json(subcategoryList);

  } catch (error) {
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

const getSubCategoriesFull = async (req, res) => {
  try {
    const subcategories = await SubCategory.find().populate({path:'categoryID'});
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
    res.status(200).json({message:"Subcategory patched!", data:updatedSubCategory});

  } catch {
     res.status(500).json({error:error});
  }
}

const deleteSubCategory = async (req,res) => {
  const {id} = req.body
  try {
    const subcategory = await SubCategory.findOne({_id: id});
    if(!subcategory){
      res.status(422).json({message: "Subcategory not found for delete!"});
      return;
    }
    await SubCategory.deleteOne({_id:id});
    const count = await Group.deleteMany({subcategoryID:id})
    res.status(200).json({message:'Subcategory removed successfully!', referencesCountDeleted: count});

  } catch (err) {
     res.status(500).json({error:err});
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
const getCategoryByName = async (req, res) => {
  const categoryName = req.params.name;
  try {
    const category = await Category.find({name:categoryName});
    if(category.length === 0){
      return res.status(422).json({message:"Could not find any category with this name!"})
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({error:error});
  }
}
const getCategoryById = async (req, res) => {
  const categoryID = req.params.id;
  try {
    const category = await Category.findOne({_id:categoryID});
    if(category.length === 0){
      return res.status(422).json({message:"Could not find any category with this ID!"})
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({error:error});
  }
}


// WARN: THIS IS FOR SEND LOCAL TO REMOTE DATABASE TAKE CARE
// Tying to send data to our database
// This is a list of lists that contains a subcategory and the category that it belongs to
// const sanitezed = require('../sanitized_data.json');
//
// // Get each list of subcategories
// const storeSubCategories = async (req,res) => {
//   sanitezed.map( (lists,index) => {
//     // Objs will be an object with categoryName and subCategory name
//     lists.map( async (objs, index) => {
//       let category = {};
//       try {
//         if (objs.categoryName === 'framework'){
//           const cname = objs.categoryName[0].toUpperCase() + objs.categoryName.slice(1);
//           category = await Category.find({name:cname});
//         }
//         else{
//           category = await Category.find({name:objs.categoryName})
//         }
//
//         if (!category){
//           res.status(422).json({message: 'category not found'})
//         }
//         const subcategory = {
//           name: objs.name,
//           categoryID: category[0]._id
//         }
//         await SubCategory.create(subcategory);
//         // res.status(201).json({message: 'Subcategory named ' + objs.name + ' was added!'})
//
//       } catch (err) {
//         res.status(500).json({error:err});
//       }
//     } );
//   } );
// }
// module.exports.storeSubCategories = storeSubCategories;



module.exports.createCategory = createCategory;
module.exports.getCategories = getCategories;
module.exports.getCategoryByName = getCategoryByName;
module.exports.getCategoryById = getCategoryById;
module.exports.createSubCategory = createSubCategory;
module.exports.getSubCategoryById = getSubCategoryById;
module.exports.getSubCategoryByName = getSubCategoryByName;
module.exports.getSubCategoriesByGroupName = getSubCategoriesByGroupName;
module.exports.getSubCategoriesByGroupId  = getSubCategoriesByGroupId ;
module.exports.getSubCategories = getSubCategories;
module.exports.getSubCategoriesFull = getSubCategoriesFull;
module.exports.patchSubCategory = patchSubCategory;
module.exports.deleteSubCategory = deleteSubCategory;
