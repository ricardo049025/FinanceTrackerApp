const authController = require('../controllers/authController');
const express = require('express');
const router = express.Router();

//routers
router.post('/signup', authController.registerUser);
router.post('/login', authController.loginUser);

module.exports = router;