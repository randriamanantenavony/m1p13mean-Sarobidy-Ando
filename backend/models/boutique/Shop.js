const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  // 🔹 Identité de la boutique
  name: { type: String, required: true },
  
  // 🔹 Catégorie de la boutique (enum pour éviter les valeurs libres)
  category: {
    type: String,
    enum: [
      'mode',           // vêtements, accessoires
      'restauration',   // food court, café
      'electronique',   // gadgets, tech
      'beaute',         // cosmétique, salon
      'services',       // banque, assurance, services
      'divertissement'  // cinéma, loisirs
    ],
    required: true
  },

  // 🔹 Localisation physique
  unitNumber: { type: String, required: true },
  floor: { type: Number },                       
  surface: { type: Number },                     
  phone: { type: String },
  email: { type: String },
//   rentAmount: { type: Number },      
//   charges: { type: Number },         
//   contractStartDate: { type: Date },
//   contractEndDate: { type: Date },
  status: {
    type: String,
    enum: ['active', 'closed', 'renovation'],
    default: 'active'
  },
  website: { type: String },
  openingHours: { type: String },
  description: { type: String },
  imageUrl: { type: String },

}, { timestamps: true }); // createdAt / updatedAt automatiques

module.exports = mongoose.model('Shop', shopSchema);

