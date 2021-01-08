const moongoose = require('mongoose')

const profileInfo = moongoose.Schema({
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    maritalStatus: {
        type: Boolean,
        required: true
    },
    nameOfSponse: {
        type: String,
        required: true
    },
    howManyChildren: {
        type: Number,
        required: true
    }

})

module.exports = moongoose.model('profileInfo', profileInfo)