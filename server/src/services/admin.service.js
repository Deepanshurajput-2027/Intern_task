const adminRepository = require('../repositories/admin.repository');
const { hashPassword } = require('../utils/password');

const getDashboardStats = async () => {
    return await adminRepository.getDashboardStats();
};

const createUser = async (userData) => {
    const existingUser = await adminRepository.findUserByEmail(userData.email);
    if (existingUser) {
        throw { statusCode: 409, message: 'Email already exists' };
    }

    const hashedPassword = await hashPassword(userData.password);

    const newUser = await adminRepository.createUser({
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        address: userData.address,
        role: userData.role
    });

    const userObj = newUser.toJSON();
    delete userObj.password;
    return userObj;
};

const getUsers = async (query) => {
    const filters = {
        name: query.name,
        email: query.email,
        address: query.address,
        role: query.role
    };

    const sort = {
        field: query.sortField,
        order: query.sortOrder ? query.sortOrder.toUpperCase() : 'ASC'
    };

    const page = parseInt(query.page, 10) || 1;
    const limit = parseInt(query.limit, 10) || 10;
    const offset = (page - 1) * limit;

    const result = await adminRepository.getUsers(filters, sort, limit, offset);

    return {
        total: result.count,
        pages: Math.ceil(result.count / limit),
        currentPage: page,
        users: result.rows
    };
};

const getUserById = async (id) => {
    const user = await adminRepository.getUserById(id);
    if (!user) {
        throw { statusCode: 404, message: 'User not found' };
    }

    const userData = user.toJSON();

    if (userData.role === 'STORE_OWNER') {
        userData.averageStoreRating = await adminRepository.getAverageStoreRatingForOwner(id);
    }

    return userData;
};

const createStore = async (storeData) => {
    const existingOwner = await adminRepository.getUserById(storeData.ownerId);
    if (!existingOwner) {
        throw { statusCode: 404, message: 'Owner not found' };
    }
    if (existingOwner.role !== 'STORE_OWNER') {
        throw { statusCode: 422, message: 'Assigned user is not a STORE_OWNER' };
    }

    const existingStore = await adminRepository.findStoreByEmail(storeData.email);
    if (existingStore) {
        throw { statusCode: 409, message: 'Store email already exists' };
    }

    return await adminRepository.createStore(storeData);
};

const getStores = async (query) => {
    const filters = {
        name: query.name,
        email: query.email,
        address: query.address,
        ownerId: query.ownerId
    };

    const sort = {
        field: query.sortField,
        order: query.sortOrder ? query.sortOrder.toUpperCase() : 'DESC'
    };

    const page = parseInt(query.page, 10) || 1;
    const limit = parseInt(query.limit, 10) || 10;
    const offset = (page - 1) * limit;

    const result = await adminRepository.getStores(filters, sort, limit, offset);

    // findAndCountAll with group by returns an array of counts. 
    const totalCount = Array.isArray(result.count) ? result.count.length : result.count;

    return {
        total: totalCount,
        pages: Math.ceil(totalCount / limit),
        currentPage: page,
        stores: result.rows
    };
};

const getStoreById = async (id) => {
    const store = await adminRepository.getStoreById(id);
    if (!store) {
        throw { statusCode: 404, message: 'Store not found' };
    }
    return store;
};

module.exports = {
    getDashboardStats,
    createUser,
    getUsers,
    getUserById,
    createStore,
    getStores,
    getStoreById
};
