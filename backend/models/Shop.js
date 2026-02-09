const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String },
    location: { type: String },
    category: { type: String },
    managerName: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Shop', shopSchema);
