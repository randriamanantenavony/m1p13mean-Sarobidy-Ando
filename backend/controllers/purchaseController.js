const Purchase = require('../models/Purchase');
const Product = require('../models/Products');

// Enregistrer un achat
exports.createPurchase = async (req, res) => {
    try {
        const { shopId, productId, quantity,purchasePrice } = req.body;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        } 
        
        const purchase = new Purchase({
            shopId,
            productId,
            quantity,
            purchasePrice
        });
        
        await purchase.save();
        product.stock += quantity;
        await product.save();
        res.status(201).json(purchase);

    } catch (error) {
        console.error('Erreur lors de la création de l\'achat:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }   
};

exports.getPurchasesByShop = async (req, res) => {
    try {
        const { shopId } = req.params;
        const purchases = await Purchase.find({ shopId }).populate('productId');
        res.json(purchases);
    }   
    catch (error) {
        console.error('Erreur lors de la récupération des achats:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

exports.getPurchasesByProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const purchases = await Purchase.find({ productId }).populate('shopId');
        res.json(purchases);
    }   
    catch (error) {
        console.error('Erreur lors de la récupération des achats:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }       
};      

exports.updatePurchase = async (req, res) => {
    try {
        const { id } = req.params;
        const { shopId, productId, quantity, purchasePrice } = req.body;
        const purchase = await Purchase.findById(id);

        if (!purchase) {
            return res.status(404).json({ message: 'Achat non trouvé' });
        }   
        purchase.shopId = shopId || purchase.shopId;
        purchase.productId = productId || purchase.productId;
        purchase.quantity = quantity || purchase.quantity;
        purchase.purchasePrice = purchasePrice || purchase.purchasePrice;   
        await purchase.save();
        res.json(purchase);
    }       
    catch (error) {
        console.error('Erreur lors de la mise à jour de l\'achat:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

exports.deletePurchase = async (req, res) => {
    try {
        const { id } = req.params;
        const purchase = await Purchase.findByIdAndDelete(id);  
        if (!purchase) {
            return res.status(404).json({ message: 'Achat non trouvé' });
        }
        res.json({ message: 'Achat supprimé' });
    }  
    catch (error) {
        console.error('Erreur lors de la suppression de l\'achat de l\'achat:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}