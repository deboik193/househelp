const moongoose = require('mongoose')

const profileInfo = moongoose.Schema({
    date: { type: Date, default: Date.now },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        required: true
    },
    maritalStatus: {
        type: Boolean,
        required: true
    },
    nameOfSponse: {
        type: String
    },
    domesticService: {
        type: String,
        required: true
    },
    religion: {
        type: String,
        required: true
    },
    howManyChildren: {
        type: Number
    },
    phoneNumber: {
        type: Number
    },
    basic: {
        type: moongoose.Schema.Types.ObjectId,
        ref: 'houseBasicInfo'
    }
})

module.exports = moongoose.model('profileInfo', profileInfo)