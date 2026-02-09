const Shop = require('../models/Shop');

// Créer une boutique
exports.createShop = async (req, res) => {
    try {
        const shop = await Shop.create(req.body);
        res.status(201).json(shop);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Lister toutes les boutiques
exports.getShops = async (req, res) => {
    try {
        const shops = await Shop.find();
        res.status(200).json(shops);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
