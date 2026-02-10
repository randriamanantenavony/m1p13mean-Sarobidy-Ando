const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ['active', 'inactive', 'sold_out', 'promo'],
    default: 'active'
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
