import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      textAlign: 'center',
      padding: 'var(--spacing-24)',
      backgroundColor: 'var(--color-background)'
    }}>
      <h1 style={{ fontSize: 'var(--font-size-display)', color: 'var(--color-text)', marginBottom: 'var(--spacing-16)' }}>403</h1>
      <h2 style={{ fontSize: 'var(--font-size-h2)', color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-24)' }}>Access Denied</h2>
      <p style={{ maxWidth: '400px', marginBottom: 'var(--spacing-32)' }}>
        You do not have permission to view this page. If you believe this is an error, please contact your administrator.
      </p>
      <Button onClick={() => navigate('/login')} variant="primary">
        Back to Login
      </Button>
    </div>
  );
};

export default Unauthorized;
