const { ObjectId } = require('mongodb');
const { getDb } = require('../config/db');

// GET all books
const getAllBooks = async (req, res) => {
  try {
    const db = getDb();
    const books = await db.collection('books').find().toArray();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving books', error: err.message });
  }
};

// GET single book by id
const getBookById = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid book id' });
    }
    const db = getDb();
    const book = await db
      .collection('books')
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving book', error: err.message });
  }
};

// POST create a new book
const createBook = async (req, res) => {
  try {
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      publishedYear: req.body.publishedYear,
      pages: req.body.pages,
      isbn: req.body.isbn,
      rating: req.body.rating,
      description: req.body.description
    };

    const db = getDb();
    const response = await db.collection('books').insertOne(newBook);
    res.status(201).json({ message: 'Book created', bookId: response.insertedId });
  } catch (err) {
    res.status(500).json({ message: 'Error creating book', error: err.message });
  }
};

// PUT update an existing book
const updateBook = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid book id' });
    }

    const updatedBook = {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      publishedYear: req.body.publishedYear,
      pages: req.body.pages,
      isbn: req.body.isbn,
      rating: req.body.rating,
      description: req.body.description
    };

    const db = getDb();
    const response = await db
      .collection('books')
      .replaceOne({ _id: new ObjectId(req.params.id) }, updatedBook);

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book updated' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating book', error: err.message });
  }
};

// DELETE a book
const deleteBook = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid book id' });
    }

    const db = getDb();
    const response = await db
      .collection('books')
      .deleteOne({ _id: new ObjectId(req.params.id) });

    if (response.deletedCount === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting book', error: err.message });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};
