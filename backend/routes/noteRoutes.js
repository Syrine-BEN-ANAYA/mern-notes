const express = require('express');
const router = express.Router();

app.use(express.json()); // 📌 à ajouter avant les routes


// GET all notes
router.get('/', async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

// POST create note
router.post('/', async (req, res) => {
  const newNote = new Note({
    title: req.body.title,
    content: req.body.content
  });
  const savedNote = await newNote.save();
  res.json(savedNote);
});

// DELETE note
router.delete('/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: 'Note deleted' });
});

module.exports = router;
