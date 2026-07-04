import api from './api';

const getDashboardStats = async () => {
    const response = await api.get('/store-owner/dashboard');
    return response.data;
};

const getStores = async () => {
    const response = await api.get('/store-owner/stores');
    return response.data;
};

const getRatings = async (storeId, params) => {
    const response = await api.get(`/store-owner/stores/${storeId}/ratings`, { params });
    return response.data;
};

const updatePassword = async (data) => {
    // data should contain { currentPassword, newPassword }
    const response = await api.put('/users/password', data);
    return response.data;
};

export const ownerService = {
    getDashboardStats,
    getStores,
    getRatings,
    updatePassword
};
