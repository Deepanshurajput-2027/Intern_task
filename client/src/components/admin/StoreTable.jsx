import './Table.css';
import Button from '../ui/Button';
import { Eye, Star } from 'lucide-react';

const StoreTable = ({ stores, loading, onViewDetails }) => {
  if (loading) {
    return (
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th scope="col">Store Name</th>
              <th scope="col">Email</th>
              <th scope="col">Owner</th>
              <th scope="col">Rating</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i} className="table-skeleton-row animate-pulse">
                <td><div className="skeleton-cell" style={{ width: '150px' }}></div></td>
                <td><div className="skeleton-cell" style={{ width: '180px' }}></div></td>
                <td><div className="skeleton-cell" style={{ width: '120px' }}></div></td>
                <td><div className="skeleton-cell" style={{ width: '50px' }}></div></td>
                <td><div className="skeleton-cell" style={{ width: '100px' }}></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (stores.length === 0) {
    return (
      <div className="table-container">
        <div className="table-empty-state">
          <p>No stores found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th scope="col">Store Name</th>
            <th scope="col">Email</th>
            <th scope="col">Owner</th>
            <th scope="col">Rating</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store) => (
            <tr key={store.id}>
              <td>{store.name}</td>
              <td>{store.email}</td>
              <td>{store.ownerName || '-'}</td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Star size={14} style={{ color: 'var(--color-primary)' }} />
                  {store.averageRating || 'N/A'}
                </div>
              </td>
              <td>
                <Button 
                  variant="ghost" 
                  icon={Eye} 
                  onClick={() => onViewDetails(store)}
                  aria-label={`View details for ${store.name}`}
                >
                  View Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StoreTable;
