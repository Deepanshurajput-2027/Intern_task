const notFound = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found',
        errors: []
    });
};

module.exports = notFound;
