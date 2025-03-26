const mongoose = require("mongoose");
const { Schema } = mongoose;

// Import plugins
const mongooseDelete = require("mongoose-delete");
const slug = require("mongoose-slug-updater");

// Kích hoạt plugin `slug` toàn cục
mongoose.plugin(slug);

// Định nghĩa Schema cho sản phẩm
const productSchema = new Schema(
  {
    name: { type: String, maxLength: 255, minLength: 1, required: true },
    price: { type: Number, min: 1, required: true },
    image: { type: String, maxLength: 255, required: true },
    description: { type: String, maxLength: 600, required: true },
    category: { type: String, maxLength: 255, required: true },
    quantity: { type: Number, min: 1, required: true },

    // Tự động tạo slug từ trường `name` với độ dài tối đa 100
    slug: {
      type: String,
      slug: "name",
      unique: true,
      maxLength: 100,
    },
  },
  {
    timestamps: true, // Tạo tự động `createdAt` và `updatedAt`
  }
);

// Kích hoạt plugin xóa mềm với tùy chọn override các method mặc định
productSchema.plugin(mongooseDelete, {
  overrideMethods: "all", // Ghi đè các phương thức `find`, `findOne`, v.v. để ẩn các tài liệu đã bị xóa
  deletedAt: true, // Thêm timestamp `deletedAt`
  deletedBy: true, // Thêm trường `deletedBy` lưu thông tin người đã xóa
  validateBeforeDelete: false, // Không cần validate trước khi xóa
});

// Xuất model
module.exports = mongoose.model("ProductDB", productSchema);
