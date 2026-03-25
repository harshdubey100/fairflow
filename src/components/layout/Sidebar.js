import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import T from '../../tokens/theme';
import Icon from '../../icons/icons';
import Avatar from '../../priorityhelpers/Avatar';

const EMP_NAV = [
  { id: "emp-dashboard", label: "Dashboard", icon: "dashboard" },
  { id: "tickets", label: "Tickets", icon: "ticket" },
  { id: "create-ticket", label: "New Ticket", icon: "plus" },
  { id: "rewards", label: "Rewards", icon: "reward" },
  { id: "performance", label: "Performance", icon: "chart" },
  { id: "profile", label: "Profile", icon: "user" },
];
 
const ADMIN_NAV = [
  { id: "admin-dashboard", label: "Team Pulse", icon: "dashboard" },
  { id: "command-center", label: "Command Center", icon: "search" },
  { id: "reports", label: "Reports", icon: "report" },
  { id: "governance", label: "Governance", icon: "shield" },
  { id: "users", label: "Users", icon: "users" },
  { id: "settings", label: "Settings", icon: "settings" },
];

const getPath = (id, mode) => {
  if (mode === 'employee') {
    switch(id) {
      case 'emp-dashboard': return '/employee';
      case 'tickets': return '/employee/tickets';
      case 'create-ticket': return '/employee/tickets/create';
      case 'rewards': return '/employee/rewards';
      case 'performance': return '/employee/performance';
      case 'profile': return '/employee/profile';
      default: return '/employee';
    }
  } else {
    switch(id) {
      case 'admin-dashboard': return '/admin';
      case 'command-center': return '/admin/command-center';
      case 'reports': return '/admin/reports';
      case 'governance': return '/admin/governance';
      case 'users': return '/admin/users';
      case 'settings': return '/admin/settings';
      default: return '/admin';
    }
  }
};

const isActive = (id, mode, pathname) => {
  const path = getPath(id, mode);
  if (path === '/') return pathname === '/';
  return pathname.startsWith(path);
};

const Sidebar = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const mode = location.pathname.startsWith('/admin') ? 'admin' : 'employee';
  const nav = mode === "admin" ? ADMIN_NAV : EMP_NAV;
 
  return (
    <aside style={{
      width: collapsed ? 56 : 220,
      background: T.bgCard,
      borderRight: `1px solid ${T.border}`,
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      position: "sticky",
      top: 0,
      flexShrink: 0,
      transition: "width 0.2s ease",
      overflow: "hidden",
    }}>
      {/* Logo */}
      <div style={{ padding: "18px 16px 12px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {!collapsed && (
          <div>
            {/* use public logo (512x512) */}
            <img src="/fairflow logo.png" alt="Fairflow" style={{ width: 120, height: "auto" }} />
            <div style={{ fontSize: 10, color: T.textSoft, marginTop: 1 }}>
              {mode === "admin" ? "Admin Mode" : "Employee Workspace"}
            </div>
          </div>
        )}
        <button onClick={() => setCollapsed(c => !c)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, borderRadius: 6, color: T.textSoft, flexShrink: 0 }}>
          <Icon name="menuOpen" size={16} />
        </button>
      </div>
 
      {/* Nav */}
      <nav style={{ flex: 1, padding: "10px 8px", overflowY: "auto" }}>
        {nav.map(item => (
          <Link key={item.id} to={getPath(item.id, mode)} className={`nav-link ${isActive(item.id, mode, location.pathname) ? "active" : ""}`}
            title={collapsed ? item.label : undefined}
            style={{ justifyContent: collapsed ? "center" : "flex-start" }}
          >
            <Icon name={item.icon} size={16} color={isActive(item.id, mode, location.pathname) ? T.primary : T.textSoft} />
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>
      {!collapsed && (
        <div style={{ padding: "12px 8px", borderTop: `1px solid ${T.border}`, marginTop: "auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 6px" }}>
            <Avatar initials="AK" size={28} color={T.primary} />
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: T.text }}>Alex K.</div>
              <div style={{ fontSize: 10, color: T.textSoft }}>Full Stack Dev</div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;