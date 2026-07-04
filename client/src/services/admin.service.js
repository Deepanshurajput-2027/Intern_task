import api from './api';

const getDashboardStats = async () => {
    const response = await api.get('/admin/dashboard');
    return response.data;
};

const getUsers = async (params) => {
    const response = await api.get('/admin/users', { params });
    return response.data;
};

const getUserById = async (id) => {
    const response = await api.get(`/admin/users/${id}`);
    return response.data;
};

const createUser = async (userData) => {
    const response = await api.post('/admin/users', userData);
    return response.data;
};

const getStores = async (params) => {
    const response = await api.get('/admin/stores', { params });
    return response.data;
};

const getStoreById = async (id) => {
    const response = await api.get(`/admin/stores/${id}`);
    return response.data;
};

const createStore = async (storeData) => {
    const response = await api.post('/admin/stores', storeData);
    return response.data;
};

export const adminService = {
    getDashboardStats,
    getUsers,
    getUserById,
    createUser,
    getStores,
    getStoreById,
    createStore
};
