const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
    photo: {
        type: String, 
    },
   name: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true,
        match: /^[0-9]{10}/ 
    },
    address: {
        type: String
    },
    department: {
        type: String
    }, 
    batch: {
        type: String
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;