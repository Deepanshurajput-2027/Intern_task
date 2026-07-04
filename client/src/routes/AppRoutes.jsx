import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/protected/ProtectedRoute';
import AuthLayout from '../components/layout/AuthLayout';
import DashboardLayout from '../components/layout/DashboardLayout';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Unauthorized from '../pages/shared/Unauthorized';

// Admin Pages
import AdminDashboard from '../pages/admin/Dashboard';
import AdminUsers from '../pages/admin/Users';
import AdminStores from '../pages/admin/Stores';

// User Pages
import UserDashboard from '../pages/user/UserDashboard';
import UserSettings from '../pages/user/UserSettings';

// Store Owner Pages
import StoreOwnerDashboard from '../pages/storeOwner/Dashboard';
import StoreOwnerSettings from '../pages/storeOwner/Settings';

// Placeholder Pages (will be fully implemented later)
const Placeholder = ({ title }) => <div style={{ padding: '2rem' }}><h1>{title}</h1><p>Phase 08B Foundation</p></div>;

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes via AuthLayout */}
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>

            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* Admin Routes via DashboardLayout */}
            <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
                <Route element={<DashboardLayout />}>
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/users" element={<AdminUsers />} />
                    <Route path="/admin/stores" element={<AdminStores />} />
                </Route>
            </Route>

            {/* Store Owner Routes */}
            <Route element={<ProtectedRoute allowedRoles={['STORE_OWNER']} />}>
                <Route element={<DashboardLayout />}>
                    <Route path="/store-owner/dashboard" element={<StoreOwnerDashboard />} />
                    <Route path="/store-owner/settings" element={<StoreOwnerSettings />} />
                </Route>
            </Route>

            {/* User Routes */}
            <Route element={<ProtectedRoute allowedRoles={['USER']} />}>
                <Route element={<DashboardLayout />}>
                    <Route path="/user/dashboard" element={<UserDashboard />} />
                    <Route path="/user/settings" element={<UserSettings />} />
                </Route>
            </Route>

            {/* Default Route */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Placeholder title="Not Found - 404" />} />
        </Routes>
    );
};

export default AppRoutes;
