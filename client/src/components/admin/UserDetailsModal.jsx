import Modal from '../modal/Modal';
import Button from '../ui/Button';

const UserDetailsModal = ({ isOpen, onClose, user }) => {
  if (!user) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="User Details">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)' }}>
        <div>
          <span style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-muted)' }}>Name</span>
          <p style={{ fontWeight: 'var(--font-weight-medium)', margin: 0 }}>{user.name}</p>
        </div>
        <div>
          <span style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-muted)' }}>Email</span>
          <p style={{ margin: 0 }}>{user.email}</p>
        </div>
        <div>
          <span style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-muted)' }}>Role</span>
          <p style={{ margin: 0 }}><span className="badge-role">{user.role}</span></p>
        </div>
        <div>
          <span style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-muted)' }}>Address</span>
          <p style={{ margin: 0 }}>{user.address || 'Not provided'}</p>
        </div>
        <div>
          <span style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-muted)' }}>Joined</span>
          <p style={{ margin: 0 }}>{new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
        <div style={{ marginTop: 'var(--spacing-24)', display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="secondary" onClick={onClose}>Close</Button>
        </div>
      </div>
    </Modal>
  );
};

export default UserDetailsModal;
