const { body, param, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array().map(err => ({ field: err.path, message: err.msg }))
        });
    }
    next();
};

const createRatingValidator = [
    body('storeId').isInt().withMessage('Store ID must be an integer'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be an integer between 1 and 5'),
    handleValidationErrors
];

const updateRatingValidator = [
    param('storeId').isInt().withMessage('Store ID must be an integer'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be an integer between 1 and 5'),
    handleValidationErrors
];

module.exports = {
    createRatingValidator,
    updateRatingValidator
};
