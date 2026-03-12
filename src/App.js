import React, { useState } from 'react';
import GlobalStyles from './GlobalStyles';
import T from './tokens/theme';
import Icon from './icons/icons';
import Sidebar from './components/layout/Sidebar';
import TopBar from './components/layout/Topbar';
import EmpDashboard from './pages/employee/Dashboard';
import TicketsBrowse from './pages/employee/TicketBrowse';
import CreateTicket from './pages/employee/CreateTickets';
import TicketDetail from './pages/employee/TicketDetail';
import Rewards from './pages/employee/Rewards';
import AdminDashboard from './pages/admin/AdminDashboard';
import CommandCenter from './pages/admin/CommandCenter';
import Governance from './pages/admin/Governence';
import Reports from './pages/admin/Reports';

export default function App() {
  const [mode, setMode] = useState("employee");
  const [page, setPage] = useState("emp-dashboard");
  const [collapsed, setCollapsed] = useState(false);
 
  const toggleMode = () => {
    if (mode === "employee") { setMode("admin"); setPage("admin-dashboard"); }
    else { setMode("employee"); setPage("emp-dashboard"); }
  };
 
  const renderPage = () => {
    const nav = (p) => setPage(p);
    switch (page) {
      case "emp-dashboard": return <EmpDashboard onNavigate={nav} />;
      case "tickets": return <TicketsBrowse onNavigate={nav} />;
      case "create-ticket": return <CreateTicket onNavigate={nav} />;
      case "ticket-detail": return <TicketDetail onNavigate={nav} />;
      case "rewards": return <Rewards />;
      case "admin-dashboard": return <AdminDashboard />;
      case "command-center": return <CommandCenter />;
      case "governance": return <Governance />;
      case "reports": return <Reports />;
      default: return (
        <div style={{ padding: 40, color: T.textSoft, textAlign: "center" }}>
          <Icon name="settings" size={40} color={T.border} />
          <p style={{ marginTop: 12, fontSize: 14 }}>This page is a placeholder — coming soon.</p>
        </div>
      );
    }
  };
 
  return (
    <>
      <GlobalStyles />
      <div style={{ display: "flex", minHeight: "100vh", background: T.bg }}>
        <Sidebar mode={mode} page={page} onNavigate={setPage} onToggleMode={toggleMode} collapsed={collapsed} setCollapsed={setCollapsed} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
          <TopBar page={page} mode={mode} />
          <main style={{ flex: 1, overflowY: "auto" }}>
            {renderPage()}
          </main>
        </div>
      </div>
    </>
  );
}   