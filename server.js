// server.js - Final version for Week 2 Express.js Assignment

const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

// Custom error classes
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.status = 404;
  }
}
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.status = 400;
  }
}

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());

// ✅ Custom Logger Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// ✅ Authentication Middleware
app.use((req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== 'my-secret-key') {
    return res.status(401).json({ error: 'Unauthorized: Invalid API key' });
  }
  next();
});

// ✅ Sample In-Memory Products Data
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});

// ✅ GET /api/products (with filter & pagination)
app.get('/api/products', (req, res) => {
  const { category, page = 1, limit = 10 } = req.query;
  let result = [...products];

  if (category) {
    result = result.filter(p => p.category === category);
  }

  const start = (page - 1) * limit;
  const end = start + parseInt(limit);
  res.json(result.slice(start, end));
});

// ✅ GET /api/products/:id
app.get('/api/products/:id', (req, res, next) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return next(new NotFoundError('Product not found'));
  res.json(product);
});

// ✅ POST /api/products
app.post('/api/products', (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;
  if (!name || !description || price === undefined || !category || inStock === undefined) {
    return next(new ValidationError('All fields are required'));
  }

  const newProduct = {
    id: uuidv4(),
    name,
    description,
    price,
    category,
    inStock
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// ✅ PUT /api/products/:id
app.put('/api/products/:id', (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return next(new NotFoundError('Product not found'));

  const { name, description, price, category, inStock } = req.body;
  if (!name || !description || price === undefined || !category || inStock === undefined) {
    return next(new ValidationError('All fields are required'));
  }

  products[index] = { ...products[index], name, description, price, category, inStock };
  res.json(products[index]);
});

// ✅ DELETE /api/products/:id
app.delete('/api/products/:id', (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return next(new NotFoundError('Product not found'));

  const deleted = products.splice(index, 1);
  res.json({ message: 'Product deleted', product: deleted[0] });
});

// ✅ Search by name (bonus endpoint)
app.get('/api/search', (req, res) => {
  const { name } = req.query;
  const result = products.filter(p =>
    p.name.toLowerCase().includes(name.toLowerCase())
  );
  res.json(result);
});

// ✅ Product statistics (bonus endpoint)
app.get('/api/products/stats', (req, res) => {
  const stats = {};
  for (const p of products) {
    stats[p.category] = (stats[p.category] || 0) + 1;
  }
  res.json(stats);
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    error: err.name,
    message: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

module.exports = app;
