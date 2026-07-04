import { useState, useEffect, useCallback } from 'react';
import { adminService } from '../services/admin.service';
import toast from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';

export const useStores = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const search = searchParams.get('search') || '';

    const [stores, setStores] = useState([]);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStores = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const params = { page, limit };
            if (search) params.search = search;
            
            const response = await adminService.getStores(params);
            setStores(response.stores);
            setTotal(response.total);
            setTotalPages(response.totalPages);
        } catch (err) {
            setError(err);
            toast.error('Failed to load stores');
        } finally {
            setLoading(false);
        }
    }, [page, limit, search]);

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

    return {
        stores,
        total,
        totalPages,
        loading,
        error,
        search,
        setSearch,
        refresh: fetchStores
    };
};
