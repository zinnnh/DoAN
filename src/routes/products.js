const express = require('express');
const router = express.Router();

const productController = require('../app/controllers/ProductController');
const upload= require('../app/middleware/upload')


router.get('/create', productController.create);
router.post('/store',upload.single('image'), productController.store);

router.get('/:id/edit', productController.edit);
router.put('/:id', productController.update);
router.delete('/:id', productController.destroy);




module.exports = router;
