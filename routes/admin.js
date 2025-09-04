const { Router } = require('express');

const adminRouter = Router();

adminRouter.post('/signup', (req,res) => {
    res.json({
        message: 'Admin signup endpoint'
    });

});

adminRouter.post('/login', (req,res) => {
    res.json({
        message: 'Admin login endpoint'
    });

});

adminRouter.post('/course', (req,res) => {
    res.json({
        message: 'Admin can preview courses and can create too'
    });

});

adminRouter.put('/course', (req,res) => {
    res.json({
        message: 'Admin can preview courses and can create too'
    });

});

adminRouter.get('/getCourses', (req,res) => {
    res.json({
        message: 'Admin can preview courses and can create too'
    });

});

module.exports = {
    adminRouter: adminRouter
}