const router = require('express').Router();
const {
  createArticle,
  getArticleById,
  getArticleByName,
  getArticles,
  patchArticle,
  deleteArticle,
  sendGroupToDatabase,
  // sendToDatabase,
} = require('../controllers/articleController');

// Adding an article to database
// TODO: we need to add a group to the article and their categories
// TODO: we need to add main idea property and general procedure
router.post('/', createArticle);

// Recieving all articles stored
router.get('/', getArticles);

// Recieving an article by id
router.get('/id/:id', getArticleById);
router.get('/name/:name', getArticleByName);

// Updating our articles data (PUT -- Update all the article, PATCH update part of an article)
router.patch('/:id', patchArticle)

// Delete an article by id
router.delete('/:id', deleteArticle)
module.exports = router;

// WARN: This is for sending from local to remoteDatabase
// Dont mess with this if u don't know
// router.post('/add', sendToDatabase);
router.post('/group/add', sendGroupToDatabase)

