const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const shopRoutes = require('./routes/shopRoutes');
const cors = require('cors');

console.log('Démarrage du serveur...');
// Charger les variables d'environnement
dotenv.config();


console.log('Mongo URI:', process.env.MONGO_URI);

// Connecter à la base de données
connectDB();

console.log('Démarrage du serveur...');
console.log('Mongo URI ;', process.env.MONGO_URI);

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/shops', shopRoutes);
app.use('/api/categories_products', require('./routes/categoryRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/suppliers', require('./routes/supplierRoutes'));
app.use('/api/purchases', require('./routes/purchaseRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});