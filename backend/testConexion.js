// testConnexion.js
require('dotenv').config(); // charge les variables du fichier .env
const mongoose = require('mongoose');

const mongoUri = process.env.MONGO_URI;
const jwtSecret = process.env.JWT_SECRET;

mongoose.connect(mongoUri, {})
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('Erreur MongoDB:', err));

// Exemple d’utilisation de JWT_SECRET
console.log("Votre clé JWT est :", jwtSecret);
