const router = require('express').Router();
const { signin, signup, verifyToken, getUser, refreshToken } = require('../controllers/userController')

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/user', verifyToken, getUser);
router.get('/refresh', refreshToken, verifyToken, getUser);

module.exports = router;
