// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// NEW Aggregation endpoint: join products with user data
router.get('/with-users', async (req, res) => {
  try {
    const productsWithUsers = await Product.aggregate([
      {  $lookup: {
          from: "users",       // Target collection (Mongoose automatically pluralizes 'User' to 'users')
          localField: "userId",  // Field in the Product collection
          foreignField: "_id",   // Field in the User collection
          as: "userInfo"         // Name for the resulting array field
        }
      },
      // Unwind the userInfo array (assuming each product has exactly one user)
      { $unwind: "$userInfo" },
      // Optionally, project only the fields you need:
      {
        $project: {
          name: 1,
          description: 1,
          price: 1,
          createdAt: 1,
          "userInfo.name": 1,
          "userInfo.email": 1
        }
      }
    ]);
    res.json(productsWithUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }});



// CREATE a new product
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ a single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE a product by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ error: 'Product not found' });
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
