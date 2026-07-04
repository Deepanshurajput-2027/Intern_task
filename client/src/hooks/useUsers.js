import { useState, useEffect, useCallback } from 'react';
import { adminService } from '../services/admin.service';
import toast from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';

export const useUsers = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const search = searchParams.get('search') || '';
    const role = searchParams.get('role') || '';

    const [users, setUsers] = useState([]);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const params = { page, limit };
            if (search) params.search = search;
            if (role) params.role = role;
            
            const response = await adminService.getUsers(params);
            setUsers(response.users);
            setTotal(response.total);
            setTotalPages(response.totalPages);
        } catch (err) {
            setError(err);
            toast.error('Failed to load users');
        } finally {
            setLoading(false);
        }
    }, [page, limit, search, role]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const setSearch = (val) => {
        setSearchParams((prev) => {
            if (val) prev.set('search', val);
            else prev.delete('search');
            prev.set('page', '1');
            return prev;
        });
    };

    const setRoleFilter = (val) => {
        setSearchParams((prev) => {
            if (val) prev.set('role', val);
            else prev.delete('role');
            prev.set('page', '1');
            return prev;
        });
    };

    return {
        users,
        total,
        totalPages,
        loading,
        error,
        search,
        setSearch,
        role,
        setRoleFilter,
        refresh: fetchUsers
    };
};
