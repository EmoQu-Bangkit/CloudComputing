//userController.js
'use strict';

const User = require('./user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const userRegister = async (req, res) => {
    try {
        const firstName = req.body.firstName || req.query.firstName;
        const lastName = req.body.lastName || req.query.lastName;
        const email = req.body.email || req.query.email;
        const password = req.body.password || req.query.password;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).send({
                error: true,
                message: 'All fields are required'
            });
        }

        const user = new User(firstName, lastName, email, password);
        await user.save();
        res.status(201).send({
            error: false,
            message: 'User registered successfully'
        });
    } catch (error) {
        console.error("Registration error:", error.message);
        res.status(400).send({
            error: true,
            message: error.message
        });
    }
};

const userLogin = async (req, res) => {
    try {
        const email = req.body.email || req.query.email;
        const password = req.body.password || req.query.password;

        if (!email || !password) {
            return res.status(400).send({
                error: true,
                message: 'Email and password are required'
            });
        }

        const userSnapshot = await User.get(email);
        if (!userSnapshot) {
            return res.status(404).send({
                error: true,
                message: 'User not found'
            });
        }
        const user = userSnapshot.data();
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).send({
                error: true,
                message: 'Incorrect password'
            });
        }
        const data = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        };
        const token = jwt.sign(data, process.env.KEY_JWT, { expiresIn: "1d" });

        res.send({
            error: false,
            message: 'User login successfully',
            loginResult: {
                userId: user.id,
                name: `${user.firstName} ${user.lastName}`,
                token: token
            }
        });
    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).send({
            error: true,
            message: 'Internal server error'
        });
    }
};

const userLogout = async (req, res) => {
    res.send({
        error: false,
        message: 'Logged out successfully'
    });
};

module.exports = {
    userRegister,
    userLogin,
    userLogout
};