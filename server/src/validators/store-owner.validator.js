const { query, param, validationResult } = require('express-validator');

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

const getStoreRatingsValidator = [
    param('storeId').isInt({ min: 1 }).withMessage('Invalid Store ID'),
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
    query('sortBy').optional().isIn(['rating', 'createdAt', 'userName']).withMessage('Invalid sort field'),
    query('sortOrder').optional().isIn(['ASC', 'DESC', 'asc', 'desc']).withMessage('Invalid sort order'),
    handleValidationErrors
];

module.exports = {
    getStoreRatingsValidator
};
