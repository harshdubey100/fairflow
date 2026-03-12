import React from 'react';
import T from '../../tokens/theme';
import Icon from '../../icons/icons';
import Avatar from '../../priorityhelpers/Avatar';

const TopBar = ({ page, mode }) => {
  const labels = {
    "emp-dashboard": "Dashboard", tickets: "Tickets", "create-ticket": "New Ticket",
    "ticket-detail": "Ticket Detail", rewards: "Rewards", performance: "Performance", profile: "Profile",
    "admin-dashboard": "Team Pulse", "command-center": "Command Center", reports: "Reports",
    governance: "Governance", users: "Users", settings: "Settings",
  };
 
  return (
    <header style={{
      height: 54, display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 28px", borderBottom: `1px solid ${T.border}`,
      background: T.bgCard, position: "sticky", top: 0, zIndex: 10,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {mode === "admin" && (
          <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 99, background: T.primaryLight, color: T.primary, fontWeight: 700, border: `1px solid ${T.primaryBorder}` }}>
            ADMIN
          </span>
        )}
        <h1 style={{ fontSize: 16, fontWeight: 700, color: T.text }}>{labels[page] || page}</h1>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <button style={{ background: "none", border: "none", cursor: "pointer", position: "relative", color: T.textSoft }}>
          <Icon name="bell" size={18} />
          <span style={{ position: "absolute", top: -2, right: -2, width: 8, height: 8, borderRadius: "50%", background: T.red, border: `2px solid ${T.bgCard}` }} />
        </button>
        <div style={{ height: 24, width: 1, background: T.border }} />
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Avatar initials="AK" size={28} color={T.primary} />
          <span style={{ fontSize: 13, fontWeight: 600, color: T.text }}>Alex K.</span>
          <Icon name="chevronDown" size={14} color={T.textSoft} />
        </div>
      </div>
    </header>
  );
};

export default TopBar;