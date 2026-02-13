// controllers/promotionController.js
const Promotion = require('../models/boutique/Promotion');

exports.createPromotion = async (req, res) => {
  try {
    const { productId, shopId, title, description, discountPercent, startDate, endDate } = req.body;

    // Validation simple
    if (!productId || !shopId || !title || !discountPercent || !startDate || !endDate) {
      return res.status(400).json({ error: 'Tous les champs obligatoires doivent être remplis' });
    }

    const promotion = await Promotion.create({
      productId,
      shopId,
      title,
      description,
      discountPercent,
      startDate,
      endDate
    });

    res.status(201).json(promotion);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
