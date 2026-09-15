let mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    name:String,
    email:String,
    passWord:String,
    role:{type:String,default:'user'},
    resetToken:String,
    resetTokenExpiry:Date
})

let user = mongoose.model("user",userSchema)
module.exports = user