const userService = require('../services/user.service');

const updatePassword = async (req, res, next) => {
    try {
        await userService.updatePassword(req.user.id, req.body.currentPassword, req.body.newPassword);
        return res.status(200).json({
            success: true,
            message: 'Password updated successfully',
            data: {}
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    updatePassword
};
