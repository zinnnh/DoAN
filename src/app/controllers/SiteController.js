const Product = require("../models/Product");
const {mutipleMongooseToObject} = require('../../until/mongoose');

class SiteContronller {

    //[GET] /
    home(req,res) {
        Product.find({})
            .then((products) =>{
                res.render('home', {
                    products: mutipleMongooseToObject(products)
                })
            })
            .catch((error) =>{ 
                console.error(error);
                res.status(500).send('Loi !!!')
            });
    }

    //[GET] /category/:categoryName
    categoryProducts(req, res, next) {
        const category = req.params.category.toLowerCase(); // Lấy danh mục từ URL và chuyển về chữ thường
        
        // Tạo một query để lấy sản phẩm dựa trên tên hoặc mô tả chứa category
        const query = {
            $or: [
                { name: { $regex: category, $options: 'i' } }, // Tìm theo tên
            ]
        };
        Product.find(query)
          .then(products => {
            res.render('category', { 
                products: mutipleMongooseToObject(products) });
          })
          .catch(next);
    }

    // [GET] /search
    search(req, res, next) {
        const searchTerm = req.query.query;
        Product.find({ $text: { $search: searchTerm } })
            .then(products => res.render('search-results', {
                    products: mutipleMongooseToObject(products)
            }))
            .catch(next);
    }

}
module.exports = new SiteContronller;