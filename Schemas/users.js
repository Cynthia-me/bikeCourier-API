const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        max: 255,
    },
    lastName: {
        type: String,
        required: true,
        max: 255,
    },
    age: {
        type: Number,
        required: true,
        min: 2
    },
    country: {
        type:String,
        required: true,
        max: 30
    },
    residence:{
        type:String,
        required: true,
        max: 30
    },
    mail: {
        type: String,
        required: true,
        max: 255,
    },
    pwd: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    repeat_pwd: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('users', userSchema);