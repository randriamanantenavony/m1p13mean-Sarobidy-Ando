const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseController');

router.post('/', purchaseController.createPurchase);
router.get('/shop/:shopId', purchaseController.getPurchasesByShop);
router.get('/product/:productId', purchaseController.getPurchasesByProduct);

module.exports = router;
