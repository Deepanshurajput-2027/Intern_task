const { User, Store, Rating, sequelize } = require('../models');
const { Op } = require('sequelize');

const getDashboardStats = async () => {
    const [totalUsers, totalStores, totalRatings] = await Promise.all([
        User.count(),
        Store.count(),
        Rating.count()
    ]);
    return { totalUsers, totalStores, totalRatings };
};

const createUser = async (userData) => {
    return await User.create(userData);
};

const findUserByEmail = async (email) => {
    return await User.findOne({ where: { email } });
};

const getUsers = async (filters, sort, limit, offset) => {
    const where = {};
    if (filters.name) where.name = { [Op.like]: `%${filters.name}%` };
    if (filters.email) where.email = { [Op.like]: `%${filters.email}%` };
    if (filters.address) where.address = { [Op.like]: `%${filters.address}%` };
    if (filters.role) where.role = filters.role;

    let order = [];
    if (sort.field && sort.order) {
        order.push([sort.field, sort.order]);
    } else {
        order.push(['createdAt', 'DESC']);
    }

    return await User.findAndCountAll({
        where,
        order,
        limit,
        offset,
        attributes: { exclude: ['password'] }
    });
};

const getUserById = async (id) => {
    return await User.findByPk(id, {
        attributes: { exclude: ['password'] }
    });
};

const getAverageStoreRatingForOwner = async (ownerId) => {
    const result = await Rating.findOne({
        include: [{
            model: Store,
            as: 'store',
            attributes: [],
            where: { ownerId }
        }],
        attributes: [
            [sequelize.fn('AVG', sequelize.col('rating')), 'averageRating']
        ],
        raw: true
    });
    return result && result.averageRating ? parseFloat(result.averageRating).toFixed(2) : 0;
};

const findStoreByEmail = async (email) => {
    return await Store.findOne({ where: { email } });
};

const createStore = async (storeData) => {
    return await Store.create(storeData);
};

const getStores = async (filters, sort, limit, offset) => {
    const where = {};
    if (filters.name) where.name = { [Op.like]: `%${filters.name}%` };
    if (filters.email) where.email = { [Op.like]: `%${filters.email}%` };
    if (filters.address) where.address = { [Op.like]: `%${filters.address}%` };
    if (filters.ownerId) where.ownerId = filters.ownerId;

    let order = [];
    if (sort.field && sort.order) {
        order.push([sort.field, sort.order]);
    } else {
        order.push(['createdAt', 'DESC']);
    }

    return await Store.findAndCountAll({
        where,
        order,
        limit,
        offset,
        attributes: {
            include: [
                [sequelize.fn('AVG', sequelize.col('ratings.rating')), 'overallRating']
            ]
        },
        include: [
            {
                model: User,
                as: 'owner',
                attributes: ['id', 'name', 'email']
            },
            {
                model: Rating,
                as: 'ratings',
                attributes: []
            }
        ],
        group: ['Store.id', 'owner.id'],
        subQuery: false
    });
};

const getStoreById = async (id) => {
    return await Store.findByPk(id, {
        attributes: {
            include: [
                [sequelize.fn('AVG', sequelize.col('ratings.rating')), 'averageRating'],
                [sequelize.fn('COUNT', sequelize.col('ratings.id')), 'ratingCount']
            ]
        },
        include: [
            {
                model: User,
                as: 'owner',
                attributes: ['id', 'name', 'email']
            },
            {
                model: Rating,
                as: 'ratings',
                attributes: []
            }
        ],
        group: ['Store.id', 'owner.id']
    });
};

module.exports = {
    getDashboardStats,
    createUser,
    findUserByEmail,
    getUsers,
    getUserById,
    getAverageStoreRatingForOwner,
    findStoreByEmail,
    createStore,
    getStores,
    getStoreById
};
