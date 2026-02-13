// routes/promotionRoutes.js
const express = require('express');
const router = express.Router();
const promotionController = require('../controllers/promotionController');

// Créer une promotion
router.post('/', promotionController.createPromotion);

module.exports = router;
