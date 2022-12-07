const router = require('express').Router();
const {
  getSubCategories,
  getSubCategoriesFull,
  getSubCategoriesByGroupName,
  getSubCategoriesByGroupId,
  getSubCategoryById,
  getSubCategoryByName,
  createSubCategory,
  patchSubCategory,
  deleteSubCategory,
  getCategories,
  getCategoryByName,
  getCategoryById,
  createCategory,
  /* sendToDatabase */
  // storeSubCategories
} = require('../controllers/categoryController');

// Adding an subcategory to database
router.post('/sub/add', createSubCategory);

// Recieving all subcategories stored
router.get('/sub/all', getSubCategories);
router.get('/sub/allf', getSubCategoriesFull);
// Recieving an subcategory by id
router.get('/sub/:id', getSubCategoryById);
router.get('/sub/n/:name', getSubCategoryByName);
// Recieve a list of subcategories from a groupName and groupID
router.get('/sub/c/name/:name', getSubCategoriesByGroupName);
router.get('/sub/c/id/:id', getSubCategoriesByGroupId);
// Updating our subcategories data (PUT -- Update all the subcategory, PATCH update part of an subcategory)
router.patch('/sub/p/:id', patchSubCategory)

// Delete
router.delete('/sub/d', deleteSubCategory)

// Category api
router.get('/cat/all', getCategories); // GetAllCategories
router.get('/cat/:name', getCategoryByName); // GetByName
router.get('/cat/id/:id', getCategoryById); // GetByID
router.post('/cat/add', createCategory); // Add a category

// WARN: This is for sending from local to remoteDatabase
// Dont mess with this if u don't know
// router.post('/add', sendToDatabase);
// router.post('/add', storeSubCategories);

module.exports = router;

