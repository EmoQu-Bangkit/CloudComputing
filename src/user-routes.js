//user-routes.js
const express = require('express');
const {
    userRegister,
    userLogin,
    userLogout,
} = require('./userControllers');  // Ensure the correct path to userControllers

const router = express.Router();

router.post('/register', userRegister);
router.get('/register', userRegister);  // Allow registration via URL parameters
router.post('/login', userLogin);
router.get('/login', userLogin);  // Allow login via URL parameters
router.post('/logout', userLogout);

module.exports = {
    routes: router
};
