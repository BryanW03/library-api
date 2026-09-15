const { body } = require('express-validator');

const bookValidationRules = [
  body('title').isString().trim().notEmpty().withMessage('Title is required'),
  body('author').isString().trim().notEmpty().withMessage('Author is required'),
  body('genre').isString().trim().notEmpty().withMessage('Genre is required'),
  body('publishedYear')
    .isInt({ min: 1000, max: 2100 })
    .withMessage('Published year must be a valid year'),
  body('pages').isInt({ min: 1 }).withMessage('Pages must be a positive number'),
  body('isbn').isString().trim().notEmpty().withMessage('ISBN is required'),
  body('rating')
    .isFloat({ min: 0, max: 5 })
    .withMessage('Rating must be a number between 0 and 5'),
  body('description').isString().trim().notEmpty().withMessage('Description is required')
];

module.exports = bookValidationRules;
