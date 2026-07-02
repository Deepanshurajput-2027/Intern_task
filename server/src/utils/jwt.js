const jwt = require('jsonwebtoken');
const { env } = require('../config/env');

const generateToken = (payload) => {
    return jwt.sign(
        { id: payload.id, email: payload.email, role: payload.role },
        env.jwtSecret,
        { expiresIn: '24h' }
    );
};

const verifyToken = (token) => {
    return jwt.verify(token, env.jwtSecret);
};

module.exports = {
    generateToken,
    verifyToken
};
