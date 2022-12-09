const router = require('express').Router();
const {
  createArticle,
  getArticleById,
  getArticleByName,
  getArticles,
  getArticlesBySubcategory,
  patchArticle,
  deleteArticle,
  deleteManyArticle,
  sendGroupToDatabase,
  searchBySubcategories,
  populateGroup,
  getArticlesBySubcategoryName,
  getArticleWithSubcategories,
  getArticleFullData,
  getSameSubsInArticles,
  // sendToDatabase,
} = require('../controllers/articleController');

// Adding an article to database
// TODO: we need to add a group to the article and their categories
// TODO: we need to add main idea property and general procedure
router.post('/', createArticle);
router.post('/same', getSameSubsInArticles);

// Recieving all articles stored
router.get('/', getArticles);
router.get('/group/g/a/s/:sid', getArticlesBySubcategory);
router.get('/group/g/a/sn/:sname', getArticlesBySubcategoryName);

// Recieving an article by id
router.get('/full/:id', getArticleWithSubcategories);
router.get('/fulldata/:id', getArticleFullData);
router.get('/id/:id', getArticleById);
router.get('/name/:name', getArticleByName);

// Updating our articles data (PUT -- Update all the article, PATCH update part of an article)
router.patch('/p/', patchArticle);

// Delete an article by id
router.delete('/d/', deleteArticle);
router.delete('/ds/', deleteManyArticle);
module.exports = router;

// WARN: This is for sending from local to remoteDatabase
// Dont mess with this if u don't know
// router.post('/add', sendToDatabase);
router.post('/group/add', sendGroupToDatabase);
router.post('/group/look', searchBySubcategories);
router.post('/group/populate', populateGroup);

