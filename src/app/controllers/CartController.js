const Cart = require("../models/Cart");
const Product = require("../models/Product");
const {mongooseToObject,mutipleMongooseToObject} = require('../../until/mongoose');

class CartController {
    
            // [GET] /cart
        showCart(req, res, next) {
            // Fetch cart items and products
            Cart.find({})
            .populate('productId') // Populate the reference to the Product model
            .then(cartItems => {
                // Tính toán giá trị subtotal
                const subtotal = cartItems.reduce((acc, item) => {
                    const productPrice = item.productId.price || 0;
                    return acc + productPrice * item.quantity;
                }, 0);

                // Tính toán thuế và phí vận chuyển (giả sử là 10% thuế và không tính phí vận chuyển)
                const taxRate = 0.1;
                const tax = subtotal * taxRate;
                const shipping = 10; // Có thể thay đổi nếu có phí vận chuyển

                // Tính toán tổng cộng
                const total = subtotal + tax + shipping;
                //Làm tròn 2 chữ số thập phân
                const roundedSubtotal = subtotal.toFixed(2);
                const roundedTax = tax.toFixed(2);
                const roundedShipping = shipping.toFixed(2);
                const roundedTotal = total.toFixed(2);

                res.render('cart', {
                    cartItems: cartItems.map(item => mongooseToObject(item)),
                    subtotal: roundedSubtotal,
                    tax: roundedTax,
                    shipping: roundedShipping,
                    total: roundedTotal
                });
            })
            .catch(next);
        }

        // [POST] /cart/add/:productId
        addToCart(req, res, next) {
            const productId = req.params.productId;
            let product;

            Product.findById(productId)
                .then(foundProduct => {
                    product = foundProduct;
                    if (!product) {
                        return res.status(404).json({ error: 'Product not found' });
                    }

                    return Cart.findOne({ productId });
                })
                .then(existingCartItem => {
                    if (existingCartItem) {
                        existingCartItem.quantity += 1;
                        return existingCartItem.save(); // Redirect to the cart page without making any changes
                    } else {
                        const cartItem = new Cart({
                            productId: product._id,
                            quantity: 1,
                        });

                        return cartItem.save();
                    }
                })
                .then(() => {
                    res.redirect('/cart');
                })
                .catch(next);
        }

        // [POST] /cart/update/:cartItemId
        updateQuantity(req, res, next) {
            const cartItemId = req.params.cartItemId;
            const { quantity } = req.body;

            Cart.findByIdAndUpdate(cartItemId, { quantity }, { new: true })
                .then(updatedCartItem => {
                    if (!updatedCartItem) {
                        return res.status(404).json({ error: 'Cart item not found' });
                    }

                    res.redirect('/cart');
                })
                .catch(next);
        }

    // [DELETE] /cart/remove/:cartItemId
    removeFromCart(req, res, next) {
        const cartItemId = req.params.cartItemId;

        Cart.findByIdAndRemove(cartItemId)
            .then(() => {
                res.redirect('/cart'); 
            })
            .catch(next);
    }

    

    // [GET] /cart/checkout
   checkout(req, res, next) {
        // Fetch cart items and populate the product information
        Cart.deleteMany({})
        .then(() => {
            // Redirect to a successful checkout page
            res.render('checkout'); // This can be a success page you create
        })
        .catch(next);
    }
}

module.exports = new CartController();
