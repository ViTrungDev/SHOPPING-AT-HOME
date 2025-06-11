const { mutipMongooseToObject } = require('../../Util/mongoose');
const ProductDB = require('../Model/ProductDB/productDB');

class HomeController {
    async index(req, res) {
        try {
            const products = await ProductDB.find({});
            res.render('home', {
                title: 'Home Page',
                products: mutipMongooseToObject(products),
            });
        } catch (error) {
            console.error('Lỗi lấy dữ liệu:', error);
            res.status(500).send('Lỗi server');
        }
    }
}

module.exports = new HomeController();
