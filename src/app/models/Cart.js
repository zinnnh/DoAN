const mongoose = require('mongoose');

const Cart = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, //tham chiếu đến models'Product', nó sẽ lấy id của sản phẩm trong Product
  quantity: Number,

});

module.exports = mongoose.model('Cart', Cart); 