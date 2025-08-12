const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Product model
const Product = require('./models/Product.js');

// Get all products
app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Seed products from DummyJSON
app.post('/api/seed-products', async (req, res) => {
  try {
    const response = await axios.get('https://dummyjson.com/products');
    const shoes = response.data.products.filter(p =>
      p.title.toLowerCase().includes('shoe') || p.category.includes('fashion')
    );

    const formatted = shoes.map(p => ({
      name: p.title,
      price: p.price,
      imageUrl: p.thumbnail,
      category: 'Casual'
    }));

    await Product.insertMany(formatted);
    res.status(201).json({ message: 'Products seeded successfully', count: formatted.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch or insert products' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
