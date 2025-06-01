const express = require('express');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();
let boards = {}; // Store shapes by boardId

router.get('/', (req, res) => {
  const boardId = req.query.boardId || 'default';
  res.json(boards[boardId] || []);
});

router.post('/', (req, res) => {
  const boardId = req.query.boardId || 'default';
  const shape = { id: uuidv4(), ...req.body };

  if (!boards[boardId]) boards[boardId] = [];
  boards[boardId].push(shape);

  res.status(201).json(shape);
});

router.delete('/:id', (req, res) => {
  const boardId = req.query.boardId || 'default';
  boards[boardId] = (boards[boardId] || []).filter(s => s.id !== req.params.id);
  res.status(204).send();
});

module.exports = router;
