const router = require('express').Router();
const {
  getAllSuggestions,
  createSuggestion,
  deleteManySuggestions,
  approveSuggestion,
  disapproveSuggestion,
  approveManySuggestions,
  disapproveManySuggestions,
  createOne,
} = require('../controllers/suggestionController');

router.post('/', createSuggestion);
router.post('/createOne', createOne);
router.patch('/p/a', approveSuggestion );
router.patch('/p/d', disapproveSuggestion );
router.patch('/p/as', approveManySuggestions );
router.patch('/p/ds', disapproveManySuggestions );
// Recieving all articles stored
router.get('/', getAllSuggestions);
router.delete('/ds', deleteManySuggestions);
module.exports = router;
