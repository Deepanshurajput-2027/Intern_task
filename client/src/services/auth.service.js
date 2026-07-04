import api from './api';

const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data; // { token, user: { id, name, email, role } }
};

const register = async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data; // { user: { id, name, email, role } }
};

export const authService = {
    login,
    register
};
