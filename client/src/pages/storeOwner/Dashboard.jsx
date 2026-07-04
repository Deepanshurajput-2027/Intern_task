import { useStoreRatings } from '../../hooks/useStoreRatings';
import { usePagination } from '../../hooks/usePagination';
import RatingsTable from '../../components/storeOwner/RatingsTable';
import DashboardCard from '../../components/admin/DashboardCard';
import StatsGrid from '../../components/admin/StatsGrid';
import Pagination from '../../components/common/Pagination';
import SearchBar from '../../components/common/SearchBar';
import FilterBar from '../../components/common/FilterBar';
import { Star, Users } from 'lucide-react';
import '../../pages/admin/AdminPages.css';

const Dashboard = () => {
  const { 
    stats, stores, selectedStoreId, setSelectedStoreId,
    ratings, total, totalPages, 
    statsLoading, ratingsLoading, 
    search, setSearch, 
    sortBy, sortOrder, setSort 
  } = useStoreRatings();
  
  const { page, setPage } = usePagination();

  const handleSortChange = (e) => {
    const val = e.target.value;
    if (val === 'newest') setSort('createdAt', 'DESC');
    if (val === 'oldest') setSort('createdAt', 'ASC');
    if (val === 'rating_desc') setSort('rating', 'DESC');
    if (val === 'rating_asc') setSort('rating', 'ASC');
  };

  const getSortValue = () => {
    if (sortBy === 'createdAt' && sortOrder === 'DESC') return 'newest';
    if (sortBy === 'createdAt' && sortOrder === 'ASC') return 'oldest';
    if (sortBy === 'rating' && sortOrder === 'DESC') return 'rating_desc';
    if (sortBy === 'rating' && sortOrder === 'ASC') return 'rating_asc';
    return 'newest';
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <h1 className="page-title">Store Dashboard</h1>
        <p className="page-subtitle">Track your store's performance and ratings</p>
      </header>

      {/* Statistics Section */}
      <StatsGrid>
        <DashboardCard 
          title="Average Rating" 
          value={stats?.averageRating ? stats.averageRating.toFixed(1) : '0.0'} 
          icon={Star} 
          loading={statsLoading} 
        />
        <DashboardCard 
          title="Total Ratings" 
          value={stats?.totalRatings || 0} 
          icon={Users} 
          loading={statsLoading} 
        />
      </StatsGrid>

      {/* Toolbar Section */}
      <div className="page-toolbar" style={{ marginTop: 'var(--spacing-16)' }}>
        <FilterBar>
          {stores && stores.length > 0 && (
            <select
              className="input-field"
              style={{ width: 'auto', height: '40px', minWidth: '200px' }}
              value={selectedStoreId}
              onChange={(e) => setSelectedStoreId(e.target.value)}
              aria-label="Select Store"
            >
              {stores.map(store => (
                <option key={store.id} value={store.id}>{store.name}</option>
              ))}
            </select>
          )}
          
          <SearchBar 
            value={search} 
            onChange={setSearch} 
            placeholder="Search by user name..." 
          />
          <select 
            className="input-field" 
            style={{ width: 'auto', height: '40px' }} 
            value={getSortValue()} 
            onChange={handleSortChange}
            aria-label="Sort ratings"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="rating_desc">Highest Rated</option>
            <option value="rating_asc">Lowest Rated</option>
          </select>
        </FilterBar>
      </div>

      {/* Main Content Section */}
      <RatingsTable 
        ratings={ratings} 
        loading={ratingsLoading} 
      />

      {/* Pagination Section */}
      <Pagination 
        currentPage={page} 
        totalPages={totalPages} 
        totalItems={total} 
        onPageChange={setPage} 
      />
    </div>
  );
};

export default Dashboard;
