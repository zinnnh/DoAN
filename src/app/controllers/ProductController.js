const Product = require("../models/Product");
const {mongooseToObject, mutipleMongooseToObject} = require('../../until/mongoose');
const { json } = require('express');
const upload = require('../middleware/upload')
const fs = require('fs');


class ProductController {
       
        // [GET] /products/create
        create(req,res,next) {
                res.render('products/create')   
        }   

         // [POST] /products/store
         store(req, res, next) {
            const formData = req.body;
            if(req.file) {
                formData.image = '/images/' + req.file.filename;
            }
            const product = new Product(formData);
            product.save()
                .then((product) => {
                res.redirect('/'); 
                })
                .catch((error) => {
                res.status(500).json({ error: 'Lỗi lưu trữ khóa học' });
                });
            }

            // [GET] /products/:id/edit
        edit(req,res,next) {
            Product.findById(req.params.id)
                .then(product => res.render('products/edit', {
                    product: mongooseToObject(product)
                }))
                .catch(next);
        } 
    
        // [PUT] /products/:id
        update(req,res,next) {
            Product.updateOne({ _id: req.params.id}, req.body)
                .then(() => res.redirect ('/me/stored/products'))
                .catch(next)
        }

        // [DELETE] /products/:id
        destroy(req,res,next){
            Product.deleteOne({_id: req.params.id})
                .then(() => res.redirect('back'))
                .catch(next);
        }
        
}

module.exports = new ProductController;