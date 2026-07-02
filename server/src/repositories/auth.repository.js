const { User } = require('../models');

const createUser = async (userData) => {
    return await User.create(userData);
};

const findUserByEmail = async (email) => {
    return await User.findOne({ where: { email } });
};

module.exports = {
    createUser,
    findUserByEmail
};
