import api from './api';

const getStores = async (params) => {
    const response = await api.get('/stores', { params });
    if (response.data && response.data.stores) {
        response.data.stores = response.data.stores.map(store => ({
            ...store,
            averageRating: store.overallRating ? parseFloat(store.overallRating) : null,
            userRating: store.userRating ? { rating: parseInt(store.userRating, 10) } : null,
        }));
    }
    return response.data;
};

const submitRating = async (storeId, rating) => {
    const response = await api.post('/ratings', { storeId, rating });
    return response.data;
};

const updateRating = async (storeId, rating) => {
    const response = await api.put(`/ratings/${storeId}`, { rating });
    return response.data;
};

const updatePassword = async (data) => {
    // data should contain { currentPassword, newPassword }
    const response = await api.put('/users/password', data);
    return response.data;
};

export const userService = {
    getStores,
    submitRating,
    updateRating,
    updatePassword
};
