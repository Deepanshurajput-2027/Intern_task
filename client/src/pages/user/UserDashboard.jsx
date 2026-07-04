import { useState } from 'react';
import { useUserStores } from '../../hooks/useUserStores';
import { usePagination } from '../../hooks/usePagination';
import StoreGrid from '../../components/user/StoreGrid';
import RatingModal from '../../components/user/RatingModal';
import Pagination from '../../components/common/Pagination';
import SearchBar from '../../components/common/SearchBar';
import FilterBar from '../../components/common/FilterBar';
import Button from '../../components/ui/Button';
import './UserPages.css';

const UserDashboard = () => {
  const { 
    stores, total, totalPages, loading, 
    search, setSearch, 
    sortBy, sortOrder, setSort, 
    refresh 
  } = useUserStores();
  
  const { page, setPage } = usePagination(12);
  
  const [selectedStore, setSelectedStore] = useState(null);

  const handleSortChange = (e) => {
    const val = e.target.value;
    if (val === 'name_asc') setSort('name', 'ASC');
    if (val === 'rating_desc') setSort('overallRating', 'DESC');
    if (val === 'rating_asc') setSort('overallRating', 'ASC');
  };

  const getSortValue = () => {
    if (sortBy === 'name') return 'name_asc';
    if (sortBy === 'overallRating' && sortOrder === 'DESC') return 'rating_desc';
    if (sortBy === 'overallRating' && sortOrder === 'ASC') return 'rating_asc';
    return 'name_asc';
  };

  const handleClearFilters = () => {
    setSearch('');
    setSort('name', 'ASC');
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <h1 className="page-title">Discover Stores</h1>
        <p className="page-subtitle">Browse and rate your favorite stores</p>
      </header>

      <div className="page-toolbar">
        <FilterBar>
          <SearchBar 
            value={search} 
            onChange={setSearch} 
            placeholder="Search stores..." 
          />
          <select 
            className="input-field" 
            style={{ width: 'auto', height: '40px' }} 
            value={getSortValue()} 
            onChange={handleSortChange}
            aria-label="Sort stores"
          >
            <option value="name_asc">Name (A-Z)</option>
            <option value="rating_desc">Highest Rated</option>
            <option value="rating_asc">Lowest Rated</option>
          </select>
        </FilterBar>

        {(search || sortBy !== 'name') && (
          <div className="page-toolbar-actions">
            <Button variant="ghost" onClick={handleClearFilters}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      <StoreGrid 
        stores={stores} 
        loading={loading} 
        onRateAction={setSelectedStore} 
      />

      <Pagination 
        currentPage={page} 
        totalPages={totalPages} 
        totalItems={total} 
        onPageChange={setPage} 
      />

      <RatingModal 
        isOpen={!!selectedStore} 
        onClose={() => setSelectedStore(null)} 
        store={selectedStore} 
        onSuccess={refresh}
      />
    </div>
  );
};

export default UserDashboard;
