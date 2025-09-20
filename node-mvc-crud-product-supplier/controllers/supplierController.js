const Supplier = require('../models/Supplier');

// Lấy danh sách nhà cung cấp
exports.index = async(req, res) => {
    try {
        const suppliers = await Supplier.find();

        if ((req.headers.accept || '').includes('application/json')) {
            return res.json(suppliers);
        }

        return res.render('suppliers/index', { suppliers });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Hiển thị form thêm mới
exports.new = (req, res) => {
    return res.render('suppliers/new');
};

// Tạo nhà cung cấp mới
exports.create = async(req, res) => {
    try {
        const supplier = await Supplier.create(req.body);

        if ((req.headers.accept || '').includes('application/json')) {
            return res.status(201).json({
                message: '✅ Supplier created',
                supplier
            });
        }

        return res.redirect('/suppliers');
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

// Hiển thị form sửa
exports.edit = async(req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) {
            return res.status(404).json({ error: 'Supplier not found' });
        }
        return res.render('suppliers/edit', { supplier });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Cập nhật nhà cung cấp
exports.update = async(req, res) => {
    try {
        const updatedSupplier = await Supplier.findByIdAndUpdate(
            req.params.id,
            req.body, { new: true }
        );

        if (!updatedSupplier) {
            return res.status(404).json({ error: 'Supplier not found' });
        }

        if ((req.headers.accept || '').includes('application/json')) {
            return res.json({
                message: '✅ Supplier updated',
                supplier: updatedSupplier
            });
        }

        return res.redirect('/suppliers');
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

// Xóa nhà cung cấp
exports.delete = async(req, res) => {
    try {
        const deletedSupplier = await Supplier.findByIdAndDelete(req.params.id);

        if (!deletedSupplier) {
            return res.status(404).json({ error: 'Supplier not found' });
        }

        if ((req.headers.accept || '').includes('application/json')) {
            return res.json({ message: '🗑️ Supplier deleted' });
        }

        return res.redirect('/suppliers');
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};