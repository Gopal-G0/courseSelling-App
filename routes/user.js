const { Router } = require('express');
const userModel = require('../db');
const userRouter = Router();

userRouter.post('/signup', (req,res) => {
    res.json({
        message: 'signup endpoint'
    });
});

userRouter.post('/login', (req,res) => {
    res.json({
        message: 'login endpoint'
    });
});

userRouter.get('/PurchasedCourses', (req,res) => {
    res.json({
        message: 'Get list of purchased courses'
    });
});

module.exports = {
    userRouter: userRouter
}