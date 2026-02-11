const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseController');

router.post('/', purchaseController.createPurchase);
router.get('/shop/:shopId', purchaseController.getPurchasesByShop);
router.get('/product/:productId', purchaseController.getPurchasesByProduct);
router.put('/:id', purchaseController.updatePurchase);
router.delete('/:id', purchaseController.deletePurchase);


module.exports = router;
