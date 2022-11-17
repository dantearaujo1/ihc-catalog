const router = require('express').Router();
const { createSubCategory, getSubCategoryById, getSubCategories, patchSubCategory, deleteSubCategory, createCategory, getCategories,  /* sendToDatabase */} = require('../controllers/categoryController');

// Adding an subcategory to database
router.post('/sub/add', createSubCategory);

// Adding an category to database
router.post('/cat/add', createCategory);

// WARN: This is for sending from local to remoteDatabase
// Dont mess with this if u don't know
// router.post('/add', sendToDatabase);

// Recieving all subcategories stored
router.get('/sub/all', getSubCategories);
// Adding an category to database
router.post('/cat/all', getCategories);

// Recieving an subcategory by id
router.get('sub/:id', getSubCategoryById);

// Updating our subcategories data (PUT -- Update all the subcategory, PATCH update part of an subcategory)
router.patch('sub/:id', patchSubCategory)

// Delete an subcategory by id
router.delete('sub/:id', deleteSubCategory)
module.exports = router;
