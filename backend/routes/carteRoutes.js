const express = require('express');
const router = express.Router();
const cartController = require('../controllers/CartController');

// Ajouter un produit au panier
router.post('/add', cartController.addToCart);

// Voir le panier
router.get('/:clientId/:shopId', cartController.getCart);

// Supprimer un produit du panier
router.post('/remove', cartController.removeFromCart);

// Passer commande
router.post('/checkout', cartController.checkoutCart);

router.post('/notify-cart', cartController.notifyNewCart);

module.exports = router;
