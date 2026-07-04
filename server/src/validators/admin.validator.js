const { body, query, param, validationResult } = require('express-validator');

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

const createUserValidator = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 20, max: 60 }).withMessage('Name must be between 20 and 60 characters'),
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Must be a valid email address')
        .normalizeEmail(),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8, max: 16 }).withMessage('Password must be between 8 and 16 characters')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/[\W_]/).withMessage('Password must contain at least one special character'),
    body('address')
        .optional()
        .trim()
        .isLength({ max: 400 }).withMessage('Address cannot exceed 400 characters'),
    body('role')
        .notEmpty().withMessage('Role is required')
        .isIn(['ADMIN', 'USER', 'STORE_OWNER']).withMessage('Invalid role'),
    handleValidationErrors
];

const getUsersValidator = [
    query('role').optional().isIn(['ADMIN', 'USER', 'STORE_OWNER']).withMessage('Invalid role filter'),
    query('sortField').optional().isIn(['name', 'email', 'role']).withMessage('Invalid sort field'),
    query('sortOrder').optional().isIn(['ASC', 'DESC', 'asc', 'desc']).withMessage('Invalid sort order'),
    handleValidationErrors
];

const getUserByIdValidator = [
    param('id').isInt().withMessage('Invalid user ID'),
    handleValidationErrors
];

const createStoreValidator = [
    body('name').trim().notEmpty().withMessage('Store name is required'),
    body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Must be a valid email address').normalizeEmail(),
    body('address').trim().notEmpty().withMessage('Address is required'),
    body('ownerId').isInt().withMessage('Owner ID must be an integer'),
    handleValidationErrors
];

const getStoresValidator = [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
    query('sortField').optional().isIn(['name', 'email', 'createdAt']).withMessage('Invalid sort field'),
    query('sortOrder').optional().isIn(['ASC', 'DESC', 'asc', 'desc']).withMessage('Invalid sort order'),
    handleValidationErrors
];

const getStoreByIdValidator = [
    param('id').isInt().withMessage('Invalid store ID'),
    handleValidationErrors
];

module.exports = {
    createUserValidator,
    getUsersValidator,
    getUserByIdValidator,
    createStoreValidator,
    getStoresValidator,
    getStoreByIdValidator
};
