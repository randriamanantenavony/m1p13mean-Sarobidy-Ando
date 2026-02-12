const Product = require('../models/boutique/Products');
const Shop = require('../models/boutique/Shop');
const Category = require('../models/boutique/Category_products');

// Créer un produit pour une boutique
exports.createProduct = async (req, res) => {
  try {
    const { shopId, categoryId } = req.body;

    // Vérifier que la boutique existe
    const shop = await Shop.findById(req.body.shopId.trim());
    if (!shop) return res.status(404).json({ error: 'Boutique introuvable' });

    // Vérifier que la catégorie existe
    const category = await Category.findById(req.body.categoryId.trim());
    if (!category) return res.status(404).json({ error: 'Catégorie introuvable' });

    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lister tous les produits d'une boutique
exports.getProductsByShop = async (req, res) => {
  try {
    const products = await Product.find({ shopId: req.params.shopId })
                                  .populate('categoryId', 'name');

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mettre à jour un produit
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) return res.status(404).json({ error: 'Produit introuvable' });

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Supprimer un produit
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ error: 'Produit introuvable' });
    res.status(200).json({ message: 'Produit supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
