import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProtectedRoute, RoleRoute } from './components/shared/RouteProtection';
import EmployeeLayout from './components/layout/EmployeeLayout';
import AdminLayout from './components/layout/AdminLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Onboarding from './pages/Onboarding';
import ForgotPassword from './pages/ForgotPassword';
import EmpDashboard from './pages/employee/Dashboard';
import TicketsBrowse from './pages/employee/TicketBrowse';
import CreateTicket from './pages/employee/CreateTickets';
import TicketDetail from './pages/employee/TicketDetail';
import Rewards from './pages/employee/Rewards';
import MyWallet from './pages/employee/MyWallet';
import Catalog from './pages/employee/Catalog';
import Performance from './pages/employee/Performance';
import Profile from './pages/employee/Profile';
import Leaderboard from './pages/employee/Leaderboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import CommandCenter from './pages/admin/CommandCenter';
import Governance from './pages/admin/Governence';
import Reports from './pages/admin/Reports';
import ReportsGenerate from './pages/admin/ReportsGenerate';
import ReportsArchive from './pages/admin/ReportsArchive';
import AuditScores from './pages/admin/AuditScores';
import Anomalies from './pages/admin/Anomalies';
import Users from './pages/admin/Users';
import Settings from './pages/admin/Settings';

function AppContent() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <GlobalStyles />
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Navigate to="/onboarding" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* PROTECTED ROUTES */}
        <Route element={<ProtectedRoute />}>
          {/* EMPLOYEE ROUTES */}
          <Route path="/employee" element={<RoleRoute allowedRole="employee" />}>
            <Route path="/employee" element={<EmployeeLayout />}>
              <Route index element={<EmpDashboard />} />
              <Route path="profile" element={<Profile />} />
              <Route path="rewards" element={<Rewards />} />
              <Route path="rewards/my-wallet" element={<MyWallet />} />
              <Route path="rewards/catalog" element={<Catalog />} />
              <Route path="leaderboard" element={<Leaderboard />} />
              <Route path="performance" element={<Performance />} />
              <Route path="tickets" element={<TicketsBrowse />} />
              <Route path="tickets/create" element={<CreateTicket />} />
              <Route path="tickets/:id" element={<TicketDetail />} />
            </Route>
          </Route>

          {/* ADMIN ROUTES */}
          <Route path="/admin" element={<RoleRoute allowedRole="admin" />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="reports" element={<Reports />} />
              <Route path="reports/generate" element={<ReportsGenerate />} />
              <Route path="reports/archive" element={<ReportsArchive />} />
              <Route path="governance" element={<Governance />} />
              <Route path="governance/audit-scores" element={<AuditScores />} />
              <Route path="governance/anomalies" element={<Anomalies />} />
              <Route path="command-center" element={<CommandCenter />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}