// // server.js
// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const app = express();

// // Middleware for parsing JSON
// app.use(express.json());

// // Connect to MongoDB Atlas
// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.error(err));

// // Import routes
// const userRoutes = require('./routes/userRoutes');
// const productRoutes = require('./routes/productRoutes');

// // Mount routes
// app.use('/api/users', userRoutes);
// app.use('/api/products', productRoutes);

// // Serve static files from the "public" folder (for our HTML client)
// app.use(express.static('public'));



require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware for parsing JSON
app.use(express.json());
// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Import routes
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

// Mount routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Serve static files from the "public" directory
app.use(express.static('public'));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`)
   console.log(`Press CTRL + C to exit`)


});
