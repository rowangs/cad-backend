const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());

const boards = {}; // In-memory storage for shapes

// GET: All shapes for a board
app.get('/api/shapes', (req, res) => {
  const boardId = req.query.boardId || 'default';
  const shapes = boards[boardId] || [];
  res.json(shapes);
});

// POST: Add a shape to a board
app.post('/api/shapes', (req, res) => {
  const boardId = req.query.boardId || 'default';
  const shape = req.body;

  if (!shape.id) {
    return res.status(400).json({ error: 'Shape must have an id' });
  }

  if (!boards[boardId]) {
    boards[boardId] = [];
  }

  boards[boardId].push(shape);
  res.status(201).json({ message: 'Shape added' });
});

// DELETE: Remove shape by ID or clear the board
app.delete('/api/shapes/:id?', (req, res) => {
  const boardId = req.query.boardId || 'default';

  if (!boards[boardId]) {
    return res.status(404).json({ error: 'Board not found' });
  }

  if (req.params.id) {
    // Delete a specific shape by ID
    boards[boardId] = boards[boardId].filter(shape => shape.id !== req.params.id);
    return res.json({ message: 'Shape deleted' });
  } else {
    // Clear the board
    boards[boardId] = [];
    return res.json({ message: 'Board cleared' });
  }
});

// Basic route to verify backend
app.get('/', (req, res) => {
  res.send('✅ CAD backend is running');
});

app.listen(PORT, () => {
  console.log(`✅ Backend server running on port ${PORT}`);
});
