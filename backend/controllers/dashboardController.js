const Product = require('../models/boutique/Products');
const Order = require('../models/boutique/Order');
const Customer = require('../models/boutique/Customer');
const mongoose = require('mongoose');

exports.getKPI = async (req, res) => {
  try {
    const { shopId } = req.params;
    if (!shopId) return res.status(400).json({ error: "shopId requis" });

    const shopObjectId = new mongoose.Types.ObjectId(shopId);

    // Dates du jour
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // 1️⃣ Commandes du jour pour calcul CA et ventes
    const ordersToday = await Order.find({
      shopId: shopObjectId,
      createdAt: { $gte: today, $lt: tomorrow }
    });

    const caDuJour = ordersToday.reduce((sum, order) => sum + order.totalAmount, 0);
    const ventesDuJour = ordersToday.reduce(
      (sum, order) => sum + order.products.reduce((s, p) => s + p.quantity, 0),
      0
    );

    // 2️⃣ Commandes en attente
    const commandesEnAttente = await Order.countDocuments({
      shopId: shopObjectId,
      status: 'pending'
    });

    // 3️⃣ Produits avec stock faible
    const stockFaible = await Product.countDocuments({
      shopId: shopObjectId,
      stock: { $lte: 10, $gt: 0 } // stock faible mais pas épuisé
    });

    // 4️⃣ Nombre de produits en stock (>0)
    const produitsEnStock = await Product.countDocuments({
      shopId: shopObjectId,
      stock: { $gt: 0 }
    });

    // 5️⃣ Nombre de produits par tranche de stock
    const stockParCategorie = await Product.aggregate([
      { $match: { shopId: shopObjectId } },
      { $project: { 
          trancheStock: {
            $switch: {
              branches: [
                { case: { $eq: ["$stock", 0] }, then: "epuise" },
                { case: { $lte: ["$stock", "$lowStockThreshold"] }, then: "faible" }
              ],
              default: "normal"
            }
          }
        } 
      },
      { $group: { _id: "$trancheStock", total: { $sum: 1 } } }
    ]);

    // 6️⃣ Top 3 articles les plus vendus
    const topArticles = await Order.aggregate([
      { $match: { shopId: shopObjectId } },
      { $unwind: "$products" },
      { $group: { _id: "$products.productId", totalQuantity: { $sum: "$products.quantity" } } },
      { $sort: { totalQuantity: -1 } },
      { $limit: 3 },
      { 
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product"
        }
      },
      { $unwind: "$product" },
      { $project: { _id: 0, name: "$product.name", totalQuantity: 1 } }
    ]);

    // 7️⃣ Top 3 clients les plus dépensiers
    const topClients = await Order.aggregate([
      { $match: { shopId: shopObjectId } },
      { $group: { _id: "$customerId", totalSpent: { $sum: "$totalAmount" } } },
      { $sort: { totalSpent: -1 } },
      { $limit: 3 },
      {
        $lookup: {
          from: "customers",
          localField: "_id",
          foreignField: "_id",
          as: "customer"
        }
      },
      { $unwind: "$customer" },
      { $project: { _id: 0, name: "$customer.name",contact: "$customer.phone", totalSpent: 1 } }
    ]);

    // 🔹 Retour JSON complet
    res.json({
      caDuJour,
      ventesDuJour,
      commandesEnAttente,
      stockFaible,
      produitsEnStock,
      stockParCategorie,
      topArticles,
      topClients
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};