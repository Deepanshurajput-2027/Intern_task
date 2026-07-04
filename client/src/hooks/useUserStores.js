import { useState, useEffect, useCallback } from 'react';
import { userService } from '../services/user.service';
import toast from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';

export const useUserStores = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 12; // 12 fits nicely in a 2/3/4 grid
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || 'name';
    const sortOrder = searchParams.get('sortOrder') || 'ASC';

    const [stores, setStores] = useState([]);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStores = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const params = { page, limit, sortBy, sortOrder };
            if (search) params.search = search;
            
            const response = await userService.getStores(params);
            setStores(response.stores);
            setTotal(response.total);
            setTotalPages(response.totalPages);
        } catch (err) {
            setError(err);
            toast.error('Failed to load stores');
        } finally {
            setLoading(false);
        }
    }, [page, limit, search, sortBy, sortOrder]);

    useEffect(() => {
        fetchStores();
    }, [fetchStores]);

    const setSearch = (val) => {
        setSearchParams((prev) => {
            if (val) prev.set('search', val);
            else prev.delete('search');
            prev.set('page', '1');
            return prev;
        });
    };

    const setSort = (by, order) => {
        setSearchParams((prev) => {
            if (by) prev.set('sortBy', by);
            if (order) prev.set('sortOrder', order);
            prev.set('page', '1');
            return prev;
        });
    };

    return {
        stores,
        total,
        totalPages,
        loading,
        error,
        search,
        setSearch,
        sortBy,
        sortOrder,
        setSort,
        refresh: fetchStores
    };
};
