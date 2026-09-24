const express = require('express');
const router = express.Router();

const authorsController = require('../controllers/authorsController');
const authorValidationRules = require('../middleware/authorValidator');
const validate = require('../middleware/validate');
const isAuthenticated = require('../middleware/isAuthenticated');

router.get('/', authorsController.getAllAuthors);
router.get('/:id', authorsController.getAuthorById);
router.post('/', isAuthenticated, authorValidationRules, validate, authorsController.createAuthor);
router.put('/:id', isAuthenticated, authorValidationRules, validate, authorsController.updateAuthor);
router.delete('/:id', isAuthenticated, authorsController.deleteAuthor);

module.exports = router;
