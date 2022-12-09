const router = require('express').Router();
const { signin, signup, logout, verifyToken, getUser, refreshToken } = require('../controllers/userController')

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/logout', verifyToken, logout);
router.get('/user', verifyToken, getUser);
router.get('/refresh', refreshToken, verifyToken, getUser);

module.exports = router;
