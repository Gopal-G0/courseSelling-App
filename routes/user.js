const { Router } = require('express');
const { bcrypt } = require('bcrypt');
const { userModel } = require('../db');
const userRouter = Router();

userRouter.post('/signup', async (req,res) => {
    
    const { email, password, firstName, lastName } = req.body;

    const hashedPassword = bcrypt.hash(password,5);

    await userModel.insertOne({

        email: email,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName

    });

    res.json({
        message: 'User signed up successfully'
    });

});

userRouter.post('/login', (req,res) => {
    

});

userRouter.get('/PurchasedCourses', (req,res) => {
    res.json({
        message: 'Get list of purchased courses'
    });
});

module.exports = {
    userRouter: userRouter
}