const router = require('express').Router();
const {
  getAllSuggestions,
  createSuggestion,
  approveSuggestion,
  disapproveSuggestion,
  createOne,
} = require('../controllers/suggestionController');

router.post('/', createSuggestion);
router.post('/createOne', createOne);
router.patch('/p/a', approveSuggestion );
router.patch('/p/d', disapproveSuggestion );
// Recieving all articles stored
router.get('/', getAllSuggestions);
module.exports = router;
