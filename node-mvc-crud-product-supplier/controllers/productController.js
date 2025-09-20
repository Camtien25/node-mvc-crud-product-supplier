const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

// Lấy danh sách sản phẩm
exports.index = async(req, res) => {
    try {
        const products = await Product.find().populate('supplierId', 'name address phone');

        // Trả JSON nếu client yêu cầu
        if ((req.headers.accept || '').includes('application/json')) {
            return res.status(200).json(products);
        }

        // Trả về view nếu không phải request API
        return res.render('products/index', { products });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Hiển thị form thêm mới
exports.new = async(req, res) => {
    try {
        const suppliers = await Supplier.find();
        return res.render('products/new', { suppliers });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Tạo sản phẩm mới
exports.create = async(req, res) => {
    try {
        const product = await Product.create(req.body);

        if ((req.headers.accept || '').includes('application/json')) {
            return res.status(201).json({
                message: '✅ Product created',
                product
            });
        }

        return res.redirect('/products');
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// Hiển thị form sửa
exports.edit = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const suppliers = await Supplier.find();
        return res.render('products/edit', { product, suppliers });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Cập nhật sản phẩm
exports.update = async(req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        if ((req.headers.accept || '').includes('application/json')) {
            return res.json({
                message: '✅ Product updated',
                product: updatedProduct
            });
        }

        return res.redirect('/products');
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// Xóa sản phẩm
exports.delete = async(req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        if ((req.headers.accept || '').includes('application/json')) {
            return res.json({ message: '🗑️ Product deleted' });
        }

        return res.redirect('/products');
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};