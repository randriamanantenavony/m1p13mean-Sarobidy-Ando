// seedSingleUser.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/boutique/User'); // adapte le chemin

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connecté");

    // Remplace par l'ID de ta boutique existante
    const shopId = "69a67b638dd49469617d1e51";

    const email = "owner@boutique.mg";
    const passwordPlain = "1234";

    // Vérifie si l'utilisateur existe déjà
    const existing = await User.findOne({ email });
    if (existing) {
      console.log("⚠️ User déjà présent :", email);
      process.exit();
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(passwordPlain, 10);

    const user = new User({
      email,
      password: hashedPassword,
      shop: shopId
    });

    await user.save();
    console.log("🎉 Utilisateur créé avec succès :", email);

    process.exit();
  } catch (err) {
    console.error("❌ Erreur création utilisateur :", err);
    process.exit(1);
  }
})();