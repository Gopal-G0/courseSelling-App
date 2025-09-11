const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { z } = require('zod');
const bcrypt = require('bcryptjs');
const { adminModel, courseModel } = require('../db');
const { adminMiddleware } = require('../middlewares/adminAuth');

const adminRouter = Router();

adminRouter.post('/signup', async (req, res) => {

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

    await adminModel.insertOne({

        email: email,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName,
    });

    res.json({
        message: 'Admin signed up successfully'
    });

});

adminRouter.post('/login', async (req, res) => {
    
    const { email, password } = req.body;

    const admin = await adminModel.findOne({
        email: email
    });

    const passwordValidated = bcrypt.compare(password, admin.password);

    if (passwordValidated) {

        const token = jwt.sign({
            id: admin._id
        }, process.env.jwt_adminSecret);

        // use cookie/session based authentication 
        res.json({
            message: 'Logged in Successfully',
            token: token
        });

    } else {

        res.status(403).json({
            message: "Admin not found or wrond credentials"
        });
    }

});

adminRouter.post('/course', adminMiddleware, async (req, res) => {
    
    const adminId = req.adminId;

    const { title, description, imageUrl, price} = req.body;

    const course = await courseModel.insertOne({

        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price,
        creatorId: adminId

    });

    res.json({
        message: 'Course Created',
        title,
        courseId: course._id
    });

});

adminRouter.put('/course', async (req, res) => {
    
    const adminId = req.adminId;

    const { title, description, imageUrl, price } = req.body;

    const courseFound = await courseModel.findOne({
        title,
        description
    });

    if(courseFound) {

        await courseModel.updateOne({
            title: title,
            description: description,
            imageUrl: imageUrl,
            price: price,
            creatorId: adminId
        });
    }

});

adminRouter.get('/getCourses', (req, res) => {
    res.json({
        message: 'Admin can preview courses and can create too'
    });

});

module.exports = {
    adminRouter: adminRouter
}