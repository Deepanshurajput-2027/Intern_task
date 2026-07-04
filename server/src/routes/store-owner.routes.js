const express = require('express');
const storeOwnerController = require('../controllers/store-owner.controller');
const { getStoreRatingsValidator } = require('../validators/store-owner.validator');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

const router = express.Router();

router.use(authenticate, authorize('STORE_OWNER'));

router.get('/dashboard', storeOwnerController.getDashboard);
router.get('/stores', storeOwnerController.getStores);
router.get('/stores/:storeId/ratings', getStoreRatingsValidator, storeOwnerController.getStoreRatings);

module.exports = router;
