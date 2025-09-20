const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json()); // 👈 THÊM DÒNG NÀY để đọc JSON body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Routes
const supplierRoutes = require('./routes/supplierRoutes');
const productRoutes = require('./routes/productRoutes');

app.use('/suppliers', supplierRoutes);
app.use('/products', productRoutes);

app.get('/', (req, res) => res.redirect('/suppliers'));

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.error(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));