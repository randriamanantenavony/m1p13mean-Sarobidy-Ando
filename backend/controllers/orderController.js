const Order = require('../models/boutique/Order');
const Product = require('../models/boutique/Products');
const { addNotification } = require('./notificationController');

exports.createOrder = async (req, res) => {
  try {
    const { shopId, customerId, products } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ error: 'La commande doit contenir au moins un produit' });
    }

    // Calcul du total
    let totalAmount = 0;
    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product) return res.status(404).json({ error: `Produit introuvable: ${item.productId}` });

      if (item.quantity > product.stock) {
        return res.status(400).json({ error: `Stock insuffisant pour ${product.name}` });
      }

      totalAmount += item.quantity * item.price;
    }

    // Crée la commande
    const order = await Order.create({ ...req.body, totalAmount });

    // ⚡ Ajouter la notification dans MongoDB
    await addNotification({
      type: 'new_order',
      message: `📦 Nouvelle commande reçue (ID: ${order._id})`,
      shopId: order.shopId,
      referenceId: order._id
    });

    res.status(201).json(order);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ----------------------
// Lister toutes les commandes d'une boutique
// ----------------------
exports.getOrdersByShop = async (req, res) => {
  try {
    const { shopId } = req.params;
    const orders = await Order.find({ shopId })
                              .populate('customerId', 'name email phone')
                              .populate('products.productId', 'name price');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ----------------------
// Lister toutes les commandes d’un client
// ----------------------
exports.getOrdersByCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    const orders = await Order.find({ customerId })
                              .populate('shopId', 'name')
                              .populate('products.productId', 'name price');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ----------------------
// Mettre à jour une commande (status, paiement, livraison)
// ----------------------
exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    if (!updatedOrder) return res.status(404).json({ error: 'Commande introuvable' });

    // Si la commande est validée, mettre à jour le stock
    if (req.body.status === 'validated') {
      for (const item of updatedOrder.products) {
        await Product.findByIdAndUpdate(item.productId, { $inc: { stock: -item.quantity } });
      }
    }

    res.status(200).json(updatedOrder);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ----------------------
// Supprimer une commande
// ----------------------
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) return res.status(404).json({ error: 'Commande introuvable' });

    res.status(200).json({ message: 'Commande supprimée avec succès' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
