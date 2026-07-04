const storeOwnerRepository = require('../repositories/store-owner.repository');

const getDashboard = async (ownerId) => {
    const stats = await storeOwnerRepository.getDashboardStats(ownerId);
    return stats;
};

const getStores = async (ownerId) => {
    const stores = await storeOwnerRepository.getStores(ownerId);
    return stores.map(store => {
        const storeJson = store.toJSON();
        return {
            ...storeJson,
            averageRating: storeJson.averageRating ? parseFloat(storeJson.averageRating).toFixed(2) : 0,
            totalRatings: storeJson.totalRatings || 0
        };
    });
};

const getStoreRatings = async (ownerId, storeId, query) => {
    const store = await storeOwnerRepository.findStoreByIdAndOwner(storeId, ownerId);
    if (!store) {
        throw { statusCode: 403, message: 'Store does not exist or does not belong to you' };
    }

    const page = parseInt(query.page, 10) || 1;
    const limit = parseInt(query.limit, 10) || 10;
    const offset = (page - 1) * limit;

    const sortField = query.sortBy || 'createdAt';
    const sortOrder = query.sortOrder ? query.sortOrder.toUpperCase() : 'DESC';

    const result = await storeOwnerRepository.getStoreRatings(storeId, sortField, sortOrder, limit, offset);

    const totalPages = Math.ceil(result.count / limit);

    return {
        ratings: result.rows.map(row => {
            const r = row.toJSON();
            return {
                userName: r.user ? r.user.name : 'Unknown User',
                rating: r.rating,
                ratedOn: r.createdAt
            };
        }),
        pagination: {
            page,
            limit,
            totalItems: result.count,
            totalPages,
            currentPage: page,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1
        }
    };
};

module.exports = {
    getDashboard,
    getStores,
    getStoreRatings
};
