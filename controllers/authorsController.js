const { ObjectId } = require('mongodb');
const { getDb } = require('../config/db');

// GET all authors
const getAllAuthors = async (req, res) => {
  try {
    const db = getDb();
    const authors = await db.collection('authors').find().toArray();
    res.status(200).json(authors);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving authors', error: err.message });
  }
};

// GET single author by id
const getAuthorById = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid author id' });
    }
    const db = getDb();
    const author = await db
      .collection('authors')
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }
    res.status(200).json(author);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving author', error: err.message });
  }
};

// POST create a new author
const createAuthor = async (req, res) => {
  try {
    const newAuthor = {
      name: req.body.name,
      birthYear: req.body.birthYear,
      nationality: req.body.nationality,
      biography: req.body.biography,
      website: req.body.website,
      booksPublished: req.body.booksPublished
    };

    const db = getDb();
    const response = await db.collection('authors').insertOne(newAuthor);
    res.status(201).json({ message: 'Author created', authorId: response.insertedId });
  } catch (err) {
    res.status(500).json({ message: 'Error creating author', error: err.message });
  }
};

// PUT update an existing author
const updateAuthor = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid author id' });
    }

    const updatedAuthor = {
      name: req.body.name,
      birthYear: req.body.birthYear,
      nationality: req.body.nationality,
      biography: req.body.biography,
      website: req.body.website,
      booksPublished: req.body.booksPublished
    };

    const db = getDb();
    const response = await db
      .collection('authors')
      .replaceOne({ _id: new ObjectId(req.params.id) }, updatedAuthor);

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: 'Author not found' });
    }
    res.status(200).json({ message: 'Author updated' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating author', error: err.message });
  }
};

// DELETE an author
const deleteAuthor = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid author id' });
    }

    const db = getDb();
    const response = await db
      .collection('authors')
      .deleteOne({ _id: new ObjectId(req.params.id) });

    if (response.deletedCount === 0) {
      return res.status(404).json({ message: 'Author not found' });
    }
    res.status(200).json({ message: 'Author deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting author', error: err.message });
  }
};

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
};
