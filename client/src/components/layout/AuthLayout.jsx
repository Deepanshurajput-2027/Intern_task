import { Outlet } from 'react-router-dom';
import './AuthLayout.css';

const AuthLayout = () => {
  return (
    <div className="auth-layout">
      <div className="auth-layout-split auth-layout-brand">
        <div className="brand-content">
          <h1 className="brand-title">RateIt</h1>
          <p className="brand-subtitle">The premium platform for rating stores and managing feedback.</p>
        </div>
      </div>
      <div className="auth-layout-split auth-layout-form">
        <div className="auth-form-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
