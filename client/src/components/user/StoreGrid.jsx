import './StoreGrid.css';
import StoreCard from './StoreCard';

const StoreGrid = ({ stores, loading, onRateAction }) => {
  if (loading) {
    return (
      <div className="store-grid">
        {/* Render 6 skeletons as dictated for Desktop fallback */}
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="store-card-skeleton animate-pulse" />
        ))}
      </div>
    );
  }

  if (stores.length === 0) {
    return (
      <div className="store-grid-empty">
        <p>No stores found matching your criteria.</p>
        <span className="empty-hint">Try adjusting your filters or search term.</span>
      </div>
    );
  }

  return (
    <div className="store-grid">
      {stores.map((store) => (
        <StoreCard 
          key={store.id} 
          store={store} 
          onRateAction={onRateAction} 
        />
      ))}
    </div>
  );
};

export default StoreGrid;
