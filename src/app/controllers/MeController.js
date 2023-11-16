const Product = require("../models/Product");
const {mutipleMongooseToObject} = require('../../until/mongoose');

class MeController {

     //[GET] /me/stored/products
     storedProducts(req,res,next) {
        Product.find({})
        .then(products => res.render('me/stored-products',{
            products: mutipleMongooseToObject(products)
        }))
        .catch(next);
    }
    
}

module.exports = new MeController;