const userRepository = require('../repositories/user.repository');
const { comparePassword, hashPassword } = require('../utils/password');

const updatePassword = async (userId, currentPassword, newPassword) => {
    const user = await userRepository.getUserById(userId);
    if (!user) {
        throw { statusCode: 404, message: 'User not found' };
    }

    const isValid = await comparePassword(currentPassword, user.password);
    if (!isValid) {
        throw { statusCode: 401, message: 'Incorrect current password' };
    }

    const hashedPassword = await hashPassword(newPassword);
    await userRepository.updatePassword(userId, hashedPassword);
};

module.exports = {
    updatePassword
};
