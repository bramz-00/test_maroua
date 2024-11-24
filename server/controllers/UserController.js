// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Helper function to generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email }, 
    process.env.JWT_SECRET, 
    { expiresIn: '1h' }
  );
};

// Sign-up (User Registration)
const signUp = async (req, res) => {
  const { fullname, lastname, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({ fullname, lastname, email, password: hashedPassword });

    // Generate JWT token
    const token = generateToken(user);

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login (Authenticate User)
const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Créer un token JWT
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      // Définir le cookie HttpOnly et sécurisé
      res.cookie('token', token, {
        httpOnly: true,  // Empêche l'accès au cookie via JavaScript
        secure: process.env.NODE_ENV === 'production',  // Active Secure en production
        maxAge: 3600000,  // 1 heure
      });
  
      res.json({ message: 'Logged in successfully' , token:token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

// Logout (Optional - Client-side Token Removal)
const logout = (req, res) => {
  res.json({ message: 'Logged out successfully' });
};



const getUsers =async (req, res) => {
    const users = await User.findAll();
    res.json(users);
  };
  
module.exports = { signUp, login, logout,getUsers };
