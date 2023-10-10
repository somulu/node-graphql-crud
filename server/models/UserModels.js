const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    organizationName: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('UserSchema', userSchema)