const adminService = require('../services/admin.service');

const getDashboardStats = async (req, res, next) => {
    try {
        const stats = await adminService.getDashboardStats();
        return res.status(200).json({
            success: true,
            message: 'Dashboard statistics retrieved successfully',
            data: stats
        });
    } catch (error) {
        next(error);
    }
};

const createUser = async (req, res, next) => {
    try {
        const user = await adminService.createUser(req.body);
        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: user
        });
    } catch (error) {
        next(error);
    }
};

const getUsers = async (req, res, next) => {
    try {
        const result = await adminService.getUsers(req.query);
        return res.status(200).json({
            success: true,
            message: 'Users retrieved successfully',
            data: result
        });
    } catch (error) {
        next(error);
    }
};

const getUserById = async (req, res, next) => {
    try {
        const user = await adminService.getUserById(req.params.id);
        return res.status(200).json({
            success: true,
            message: 'User details retrieved successfully',
            data: user
        });
    } catch (error) {
        next(error);
    }
};

const createStore = async (req, res, next) => {
    try {
        const store = await adminService.createStore(req.body);
        return res.status(201).json({
            success: true,
            message: 'Store created successfully',
            data: store
        });
    } catch (error) {
        next(error);
    }
};

const getStores = async (req, res, next) => {
    try {
        const result = await adminService.getStores(req.query);
        return res.status(200).json({
            success: true,
            message: 'Stores retrieved successfully',
            data: result
        });
    } catch (error) {
        next(error);
    }
};

const getStoreById = async (req, res, next) => {
    try {
        const store = await adminService.getStoreById(req.params.id);
        return res.status(200).json({
            success: true,
            message: 'Store details retrieved successfully',
            data: store
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getDashboardStats,
    createUser,
    getUsers,
    getUserById,
    createStore,
    getStores,
    getStoreById
};
