const express = require('express');
require('dotenv').config();
console.log(process.env.db_connectionUrl);
const mongoose = require('mongoose');

const { userRouter } = require('./routes/user');
const { courseRouter } = require('./routes/course');
const { adminRouter } = require('./routes/admin');

const app = express();
app.use(express.json());

app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/course', courseRouter);

async function main() {
    
    console.log('Connecting to Database...');
    await mongoose.connect(process.env.db_connectionUrl);
    console.log('Successfully connected to db..');
    app.listen(3000, () => {
        console.log('Server is running on port: 3000');
    });

}

main();

