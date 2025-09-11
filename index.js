const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const { userRouter } = require('./routes/user');
const { courseRouter } = require('./routes/course');
const { adminRouter } = require('./routes/admin');

const app = express();

app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/course', courseRouter);

async function main() {
    
    console.log('Connecting to Database...');
    await mongoose.connect('mongodb+srv://heyitsmegopal:gopalji7715@cluster0.bpqrn8x.mongodb.net/courseSelling-App');
    console.log('Successfully connected to db..');
    app.listen(3000, () => {
        console.log('Server is running on port: 3000');
    });

}

main();

