let mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passWord: { type: String, required: true, select: false },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
})

let User = mongoose.model('User', userSchema)
module.exports = User