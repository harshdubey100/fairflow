import React, { useState, useEffect } from 'react';
import T from '../../tokens/theme';
import { TICKETS } from '../../data/tickets';
import StatWidget from '../../components/shared/StatWidget';
import Icon from '../../icons/icons';
import AiPill from '../../components/shared/AiPill';
import Card from '../../components/shared/Card';
import SectionHeader from '../../components/shared/SectionHeader';
import Badge from '../../components/shared/Badge';
import { priorityColor } from '../../priorityhelpers/PriorityColor';
import { statusColor } from '../../priorityhelpers/StatusColor';
import { statusLabel } from '../../priorityhelpers/StatusLabel';

const EmpDashboard = ({ onNavigate }) => {
  const [aiAction, setAiAction] = useState(null);
  useEffect(() => { setTimeout(() => setAiAction(TICKETS[0]), 600); }, []);
 
  return (
    <div className="page" style={{ padding: "40px 48px", maxWidth: 1200, background: T.bg, minHeight: "100%", color: T.text, fontFamily: T.fontBody }}>
      <div style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 32, fontWeight: 700, fontFamily: T.fontHeader, letterSpacing: "-0.02em" }}>Good morning, Alex 👋</h2>
        <p style={{ color: T.textMid, fontSize: 16, marginTop: 8 }}>Welcome to your FairFlow control center.</p>
      </div>
 
      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 40 }}>
        <StatWidget label="Your Score" value="1,840" sub="Top of leaderboard 🏆" icon="star" color={T.amber || "#F59E0B"} delay={0} />
        <StatWidget label="Open Tickets" value="3" sub="2 high priority" icon="ticket" color={T.primary} delay={0.05} />
        <StatWidget label="Closed This Week" value="8" sub="+2 vs last week" icon="check" color={T.success} delay={0.1} />
        <StatWidget label="Points Earned" value="420" sub="This month" icon="reward" color={T.secondary} delay={0.15} />
      </div>
 
      {/* AI Next Best Action */}
      {aiAction && (
        <div className="fade-up" style={{
          background: "rgba(159, 167, 255, 0.05)",
          border: `1px solid ${T.border}`,
          borderRadius: 20, padding: "24px 32px",
          marginBottom: 40, display: "flex", alignItems: "center", gap: 24,
          backdropFilter: T.glassFilter,
          boxShadow: T.shadowBloom,
        }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: T.gradientPrimary, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 0 15px rgba(159, 167, 255, 0.3)" }}>
            <Icon name="bolt" size={24} color="#fff" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: T.primary, textTransform: "uppercase", letterSpacing: "0.05em" }}>AI: Next Best Task</span>
              <AiPill text="High Confidence" />
            </div>
            <p style={{ fontSize: 15, color: T.text, fontWeight: 500, lineHeight: 1.5 }}>
              Tackle <strong>{aiAction.id}</strong> first — it's critical priority with a 4.2 difficulty score. Resolving it earns you ~<strong>380 pts</strong>.
            </p>
          </div>
          <button 
            className="btn-primary" 
            onClick={() => onNavigate("ticket-detail")} 
            style={{ 
              flexShrink: 0, 
              padding: "12px 24px", 
              borderRadius: 12, 
              background: T.gradientPrimary, 
              border: "none", 
              boxShadow: "0 4px 12px rgba(159, 167, 255, 0.25)"
            }}
          >
            Open Ticket →
          </button>
        </div>
      )}
 
      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 32 }}>
        {/* Active tickets */}
        <Card style={{ padding: "28px", background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 24 }}>
          <SectionHeader title="Your Active Tickets" action={
            <button className="btn-ghost" style={{ fontSize: 13, padding: "8px 16px", borderRadius: 10 }} onClick={() => onNavigate("tickets")}>View all</button>
          } />
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 12 }}>
            {TICKETS.filter(t => t.status !== "closed" && t.assignee === "Alex K.").map(t => (
              <div key={t.id} className="hover-row" onClick={() => onNavigate("ticket-detail")} style={{
                display: "flex", alignItems: "center", gap: 16,
                padding: "14px 18px", borderRadius: 16, cursor: "pointer",
                background: "rgba(255, 255, 255, 0.02)",
                border: `1px solid ${T.border}`, transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: T.text, marginBottom: 6 }}>{t.title}</div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span className="mono" style={{ fontSize: 12, color: T.textSoft, background: "rgba(0,0,0,0.2)", padding: "2px 6px", borderRadius: 4 }}>{t.id}</span>
                    <Badge label={t.priority} color={priorityColor(t.priority)} />
                    <Badge label={statusLabel(t.status)} color={statusColor(t.status)} />
                  </div>
                </div>
                <div style={{ textAlign: "right", fontSize: 12, color: T.textSoft, fontWeight: 500 }}>{t.created}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Placeholder for further metrics */}
        <Card style={{ padding: "28px", background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 24, display: "flex", flexDirection: "column", gap: 20 }}>
           <SectionHeader title="Efficiency Pulse" />
           <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 20 }}>
              <div style={{ 
                width: 120, height: 120, borderRadius: "50%", 
                background: `radial-gradient(circle, ${T.secondary}22 0%, transparent 70%)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                position: "relative", marginBottom: 20
              }}>
                <div style={{ 
                    width: 80, height: 80, borderRadius: "50%", 
                    border: `4px solid ${T.secondary}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 24, fontWeight: 700, color: T.secondary,
                    boxShadow: `0 0 20px ${T.secondary}44`
                }}> 84% </div>
              </div>
              <p style={{ fontSize: 14, color: T.textMid }}>Your current velocity is <strong>12% higher</strong> than your average. Great job!</p>
           </div>
        </Card>
      </div>
    </div>
    );
}
export default EmpDashboard;