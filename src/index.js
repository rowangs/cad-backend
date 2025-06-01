const express = require('express');
const cors = require('cors');
const shapesController = require('./shapesController');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api/shapes', shapesController);

app.get('/', (req, res) => {
  res.send('CAD backend is running');
});

app.use((req, res) => {
  res.status(404).send('Route not found');
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
