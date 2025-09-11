const { Router } = require('express');
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
    console.log(hashedPassword);

    await userModel.insertOne({

        email: email,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName,
        salt
    });

    res.json({
        message: 'User signed up successfully'
    });

});

userRouter.post('/login', (req, res) => {


});

userRouter.get('/PurchasedCourses', (req, res) => {
    res.json({
        message: 'Get list of purchased courses'
    });
});

module.exports = {
    userRouter: userRouter
}