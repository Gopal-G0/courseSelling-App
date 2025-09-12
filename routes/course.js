const { Router } = require('express');
const courseRouter = Router();
const { courseModel, purchaseModel } = require('../db');
const { userMiddleware } = require('../middlewares/userAuth');

courseRouter.post('/purchase', userMiddleware, async (req, res) => {

    const title = req.body.title;

    try {

        const course = await courseModel.findOne({
            title
        });

        console.log(course.title);
        console.log(course.description);
        console.log(course.price);
        console.log(req.userId);

        await purchaseModel.create({

            userId: req.userId,
            courseId: course._id,
            title: course.title,
            description: course.description,
            price: course.price
        });

        res.json({
            message: `You have successfully bought the course : ${title}`
        });

    } catch (e) {

        res.status(404).json({
            errMessage: 'Course doesnt exist'

        });

        return;
    }

});

courseRouter.get('/preview', async (req, res) => {
    
    const courses = await courseModel.find({});

    res.json({
        courses
    });

});

module.exports = {
    courseRouter: courseRouter
}
