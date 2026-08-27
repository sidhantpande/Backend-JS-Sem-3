let mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

let user = mongoose.model("user",userSchema)
module.exports = user