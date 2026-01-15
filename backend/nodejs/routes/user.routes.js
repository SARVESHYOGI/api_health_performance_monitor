const express = require('express');
const router = express.Router();
const pool = require('../db');
const { registerUser, loginUser } = require('../controllers/user.controller');

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;