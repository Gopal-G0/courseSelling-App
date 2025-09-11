const mongoose = require('mongoose');
console.log('connecting to databse...');
mongoose.connect('mongodb+srv://heyitsmegopal:gopalji7715@cluster0.bpqrn8x.mongodb.net/courseSelling-App');
console.log('connected.');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const userSchema = new Schema({

    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String

});

const adminSchema = new Schema({

    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String
});

const courseSchema = new Schema({

    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: ObjectId

});

const purchaseSchema = new Schema({

    userId: ObjectId,
    courseId: ObjectId

});

const userModel = mongoose.model('users', userSchema);
const adminModel = mongoose.model('admin', adminSchema);
const courseModel = mongoose.model('courses', courseSchema);
const purchaseModel = mongoose.model('purchases', purchaseSchema);

module.exports = {
    userModel: userModel,
    adminModel: adminModel,
    courseModel: courseModel,
    purchaseModel: purchaseModel
}