const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Define a rota POST para /register e associa ao método register do controller
router.post('/register', authController.register);

// Futuramente, você adicionará a rota de login aqui também
// router.post('/login', authController.login);

module.exports = router;