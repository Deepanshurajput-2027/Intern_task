import { useDashboard } from '../../hooks/useDashboard';
import DashboardCard from '../../components/admin/DashboardCard';
import StatsGrid from '../../components/admin/StatsGrid';
import { Users, Store, Star } from 'lucide-react';

const Dashboard = () => {
  const { stats, loading, error } = useDashboard();

  return (
    <div className="page-container">
      <header className="page-header">
        <h1 className="page-title">Dashboard Overview</h1>
        <p className="page-subtitle">Welcome back, Admin</p>
      </header>
      
      <StatsGrid>
        <DashboardCard 
          title="Total Users" 
          value={stats?.totalUsers || 0} 
          icon={Users} 
          loading={loading} 
          error={error} 
        />
        <DashboardCard 
          title="Total Stores" 
          value={stats?.totalStores || 0} 
          icon={Store} 
          loading={loading} 
          error={error} 
        />
        <DashboardCard 
          title="Total Ratings" 
          value={stats?.totalRatings || 0} 
          icon={Star} 
          loading={loading} 
          error={error} 
        />
      </StatsGrid>
    </div>
  );
};

export default Dashboard;
