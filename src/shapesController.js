const express = require('express');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

let shapes = []; // In-memory data store

// GET all shapes
router.get('/', (req, res) => {
  res.json(shapes);
});

// POST a new shape
router.post('/', (req, res) => {
  const shape = { id: uuidv4(), ...req.body };
  shapes.push(shape);
  res.status(201).json(shape);
});

// DELETE a shape by ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  shapes = shapes.filter(shape => shape.id !== id);
  res.status(204).send();
});

module.exports = router;
