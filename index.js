const express = require('express');
const jwt = require('jsonwebtoken');
const { userRouter } = require('./routes/user');

const app = express();

app.use('/user',userRouter);
app.use('/course',courseRouter);

app.get('/courses', (req,res) => {

});

app.listen(3000, () => {
    console.log('Server is running on port: 3000');
});
