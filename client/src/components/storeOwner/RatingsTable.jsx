import '../admin/Table.css';
import { Star } from 'lucide-react';

const RatingsTable = ({ ratings, loading }) => {
  if (loading) {
    return (
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th scope="col">User</th>
              <th scope="col">Rating</th>
              <th scope="col">Review Date</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i} className="table-skeleton-row animate-pulse">
                <td><div className="skeleton-cell" style={{ width: '150px' }}></div></td>
                <td><div className="skeleton-cell" style={{ width: '80px' }}></div></td>
                <td><div className="skeleton-cell" style={{ width: '120px' }}></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (ratings.length === 0) {
    return (
      <div className="table-container">
        <div className="table-empty-state">
          <p>No ratings found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th scope="col">User Name</th>
            <th scope="col">Rating</th>
            <th scope="col">Rated On</th>
          </tr>
        </thead>
        <tbody>
          {ratings.map((rating) => (
            <tr key={rating.id}>
              <td>{rating.userName || 'Unknown User'}</td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Star size={16} fill="#F59E0B" color="#F59E0B" />
                  <span style={{ fontWeight: 'var(--font-weight-medium)' }}>{rating.rating}</span>
                </div>
              </td>
              <td>{new Date(rating.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RatingsTable;
