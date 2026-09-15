const express = require('express');
const router = express.Router();

const authorsController = require('../controllers/authorsController');
const authorValidationRules = require('../middleware/authorValidator');
const validate = require('../middleware/validate');

router.get('/', authorsController.getAllAuthors);
router.get('/:id', authorsController.getAuthorById);
router.post('/', authorValidationRules, validate, authorsController.createAuthor);
router.put('/:id', authorValidationRules, validate, authorsController.updateAuthor);
router.delete('/:id', authorsController.deleteAuthor);

module.exports = router;
