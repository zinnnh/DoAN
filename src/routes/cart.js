const express = require('express')
const router = express.Router();

const cartController = require('../app/controllers/CartController');


router.post('/add/:productId', cartController.addToCart);
router.post('/remove/:cartItemId', cartController.removeFromCart);
router.post('/update/:cartItemId', cartController.updateQuantity);
router.post('/checkout', cartController.checkout);
// router.post('/checkout', cartController.processCheckout);
router.get('/', cartController.showCart);

module.exports = router;