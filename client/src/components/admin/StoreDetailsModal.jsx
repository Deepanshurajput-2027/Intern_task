import Modal from '../modal/Modal';
import Button from '../ui/Button';
import { Star } from 'lucide-react';

const StoreDetailsModal = ({ isOpen, onClose, store }) => {
  if (!store) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Store Details">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)' }}>
        <div>
          <span style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-muted)' }}>Store Name</span>
          <p style={{ fontWeight: 'var(--font-weight-medium)', margin: 0 }}>{store.name}</p>
        </div>
        <div>
          <span style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-muted)' }}>Email</span>
          <p style={{ margin: 0 }}>{store.email}</p>
        </div>
        <div>
          <span style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-muted)' }}>Address</span>
          <p style={{ margin: 0 }}>{store.address}</p>
        </div>
        <div>
          <span style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-muted)' }}>Owner</span>
          <p style={{ margin: 0 }}>{store.ownerName || `ID: ${store.ownerId}`}</p>
        </div>
        <div>
          <span style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-muted)' }}>Average Rating</span>
          <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Star size={16} style={{ color: 'var(--color-primary)' }} />
            {store.averageRating || 'No ratings yet'}
          </p>
        </div>
        <div>
          <span style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-muted)' }}>Created At</span>
          <p style={{ margin: 0 }}>{new Date(store.createdAt).toLocaleDateString()}</p>
        </div>
        <div style={{ marginTop: 'var(--spacing-24)', display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="secondary" onClick={onClose}>Close</Button>
        </div>
      </div>
    </Modal>
  );
};

export default StoreDetailsModal;
