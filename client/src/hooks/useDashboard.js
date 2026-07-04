import { useState, useEffect, useCallback } from 'react';
import { adminService } from '../services/admin.service';
import toast from 'react-hot-toast';

export const useDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStats = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await adminService.getDashboardStats();
            setStats(response);
        } catch (err) {
            setError(err);
            toast.error('Failed to load dashboard statistics');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    return { stats, loading, error, refresh: fetchStats };
};
