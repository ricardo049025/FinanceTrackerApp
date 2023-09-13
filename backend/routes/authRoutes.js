const authController = require('../controllers/authController');
const fileUpload = require('../middleware/file-upload');
const {check} = require('express-validator');
const express = require('express');
const router = express.Router();

//routers
router.post('/signup', fileUpload.single('image'),[check('name').not().isEmpty() ,check('email').not().isEmpty(), check('email').normalizeEmail().isEmail(), check('password').not().isEmpty(), check('password').isLength({min: 5})],authController.registerUser);
router.post('/login', [check('email').not().isEmpty(), check('email').normalizeEmail().isEmail(), check('password').not().isEmpty(), check('password').isLength({min: 5})] ,authController.loginUser);

module.exports = router;