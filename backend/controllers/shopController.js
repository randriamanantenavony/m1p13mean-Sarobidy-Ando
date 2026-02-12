const Shop = require('../models/boutique/Shop');

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

exports.updateShop = async (req, res) => {
    try {
        const shop = await Shop.findByIdAndUpdate(req.params.id, req.body, { new: true , runValidators: true });
        if (!shop) return res.status(404).json({ error: 'Shop not found' });
        res.status(200).json(shop);
    } catch (err) {     
        res.status(500).json({ error: err.message });
    }   
};

exports.deleteShop = async (req, res) => {
    try {
        const shop = await Shop.findByIdAndDelete(req.params.id);
        if (!shop) return res.status(404).json({ error: 'Shop not found' });
        res.status(200).json({ message: 'Shop deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}; 
