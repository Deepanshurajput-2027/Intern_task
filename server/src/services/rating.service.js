const ratingRepository = require('../repositories/rating.repository');
const storeRepository = require('../repositories/store.repository');

const submitRating = async (userId, storeId, ratingValue) => {
    const store = await storeRepository.findStoreById(storeId);
    if (!store) {
        throw { statusCode: 404, message: 'Store not found' };
    }

    const existingRating = await ratingRepository.findRatingByUserAndStore(userId, storeId);
    if (existingRating) {
        throw { statusCode: 409, message: 'Duplicate rating. You have already rated this store.' };
    }

    return await ratingRepository.createRating({
        userId,
        storeId,
        rating: ratingValue
    });
};

const modifyRating = async (userId, storeId, ratingValue) => {
    const existingRating = await ratingRepository.findRatingByUserAndStore(userId, storeId);
    if (!existingRating) {
        throw { statusCode: 404, message: 'Rating not found' };
    }

    await ratingRepository.updateRating(userId, storeId, ratingValue);
};

module.exports = {
    submitRating,
    modifyRating
};
