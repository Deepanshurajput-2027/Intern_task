import './DashboardCard.css';

const DashboardCard = ({ title, value, icon: Icon, loading, error }) => {
  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header">
        <h3 className="dashboard-card-title">{title}</h3>
        {Icon && <Icon className="dashboard-card-icon" size={20} />}
      </div>
      
      <div className="dashboard-card-content">
        {loading ? (
          <div className="dashboard-card-skeleton animate-pulse" />
        ) : error ? (
          <p className="dashboard-card-error">Error loading</p>
        ) : (
          <p className="dashboard-card-value">{value}</p>
        )}
      </div>
    </div>
  );
};

export default DashboardCard;
