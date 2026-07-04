const { Rating } = require('../models');

const findRatingByUserAndStore = async (userId, storeId) => {
    return await Rating.findOne({ where: { userId, storeId } });
};

const createRating = async (ratingData) => {
    return await Rating.create(ratingData);
};

const updateRating = async (userId, storeId, ratingValue) => {
    return await Rating.update(
        { rating: ratingValue },
        { where: { userId, storeId } }
    );
};

module.exports = {
    findRatingByUserAndStore,
    createRating,
    updateRating
};
