import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Store, Settings, LogOut, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { logout, user } = useAuth();
  const location = useLocation();

  const getNavItems = () => {
    if (user?.role === 'ADMIN') {
      return [
        { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Users', path: '/admin/users', icon: Users },
        { name: 'Stores', path: '/admin/stores', icon: Store }
      ];
    }
    if (user?.role === 'USER') {
      return [
        { name: 'Stores', path: '/user/dashboard', icon: Store },
        { name: 'Settings', path: '/user/settings', icon: Settings }
      ];
    }
    if (user?.role === 'STORE_OWNER') {
      return [
        { name: 'Dashboard', path: '/store-owner/dashboard', icon: LayoutDashboard },
        { name: 'Settings', path: '/store-owner/settings', icon: Settings }
      ];
    }
    return [];
  };

  const navItems = getNavItems();

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={toggleSidebar}></div>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-brand">RateIt</h2>
          <button className="sidebar-close-btn" onClick={toggleSidebar} aria-label="Close Sidebar">
            <X size={24} />
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <ul className="sidebar-menu">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.startsWith(item.path);
              return (
                <li key={item.path} className="sidebar-menu-item">
                  <Link to={item.path} className={`sidebar-link ${isActive ? 'active' : ''}`} onClick={() => window.innerWidth < 768 && toggleSidebar()}>
                    <Icon size={20} className="sidebar-icon" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div className="sidebar-footer">
          <button className="sidebar-link logout-btn" onClick={logout}>
            <LogOut size={20} className="sidebar-icon" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
