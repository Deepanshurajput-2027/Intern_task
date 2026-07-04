const express = require('express');
const ratingController = require('../controllers/rating.controller');
const { createRatingValidator, updateRatingValidator } = require('../validators/rating.validator');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

const router = express.Router();

router.post('/', authenticate, authorize('USER'), createRatingValidator, ratingController.submitRating);
router.put('/:storeId', authenticate, authorize('USER'), updateRatingValidator, ratingController.modifyRating);

module.exports = router;
