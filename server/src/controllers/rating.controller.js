const ratingService = require('../services/rating.service');

const submitRating = async (req, res, next) => {
    try {
        const rating = await ratingService.submitRating(req.user.id, req.body.storeId, req.body.rating);
        return res.status(201).json({
            success: true,
            message: 'Rating submitted successfully',
            data: rating
        });
    } catch (error) {
        next(error);
    }
};

const modifyRating = async (req, res, next) => {
    try {
        await ratingService.modifyRating(req.user.id, req.params.storeId, req.body.rating);
        return res.status(200).json({
            success: true,
            message: 'Rating updated successfully',
            data: {}
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    submitRating,
    modifyRating
};
