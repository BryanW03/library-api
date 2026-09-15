const express = require('express');
const router = express.Router();

const booksController = require('../controllers/booksController');
const bookValidationRules = require('../middleware/bookValidator');
const validate = require('../middleware/validate');

router.get('/', booksController.getAllBooks);
router.get('/:id', booksController.getBookById);
router.post('/', bookValidationRules, validate, booksController.createBook);
router.put('/:id', bookValidationRules, validate, booksController.updateBook);
router.delete('/:id', booksController.deleteBook);

module.exports = router;
