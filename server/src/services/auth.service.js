const authRepository = require('../repositories/auth.repository');
const { hashPassword, comparePassword } = require('../utils/password');
const { generateToken } = require('../utils/jwt');

const register = async (userData) => {
    const existingUser = await authRepository.findUserByEmail(userData.email);
    if (existingUser) {
        throw { statusCode: 409, message: 'Email already exists' };
    }

    const hashedPassword = await hashPassword(userData.password);
    
    const newUser = await authRepository.createUser({
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        address: userData.address,
        role: 'USER' // Overridden strictly per requirements
    });

    return newUser;
};

const login = async (email, password) => {
    const user = await authRepository.findUserByEmail(email);
    if (!user) {
        throw { statusCode: 401, message: 'Invalid credentials' };
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        throw { statusCode: 401, message: 'Invalid credentials' };
    }

    const token = generateToken(user);
    
    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    };
};

module.exports = {
    register,
    login
};
