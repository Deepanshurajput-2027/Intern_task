const storeService = require('../services/store.service');

const getStores = async (req, res, next) => {
    try {
        const result = await storeService.getStores(req.query, req.user.id);
        return res.status(200).json({
            success: true,
            message: 'Stores retrieved successfully',
            data: result
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getStores
};
