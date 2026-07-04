const express = require('express');
const userController = require('../controllers/user.controller');
const { updatePasswordValidator } = require('../validators/user.validator');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

const router = express.Router();

router.put('/password', authenticate, authorize('ADMIN', 'USER', 'STORE_OWNER'), updatePasswordValidator, userController.updatePassword);

module.exports = router;
