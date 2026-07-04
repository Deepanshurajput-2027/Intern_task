import { useState, useEffect } from 'react';
import Modal from '../modal/Modal';
import Button from '../ui/Button';
import StarRating from './StarRating';
import { userService } from '../../services/user.service';
import toast from 'react-hot-toast';

const RatingModal = ({ isOpen, onClose, store, onSuccess }) => {
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isUpdate = !!store?.userRating;

  useEffect(() => {
    if (isOpen && store) {
      setRating(store.userRating?.rating || 0);
    }
  }, [isOpen, store]);

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error('Please select a rating before submitting');
      return;
    }

    setIsSubmitting(true);
    try {
      if (isUpdate) {
        await userService.updateRating(store.id, rating);
      } else {
        await userService.submitRating(store.id, rating);
      }
      toast.success(isUpdate ? 'Rating updated successfully' : 'Rating submitted successfully');
      
      // Wait for toast to render, then fire onSuccess (which refreshes data), then close
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 150); // slight delay to allow stars to animate/toast to appear
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit rating');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) onClose();
  };

  if (!store) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={isUpdate ? `Update rating for ${store.name}` : `Rate ${store.name}`}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)' }}>
        <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', margin: 0 }}>
          {isUpdate ? 'How would you rate your experience now?' : 'How was your experience at this store?'}
        </p>
        
        <StarRating 
          value={rating} 
          onChange={setRating} 
          disabled={isSubmitting} 
        />

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-12)', marginTop: 'var(--spacing-24)' }}>
          <Button variant="ghost" onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} isLoading={isSubmitting}>
            {isUpdate ? 'Update Rating' : 'Submit Rating'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default RatingModal;
