const express = require('express');
const cors = require('cors');
const shapesController = require('./shapesController');

const app = express();
const PORT = process.env.PORT || 4000;

// ✅ CORS Configuration — allow frontend hosted on GitHub Pages
app.use(cors({
  origin: 'https://rowangs.github.io',
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// ✅ API routes for shapes
app.use('/api/shapes', shapesController);

// ✅ Root test route
app.get('/', (req, res) => {
  res.send('✅ CAD Backend is running');
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
});
