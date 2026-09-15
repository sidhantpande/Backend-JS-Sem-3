let mongoose = require('mongoose')

let orderSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  amount: { type: Number, required: true, min: 0 },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
})

let Order = mongoose.model('Order', orderSchema)
module.exports = Order