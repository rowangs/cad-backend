const express = require('express');
const router = express.Router();

// Store shapes in memory per board
const boards = {};

// GET all shapes for a board
router.get('/', (req, res) => {
  const boardId = req.query.boardId || 'default';
  res.json(boards[boardId] || []);
});

// POST a new shape
router.post('/', (req, res) => {
  const boardId = req.query.boardId || 'default';
  const shape = req.body;
  shape.id = shape.id || Date.now().toString();

  if (!boards[boardId]) boards[boardId] = [];
  boards[boardId].push(shape);
  res.status(201).json(shape);
});

// DELETE a specific shape (Undo)
router.delete('/:id', (req, res) => {
  const boardId = req.query.boardId || 'default';
  const shapeId = req.params.id;
  if (!boards[boardId]) return res.status(404).send();

  boards[boardId] = boards[boardId].filter(shape => shape.id !== shapeId);
  res.status(204).send();
});

// DELETE all shapes (Clear board)
router.delete('/', (req, res) => {
  const boardId = req.query.boardId || 'default';
  boards[boardId] = [];
  res.status(204).send();
});

module.exports = router;
