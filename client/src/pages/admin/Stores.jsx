import { useState } from 'react';
import { useStores } from '../../hooks/useStores';
import { usePagination } from '../../hooks/usePagination';
import StoreTable from '../../components/admin/StoreTable';
import CreateStoreModal from '../../components/admin/CreateStoreModal';
import StoreDetailsModal from '../../components/admin/StoreDetailsModal';
import Pagination from '../../components/common/Pagination';
import SearchBar from '../../components/common/SearchBar';
import FilterBar from '../../components/common/FilterBar';
import Button from '../../components/ui/Button';
import { Plus } from 'lucide-react';
import './AdminPages.css';

const Stores = () => {
  const { stores, total, totalPages, loading, search, setSearch, refresh } = useStores();
  const { page, setPage } = usePagination();
  
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);

  return (
    <div className="page-container">
      <header className="page-header">
        <h1 className="page-title">Store Management</h1>
        <p className="page-subtitle">View and manage all stores on the platform</p>
      </header>

      <div className="page-toolbar">
        <FilterBar>
          <SearchBar 
            value={search} 
            onChange={setSearch} 
            placeholder="Search by store name..." 
          />
        </FilterBar>

        <div className="page-toolbar-actions">
          <Button variant="primary" icon={Plus} onClick={() => setIsCreateOpen(true)}>
            Add New Store
          </Button>
        </div>
      </div>

      <StoreTable 
        stores={stores} 
        loading={loading} 
        onViewDetails={(s) => setSelectedStore(s)} 
      />

      <Pagination 
        currentPage={page} 
        totalPages={totalPages} 
        totalItems={total} 
        onPageChange={setPage} 
      />

      <CreateStoreModal 
        isOpen={isCreateOpen} 
        onClose={() => setIsCreateOpen(false)} 
        onSuccess={() => { setIsCreateOpen(false); refresh(); }} 
      />

      <StoreDetailsModal 
        isOpen={!!selectedStore} 
        onClose={() => setSelectedStore(null)} 
        store={selectedStore} 
      />
    </div>
  );
};

export default Stores;
