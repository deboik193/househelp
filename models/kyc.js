const moongoose = require('mongoose')

const KYC = moongoose.Schema({
    date: { type: Date, default: Date.now },
    healthClearance: {
        type: String,
        required: true
    },
    policeReport: {
        type: String,
        required: true
    },
    proveOfResidence: {
        type: String,
        required: true
    },
    meansOfID: {
        type: String,
        required: true
    },
    residentAddress: {
        type: String,
        required: true
    },
    permanentAddress: {
        type: String,
        required: true
    },
    stateOfOrigin: {
        type: String,
        required: true
    },
    guarantorName: {
        type: String,
        required: true
    },
    guarantorImage: {
        type: String,
        required: true
    },
    guarantorMeansOfID: {
        type: String,
        required: true
    },
    basic: {
        type: moongoose.Schema.Types.ObjectId,
        ref: 'profileInfo'
    },

})

module.exports = moongoose.model('KYC', KYC)