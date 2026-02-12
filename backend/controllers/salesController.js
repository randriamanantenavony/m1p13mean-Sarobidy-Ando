const Sale = require('../models/boutique/Sales');
const Product = require('../models/boutique/Products');

exports.createSale = async (req, res) => {
  try {
    const { shopId, customerId, products, paymentMethod } = req.body;

    if (!products || !products.length) {
      return res.status(400).json({ message: 'Aucun produit dans la vente' });
    }

    // Vérifier le stock pour chaque produit
    for (let item of products) {
      const product = await Product.findById(item.productId);
      if (!product) return res.status(404).json({ message: `Produit introuvable: ${item.productId}` });
      if (product.stock < item.quantity) return res.status(400).json({ message: `Stock insuffisant pour ${product.name}` });
    }

    // Décrémenter le stock pour chaque produit
    for (let item of products) {
      await Product.findByIdAndUpdate(item.productId, { $inc: { stock: -item.quantity } });
    }

    // Créer la vente
    const sale = await Sale.create({ shopId, customerId, products, paymentMethod });
    res.status(201).json(sale);

  } catch (error) {
    console.error('Erreur création vente:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.getSales = async (req, res) => {
  try {
    const sales = await Sale.find()
      .populate('shopId', 'name')
      .populate('customerId', 'name email phone')
      .populate('products.productId', 'name');
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.getSalesByShop = async (req, res) => {
  try {
    const { shopId } = req.params;
    const sales = await Sale.find({ shopId })
      .populate('customerId', 'name email phone')
      .populate('products.productId', 'name');
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.updateSale = async (req, res) => {
  try {
    const updatedSale = await Sale.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedSale) return res.status(404).json({ message: 'Vente introuvable' });
    res.status(200).json(updatedSale);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.deleteSale = async (req, res) => {
  try {
    const deletedSale = await Sale.findByIdAndDelete(req.params.id);
    if (!deletedSale) return res.status(404).json({ message: 'Vente introuvable' });

    // Restaurer le stock pour chaque produit
    for (let item of deletedSale.products) {
      await Product.findByIdAndUpdate(item.productId, { $inc: { stock: item.quantity } });
    }

    res.status(200).json({ message: 'Vente supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
