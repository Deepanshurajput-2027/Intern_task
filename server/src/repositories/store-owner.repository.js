const { Store, Rating, User, sequelize } = require('../models');

const getDashboardStats = async (ownerId) => {
    const totalStores = await Store.count({ where: { ownerId } });
    const stats = await Rating.findOne({
        include: {
            model: Store,
            as: 'store',
            attributes: [],
            where: { ownerId }
        },
        attributes: [
            [sequelize.fn('AVG', sequelize.col('rating')), 'averageRating'],
            [sequelize.fn('COUNT', sequelize.col('rating')), 'totalRatings']
        ],
        raw: true
    });

    return {
        totalStores,
        averageRating: stats && stats.averageRating ? parseFloat(stats.averageRating) : 0,
        totalRatings: stats && stats.totalRatings ? parseInt(stats.totalRatings, 10) : 0
    };
};

const getStores = async (ownerId) => {
    return await Store.findAll({
        where: { ownerId },
        attributes: [
            'id', 'name', 'address', 'createdAt', 'updatedAt',
            [sequelize.fn('AVG', sequelize.col('ratings.rating')), 'averageRating'],
            [sequelize.fn('COUNT', sequelize.col('ratings.id')), 'totalRatings']
        ],
        include: [{
            model: Rating,
            as: 'ratings',
            attributes: []
        }],
        group: ['Store.id']
    });
};

const findStoreByIdAndOwner = async (storeId, ownerId) => {
    return await Store.findOne({
        where: { id: storeId, ownerId }
    });
};

const getStoreRatings = async (storeId, sortField, sortOrder, limit, offset) => {
    let order = [];
    if (sortField === 'userName') {
        order.push([{ model: User, as: 'user' }, 'name', sortOrder]);
    } else {
        order.push([sortField, sortOrder]);
    }

    return await Rating.findAndCountAll({
        where: { storeId },
        order,
        limit,
        offset,
        attributes: ['rating', 'createdAt'],
        include: [{
            model: User,
            as: 'user',
            attributes: ['name']
        }]
    });
};

module.exports = {
    getDashboardStats,
    getStores,
    findStoreByIdAndOwner,
    getStoreRatings
};
