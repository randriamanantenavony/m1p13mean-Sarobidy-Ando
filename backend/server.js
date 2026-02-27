const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const shopRoutes = require('./routes/shopRoutes');
const cors = require('cors');
require('./cron/promotion'); 


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
app.use('/api/customers', require('./routes/customerRoutes'));
app.use('/api/sales', require('./routes/salesRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/orders/validate', require('./routes/validateOrderRoutes'));
app.use('/api/promotions', require('./routes/promotionRoutes'));
app.use('/api/cart', require('./routes/carteRoutes'));
app.use('/api/delivery', require('./routes/deliveryRoutes'));
app.use('/api/favorites', require('./routes/favoriteRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});