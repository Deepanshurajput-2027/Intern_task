const { Store, Rating, sequelize } = require('../models');
const { Op } = require('sequelize');

const getStores = async (search, sort, limit, offset, userId) => {
    const where = {};
    if (search) {
        where[Op.or] = [
            { name: { [Op.like]: `%${search}%` } },
            { address: { [Op.like]: `%${search}%` } }
        ];
    }

    let order = [];
    if (sort.field === 'overallRating') {
        order.push([sequelize.fn('AVG', sequelize.col('ratings.rating')), sort.order || 'DESC']);
    } else if (sort.field) {
        order.push([sort.field, sort.order || 'ASC']);
    } else {
        order.push(['name', 'ASC']);
    }

    const { count, rows } = await Store.findAndCountAll({
        where,
        order,
        limit,
        offset,
        attributes: [
            'id',
            'name',
            'address',
            [sequelize.fn('AVG', sequelize.col('ratings.rating')), 'overallRating']
        ],
        include: [
            {
                model: Rating,
                as: 'ratings',
                attributes: []
            }
        ],
        group: ['Store.id'],
        subQuery: false
    });

    // SubQuery false with group by returns an array of counts.
    const totalCount = Array.isArray(count) ? count.length : count;

    // Fetch user ratings separately to avoid complex double-join conflicts in Sequelize
    const storeIds = rows.map(r => r.id);
    let userRatings = [];
    if (storeIds.length > 0 && userId) {
        userRatings = await Rating.findAll({
            where: {
                storeId: { [Op.in]: storeIds },
                userId: userId
            },
            attributes: ['storeId', 'rating']
        });
    }

    const userRatingMap = {};
    userRatings.forEach(ur => {
        userRatingMap[ur.storeId] = ur.rating;
    });

    const formattedRows = rows.map(store => {
        const storeJson = store.toJSON();
        return {
            id: storeJson.id,
            name: storeJson.name,
            address: storeJson.address,
            overallRating: storeJson.overallRating ? parseFloat(storeJson.overallRating).toFixed(2) : 0,
            userRating: userRatingMap[storeJson.id] || null
        };
    });

    return { count: totalCount, rows: formattedRows };
};

const findStoreById = async (id) => {
    return await Store.findByPk(id);
};

module.exports = {
    getStores,
    findStoreById
};
