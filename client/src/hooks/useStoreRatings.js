import { useState, useEffect, useCallback } from 'react';
import { ownerService } from '../services/owner.service';
import toast from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';

export const useStoreRatings = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'DESC';

    const [stats, setStats] = useState(null);
    const [stores, setStores] = useState([]);
    const [selectedStoreId, setSelectedStoreId] = useState('');
    
    const [ratings, setRatings] = useState([]);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    
    const [statsLoading, setStatsLoading] = useState(true);
    const [ratingsLoading, setRatingsLoading] = useState(true);

    const fetchDashboardData = useCallback(async () => {
        setStatsLoading(true);
        try {
            const [statsRes, storesRes] = await Promise.all([
                ownerService.getDashboardStats(),
                ownerService.getStores()
            ]);
            setStats(statsRes);
            setStores(storesRes);
            
            if (storesRes.length > 0 && !selectedStoreId) {
                setSelectedStoreId(storesRes[0].id.toString());
            }
        } catch (err) {
            console.error(err);
            toast.error('Failed to load dashboard statistics');
        } finally {
            setStatsLoading(false);
        }
    }, [selectedStoreId]);

    const fetchRatings = useCallback(async () => {
        if (!selectedStoreId) return;
        
        setRatingsLoading(true);
        try {
            const params = { page, limit, sortBy, sortOrder };
            if (search) params.search = search;
            
            const response = await ownerService.getRatings(selectedStoreId, params);
            setRatings(response.ratings);
            setTotal(response.pagination.totalItems);
            setTotalPages(response.pagination.totalPages);
        } catch (err) {
            console.error(err);
            toast.error('Failed to load ratings');
        } finally {
            setRatingsLoading(false);
        }
    }, [selectedStoreId, page, limit, search, sortBy, sortOrder]);

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    useEffect(() => {
        fetchRatings();
    }, [fetchRatings]);

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
        stats,
        stores,
        selectedStoreId,
        setSelectedStoreId,
        ratings,
        total,
        totalPages,
        statsLoading,
        ratingsLoading,
        search,
        setSearch,
        sortBy,
        sortOrder,
        setSort,
        refreshStats: fetchDashboardData,
        refreshRatings: fetchRatings
    };
};
