const bcrypt = require('bcrypt');
const express = require("express");
const { User } = require('../models');
const { getUsers, signUp, login, logout } = require('../controllers/UserController');
const authenticate = require('../middleware/auth');

const router = express.Router();


router.get('/protected-route', (req, res) => {
    const token = req.cookies.token || ''; // Extract token from the cookie
    res.json({ message: 'Token retrieved', token });
});

// Sign-up (User Registration) route
router.post('/signup', signUp);

// Login route
router.post('/login', login);

// Logout route (just a placeholder, client will manage token)
router.post('/logout', authenticate, logout); // Protect logout with JWT token
router.get('/', authenticate, getUsers); // Protect logout with JWT token

module.exports = router;
