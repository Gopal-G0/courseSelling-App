const { Router } = require('express');

const userRouter = Router;

userRouter.post('/user/signup', (req,res) => {

});

userRouter.post('/user/login', (req,res) => {

});

userRouter.post('/user/purchase', (req,res) => {

});

app.get('/user/PurchasedCourses', (req,res) => {

});

module.exports = {
    userRouter: userRouter
}