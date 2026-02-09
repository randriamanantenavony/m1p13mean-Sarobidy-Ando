const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');

// Routes pour les boutiques
router.post('/', shopController.createShop);
router.get('/', shopController.getShops);

module.exports = router;

