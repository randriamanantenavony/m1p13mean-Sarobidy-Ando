const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// CRUD categories
router.post('/', productController.createProduct);      // Create
router.get('/', productController.getProductsByShop);
router.put('/:id', productController.updateProduct);    // Update
router.delete('/:id', productController.deleteProduct); // Delete



module.exports = router;
