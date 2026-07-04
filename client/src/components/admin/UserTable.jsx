import './Table.css';
import Button from '../ui/Button';
import { Eye } from 'lucide-react';

const UserTable = ({ users, loading, onViewDetails }) => {
  if (loading) {
    return (
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i} className="table-skeleton-row animate-pulse">
                <td><div className="skeleton-cell" style={{ width: '120px' }}></div></td>
                <td><div className="skeleton-cell" style={{ width: '180px' }}></div></td>
                <td><div className="skeleton-cell" style={{ width: '80px' }}></div></td>
                <td><div className="skeleton-cell" style={{ width: '100px' }}></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="table-container">
        <div className="table-empty-state">
          <p>No users found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col">Role</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.address || '-'}</td>
              <td>
                <span className="badge-role">{user.role}</span>
              </td>
              <td>
                <Button 
                  variant="ghost" 
                  icon={Eye} 
                  onClick={() => onViewDetails(user)}
                  aria-label={`View details for ${user.name}`}
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

export default UserTable;
