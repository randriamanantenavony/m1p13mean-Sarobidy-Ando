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
    // Populate category pour récupérer label, icon, etc.
    const shops = await Shop.find()
      .populate('categoryId', 'name description') // champ 'category' à peupler, et sélectionner seulement certains champs
      .exec();

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

// lister les boutiques actives
exports.getActiveShops = async (req, res) => {
  try {
    const shops = await Shop.find({ status: 'active' })
      .populate('categoryId', 'name description')  // peupler la catégorie
      .sort({ name: 1 })
      .exec();  // exécute la requête

    res.status(200).json(shops);
  } catch (err) {
    res.status(500).json({
      error: err.message,
      success: false,
      message: 'Failed to retrieve active shops'
    });
  }
};

exports.getShopById = async (req, res) => {     
    try {
        const shop = await Shop.findById(req.params.id);
        if (!shop) return res.status(404).json({ error: 'Shop not found' });
        res.status(200).json(shop);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};