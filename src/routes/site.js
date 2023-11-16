const express = require('express')
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

router.get('/', siteController.home);
// Route để hiển thị danh sách sản phẩm theo từng loại
router.get('/category/:category', siteController.categoryProducts);

router.get('/search', siteController.search);


module.exports = router;    