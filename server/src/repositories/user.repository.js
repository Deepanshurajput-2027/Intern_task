const { User } = require('../models');

const getUserById = async (id) => {
    return await User.findByPk(id);
};

const updatePassword = async (id, hashedPassword) => {
    return await User.update(
        { password: hashedPassword },
        { where: { id } }
    );
};

module.exports = {
    getUserById,
    updatePassword
};
