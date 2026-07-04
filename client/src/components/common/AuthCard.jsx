import './AuthCard.css';

const AuthCard = ({ title, subtitle, children }) => {
  return (
    <div className="auth-card">
      <div className="auth-card-header">
        <h1 className="auth-card-title">{title}</h1>
        {subtitle && <p className="auth-card-subtitle">{subtitle}</p>}
      </div>
      <div className="auth-card-content">
        {children}
      </div>
    </div>
  );
};

export default AuthCard;
