const productDb = require('../../Model/ProductDB/productDB');
const { mongooseToObject } = require('../../../Util/mongoose');
class productController {
    // [POST] /product/create
    create(req, res) {
        const { name, price, description, category, quantity, slug } = req.body;

        // Lấy các file ảnh từ form
        const imageFiles = req.files?.images || [];
        const images = imageFiles.map((file) => '/uploads/images/' + file.filename);

        // Lấy file mô tả nếu có
        const descriptionFile = req.files?.descriptionFile?.[0];
        const descriptionFilePath = descriptionFile ? '/uploads/files/' + descriptionFile.filename : null;

        // Tạo đối tượng sản phẩm với dữ liệu
        const productData = {
            name,
            price,
            description,
            category,
            images,
            descriptionFile: descriptionFilePath,
            quantity,
            slug,
        };

        // Lưu sản phẩm vào DB
        const product = new productDb(productData);
        product
            .save()
            .then((savedProduct) => {
                res.status(201).json({ message: 'Tạo sản phẩm thành công!', product: savedProduct });
            })
            .catch((error) => {
                console.error('Lỗi khi lưu sản phẩm:', error);
                res.status(500).json({ message: 'Lỗi khi tạo sản phẩm', error: error.message });
            });
    }

    // [GET] /product/view
    view(req, res) {
        productDb
            .find()
            .then((products) => {
                res.json({
                    message: 'Lấy danh sách sản phẩm thành công',
                    products: products.map((product) => mongooseToObject(product)),
                });
            })
            .catch((error) => {
                console.error('Lỗi khi lấy danh sách sản phẩm:', error);
                res.status(500).json({
                    message: 'Lỗi khi lấy danh sách sản phẩm',
                    error: error.message,
                });
            });
    }

    // [GET] /product/view/:slug
    viewSlug(req, res) {
        productDb.findOne({ slug: req.params.slug }).then((product) => {
            if (!product) {
                return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
            }
            res.render('products', { product });
            res.json({
                message: 'Lấy sản phẩm thành công',
                product: mongooseToObject(product),
            });
        });
    }

    // [PUT] /product/update/:id
    update(req, res) {
        const { id } = req.params;
        const { name, price, description, category, images, quantity, slug } = req.body;

        const updateData = {
            name,
            price,
            description,
            category,
            quantity,
            slug,
            images: Array.isArray(images) ? images : [images], // Đảm bảo mảng ảnh khi cập nhật
        };

        productDb
            .findByIdAndUpdate(id, updateData, { new: true }) // Cập nhật dữ liệu sản phẩm
            .then((product) => {
                if (!product) {
                    return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
                }
                res.json({
                    message: 'Cập nhật sản phẩm thành công',
                    product: mongooseToObject(product),
                });
            })
            .catch((error) => {
                console.error('Lỗi khi cập nhật sản phẩm:', error);
                res.status(500).json({
                    message: 'Lỗi khi cập nhật sản phẩm',
                    error: error.message,
                });
            });
    }
    // [DELETE] /product/delete/:id
    delete(req, res) {
        const { id } = req.params;
        productDb.findByIdAndDelete(id).then((product) => {
            if (!product) {
                return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
            }
            res.json({
                message: 'Xóa sản phẩm thành công',
                product: mongooseToObject(product),
            });
        });
    }
}

module.exports = new productController();
