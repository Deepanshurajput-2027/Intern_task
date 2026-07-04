import StarRating from './StarRating';
import Button from '../ui/Button';
import './StoreCard.css';

const StoreCard = ({ store, onRateAction }) => {
  const isRated = !!store.userRating;

  return (
    <div className="store-card">
      <div className="store-card-header">
        <h3 className="store-card-title">{store.name}</h3>
        <p className="store-card-address">{store.address}</p>
      </div>

      <div className="store-card-ratings">
        <div className="rating-row">
          <div className="stars-display">
            <StarRating 
              value={store.averageRating ? Math.round(store.averageRating) : 0} 
              disabled={true} 
              size={16}
              className="compact"
            />
          </div>
          <span className="rating-text">
            {store.averageRating ? `${store.averageRating}` : 'No ratings yet'}
          </span>
        </div>

        <div className="rating-row your-rating">
          {isRated ? (
            <>
              <div className="stars-display">
                <StarRating 
                  value={store.userRating.rating} 
                  disabled={true} 
                  size={16}
                  className="compact"
                />
              </div>
              <span className="rating-text">Your Rating</span>
            </>
          ) : (
            <span className="rating-text empty-rating">Be the first person to rate this store.</span>
          )}
        </div>
      </div>

      <div className="store-card-footer">
        <Button 
          variant={isRated ? 'secondary' : 'primary'} 
          className="w-full"
          onClick={() => onRateAction(store)}
        >
          {isRated ? 'Update Rating' : 'Rate Store'}
        </Button>
      </div>
    </div>
  );
};

export default StoreCard;
