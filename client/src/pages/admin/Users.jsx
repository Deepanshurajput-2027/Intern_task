import { useState } from 'react';
import { useUsers } from '../../hooks/useUsers';
import { usePagination } from '../../hooks/usePagination';
import UserTable from '../../components/admin/UserTable';
import CreateUserModal from '../../components/admin/CreateUserModal';
import UserDetailsModal from '../../components/admin/UserDetailsModal';
import Pagination from '../../components/common/Pagination';
import SearchBar from '../../components/common/SearchBar';
import FilterBar from '../../components/common/FilterBar';
import Button from '../../components/ui/Button';
import { Plus } from 'lucide-react';
import './AdminPages.css';

const Users = () => {
  const { users, total, totalPages, loading, search, setSearch, role, setRoleFilter, refresh } = useUsers();
  const { page, setPage } = usePagination();
  
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="page-container">
      <header className="page-header">
        <h1 className="page-title">User Management</h1>
        <p className="page-subtitle">View and manage all users on the platform</p>
      </header>

      <div className="page-toolbar">
        <FilterBar>
          <SearchBar 
            value={search} 
            onChange={(val) => {
              // Debounce is ideal here, but for simplicity in this file we call setSearch which is handled in hook
              setSearch(val);
            }} 
            placeholder="Search by name or email..." 
          />
          <select 
            className="input-field" 
            style={{ width: 'auto', height: '40px' }} 
            value={role} 
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="">All Roles</option>
            <option value="ADMIN">Admin</option>
            <option value="STORE_OWNER">Store Owner</option>
            <option value="USER">User</option>
          </select>
        </FilterBar>

        <div className="page-toolbar-actions">
          <Button variant="primary" icon={Plus} onClick={() => setIsCreateOpen(true)}>
            Add New User
          </Button>
        </div>
      </div>

      <UserTable 
        users={users} 
        loading={loading} 
        onViewDetails={(u) => setSelectedUser(u)} 
      />

      <Pagination 
        currentPage={page} 
        totalPages={totalPages} 
        totalItems={total} 
        onPageChange={setPage} 
      />

      <CreateUserModal 
        isOpen={isCreateOpen} 
        onClose={() => setIsCreateOpen(false)} 
        onSuccess={() => { setIsCreateOpen(false); refresh(); }} 
      />

      <UserDetailsModal 
        isOpen={!!selectedUser} 
        onClose={() => setSelectedUser(null)} 
        user={selectedUser} 
      />
    </div>
  );
};

export default Users;
