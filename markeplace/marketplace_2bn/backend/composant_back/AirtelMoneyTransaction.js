const mongoose = require('mongoose');

const AirtelMoneyTransactionSchema = new mongoose.Schema({
  email: { type: String, required: true },
  airtel_number: { type: String, required: true },
  products: [{
    _id: String,
    name: String,
    price: Number,
    type: String,
    qty: Number
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AirtelMoneyTransaction', AirtelMoneyTransactionSchema);
