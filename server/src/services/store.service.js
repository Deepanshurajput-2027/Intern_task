const storeRepository = require('../repositories/store.repository');

const getStores = async (query, userId) => {
    const search = query.search || null;
    const sort = {
        field: query.sortBy,
        order: query.sortOrder ? query.sortOrder.toUpperCase() : 'ASC'
    };

    const page = parseInt(query.page, 10) || 1;
    const limit = parseInt(query.limit, 10) || 10;
    const offset = (page - 1) * limit;

    const result = await storeRepository.getStores(search, sort, limit, offset, userId);

    return {
        totalItems: result.count,
        totalPages: Math.ceil(result.count / limit),
        currentPage: page,
        stores: result.rows
    };
};

module.exports = {
    getStores
};
