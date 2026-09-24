const express = require('express');
const router = express.Router();

const booksController = require('../controllers/booksController');
const bookValidationRules = require('../middleware/bookValidator');
const validate = require('../middleware/validate');
const isAuthenticated = require('../middleware/isAuthenticated');

router.get('/', booksController.getAllBooks);
router.get('/:id', booksController.getBookById);
router.post('/', isAuthenticated, bookValidationRules, validate, booksController.createBook);
router.put('/:id', isAuthenticated, bookValidationRules, validate, booksController.updateBook);
router.delete('/:id', isAuthenticated, booksController.deleteBook);

module.exports = router;
