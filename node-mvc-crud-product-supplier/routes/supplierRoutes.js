const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');

// 📌 Lấy tất cả supplier (tự động trả JSON nếu request từ Postman hoặc fetch API)
router.get('/', supplierController.index);

// 📌 Form tạo mới (render EJS)
router.get('/new', supplierController.new);

// 📌 Tạo mới supplier
router.post('/', supplierController.create);

// 📌 Form chỉnh sửa (render EJS)
router.get('/:id/edit', supplierController.edit);

// 📌 Cập nhật supplier
router.post('/:id', supplierController.update);

// 📌 Xoá supplier
router.post('/:id/delete', supplierController.delete);

module.exports = router;