const express = require('express');
const cors = require('cors');
const shapesController = require('./shapesController');

const app = express();
const PORT = process.env.PORT || 4000;

const corsOptions = {
  origin: 'https://rowangs.github.io',
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));


app.use(express.json());

app.use('/api/shapes', shapesController);

app.get('/', (req, res) => {
  res.send('✅ CAD Backend is running');
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
