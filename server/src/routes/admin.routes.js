const express = require('express');
const adminController = require('../controllers/admin.controller');
const { 
    createUserValidator, 
    getUsersValidator, 
    getUserByIdValidator,
    createStoreValidator,
    getStoresValidator,
    getStoreByIdValidator
} = require('../validators/admin.validator');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

const router = express.Router();

// Protect all admin routes
router.use(authenticate, authorize('ADMIN'));

// User Management
router.get('/dashboard', adminController.getDashboardStats);
router.post('/users', createUserValidator, adminController.createUser);
router.get('/users', getUsersValidator, adminController.getUsers);
router.get('/users/:id', getUserByIdValidator, adminController.getUserById);

// Store Management
router.post('/stores', createStoreValidator, adminController.createStore);
router.get('/stores', getStoresValidator, adminController.getStores);
router.get('/stores/:id', getStoreByIdValidator, adminController.getStoreById);

module.exports = router;
