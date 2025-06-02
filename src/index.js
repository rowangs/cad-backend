const express = require('express');
const cors = require('cors');
const shapesController = require('./shapesController');

const app = express();
const PORT = process.env.PORT || 4000;

// ✅ CORS FIX — this allows any domain (for testing)
app.use(cors({
  origin: '*'
}));

app.use(express.json());
app.use('/api/shapes', shapesController);

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
