const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { z } = require('zod');
const bcrypt = require('bcryptjs');
const { userModel } = require('../db');
const userRouter = Router();

userRouter.post('/signup', async (req, res) => {

    const requiredBody = z.object({

        email: z.string().min(10).max(50).includes('@'),
        password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/, {
            message: "Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long",
        }).min(8).max(25),

        firstName: z.string().min(4).max(25),
        lastName: z.string().min(2).max(10)
    });

    const parsedData = requiredBody.safeParse(req.body);

    if (!parsedData.success) {

        res.json({
            message: 'Incorrect Format',
            error: parsedData.error.message
        });

        return;
    }

    const { email, password, firstName, lastName } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.insertOne({

        email: email,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName,
    });

    res.json({
        message: 'User signed up successfully'
    });

});

userRouter.post('/login', async (req, res) => {

    const { email, password } = req.body;

    const user = await userModel.findOne({
        email: email
    });

    const passwordValidated = bcrypt.compare(password, user.password);

    if (passwordValidated) {

        const token = jwt.sign({
            id: user._id
        }, process.env.jwt_userSecret);

        // use cookie/session based authentication 
        res.json({
            message: 'Logged in Successfully',
            token: token
        });

    } else {

        res.status(403).json({
            message: "User not found or wrond credentials"
        });
    }

});

userRouter.get('/PurchasedCourses', (req, res) => {
    res.json({
        message: 'Get list of purchased courses'
    });
});

module.exports = {
    userRouter: userRouter
}