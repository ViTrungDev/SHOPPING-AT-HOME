const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongooseDelete = require('mongoose-delete');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productSchema = new Schema(
    {
        name: { type: String, maxLength: 255, minLength: 1, required: true },
        price: { type: Number, min: 1, required: true },

        // Lưu trữ nhiều ảnh
        images: [{ type: String, required: true }], // Mảng chứa đường dẫn ảnh

        description: { type: String, maxLength: 600, required: true },
        category: { type: String, maxLength: 255, required: true },
        quantity: { type: Number, min: 1, required: true },

        // Đường dẫn đến file mô tả (PDF hoặc DOCX)
        descriptionFile: { type: String, default: null },

        // Slug tự động tạo từ tên sản phẩm
        slug: { type: String, slug: 'name', unique: true, maxLength: 100 },
    },
    {
        timestamps: true,
    },
);

// Plugin xóa mềm (soft delete)
productSchema.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
    deletedBy: true,
    validateBeforeDelete: false,
});

module.exports = mongoose.model('ProductDB', productSchema);
