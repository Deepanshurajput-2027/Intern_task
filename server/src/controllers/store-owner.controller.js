const storeOwnerService = require('../services/store-owner.service');

const getDashboard = async (req, res, next) => {
    try {
        const stats = await storeOwnerService.getDashboard(req.user.id);
        return res.status(200).json({
            success: true,
            message: 'Dashboard stats retrieved successfully',
            data: stats
        });
    } catch (error) {
        next(error);
    }
};

const getStores = async (req, res, next) => {
    try {
        const stores = await storeOwnerService.getStores(req.user.id);
        return res.status(200).json({
            success: true,
            message: 'Stores retrieved successfully',
            data: stores
        });
    } catch (error) {
        next(error);
    }
};

const getStoreRatings = async (req, res, next) => {
    try {
        const result = await storeOwnerService.getStoreRatings(req.user.id, req.params.storeId, req.query);
        return res.status(200).json({
            success: true,
            message: 'Store ratings retrieved successfully',
            data: result
        });
    } catch (error) {
        // Translate 403 into standard 404 or just forward it depending on requirement
        next(error);
    }
};

module.exports = {
    getDashboard,
    getStores,
    getStoreRatings
};
