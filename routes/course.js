const { Router } = require('express');
const courseRouter = Router();
const courseModel = require('../db');


courseRouter.post('/purchase', (req,res) => {
    res.json({
        message: 'purchase the course'
    });
});

courseRouter.get('/preview', (req,res) => {
    res.json({
        message: 'get preview of the course'
    });
});

module.exports = {
    courseRouter: courseRouter
}
