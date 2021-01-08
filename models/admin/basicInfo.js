const mongoose = require("mongoose")
const validator = require('validator')

const adminInfo = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is Invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.length < 5) {
                throw new Error('Password is too short')
            }
        }
    }

})

module.exports = mongoose.model('adminBasicInfo', adminInfo)