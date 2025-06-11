const path = require('path');
class ViewProduct {
    view(req, res) {
        res.render('products/product_details.hbs', { title: 'Product detail' });
    }
    viewCreate(req, res) {
        res.render('products/createProduct.hbs', {
            title: 'Create Product',
            layout: false,
        });
    }
}
module.exports = new ViewProduct();
