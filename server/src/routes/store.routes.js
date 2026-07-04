const express = require('express');
const storeController = require('../controllers/store.controller');
const { getStoresValidator } = require('../validators/store.validator');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

const router = express.Router();

router.get('/', authenticate, authorize('USER'), getStoresValidator, storeController.getStores);

module.exports = router;
