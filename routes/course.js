const { Router } = require('express');
const courseRouter = Router();
const { courseModel, purchaseModel } = require('../db');
const { userMiddleware } = require('../middlewares/userAuth');

courseRouter.post('/purchase', userMiddleware, async (req, res) => {

    const title = req.body.title;

    const response = await courseModel.find({
        title
    });

    try {

        await purchaseModel.insertOne({

            userId: req.userId,
            courseId: response._id,
            response
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

courseRouter.get('/preview', (req, res) => {
    res.json({
        message: 'get preview of the course'
    });
});

module.exports = {
    courseRouter: courseRouter
}
