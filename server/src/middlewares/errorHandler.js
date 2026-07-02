const errorHandler = (err, req, res, next) => {
    // Log unexpected errors, avoid logging sensitive info
    if (!err.statusCode || err.statusCode === 500) {
        console.error('Unexpected error:', err.message);
    }

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';

    res.status(statusCode).json({
        success: false,
        message,
        errors: err.errors || []
    });
};

module.exports = errorHandler;
