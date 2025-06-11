const express = require('express');
const router = express.Router();
const viewProduct = require('../App/Controllers/ProductController/ViewProduct');
const Products = require('../App/Controllers/ProductController/productController');
const upload = require('../middlewares/upload');

router.get('/', viewProduct.view);
/*=============================== /products/create ============================= */
router.post(
    '/create',
    upload.fields([
        { name: 'images', maxCount: 5 },
        { name: 'descriptionFile', maxCount: 1 },
    ]),
    Products.create,
);
/*=============================== /products/view ============================= */
router.get('/views', Products.view);
/*=============================== /products/view/:slug ============================= */
router.get('/view/:slug', Products.viewSlug);
/*=============================== /products/update/:id ============================= */
router.put('/update/:id', Products.update);
/*=============================== /products/delete/:id ============================= */
router.delete('/delete/:id', Products.delete);

/*=============================== /products/create view ============================= */
router.get('/create', viewProduct.viewCreate);

module.exports = router;
