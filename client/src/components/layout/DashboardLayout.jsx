import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';
import './DashboardLayout.css';
import { useAuth } from '../../context/AuthContext';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="dashboard-layout">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="dashboard-main">
        <header className="dashboard-header">
          <button className="mobile-menu-btn" onClick={toggleSidebar} aria-label="Open Menu">
            <Menu size={24} />
          </button>
          
          <div className="header-right">
            <span className="role-badge">{user?.role}</span>
          </div>
        </header>
        
        <main className="dashboard-content">
          <div className="content-container">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
