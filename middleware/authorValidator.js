const { body } = require('express-validator');

const authorValidationRules = [
  body('name').isString().trim().notEmpty().withMessage('Name is required'),
  body('birthYear').isInt({ min: 1000, max: 2100 }).withMessage('Birth year must be a valid year'),
  body('nationality').isString().trim().notEmpty().withMessage('Nationality is required'),
  body('biography').isString().trim().notEmpty().withMessage('Biography is required'),
  body('website').isURL().withMessage('Website must be a valid URL'),
  body('booksPublished')
    .isInt({ min: 0 })
    .withMessage('Books published must be a non-negative number')
];

module.exports = authorValidationRules;
