import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

const EmpDashboard = () => {
  const navigate = useNavigate();
  const [aiAction, setAiAction] = useState(null);
  useEffect(() => { setTimeout(() => setAiAction(TICKETS[0]), 600); }, []);
 
  return (
    <div className="page" style={{ padding: "28px 32px", maxWidth: 1100 }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700 }}>Good morning, Alex 👋</h2>
        <p style={{ color: T.textMid, fontSize: 13.5, marginTop: 4 }}>Here's what needs your attention today.</p>
      </div>
 
      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
        <StatWidget label="Your Score" value="1,840" sub="Top of leaderboard 🏆" icon="star" color={T.amber} delay={0} />
        <StatWidget label="Open Tickets" value="3" sub="2 high priority" icon="ticket" color={T.primary} delay={0.05} />
        <StatWidget label="Closed This Week" value="8" sub="+2 vs last week" icon="check" color={T.green} delay={0.1} />
        <StatWidget label="Points Earned" value="420" sub="This month" icon="reward" color={T.purple} delay={0.15} />
      </div>
 
      {/* AI Next Best Action */}
      {aiAction && (
        <div className="fade-up" style={{
          background: "linear-gradient(135deg, #eff4ff 0%, #f5f3ff 100%)",
          border: `1px solid ${T.primaryBorder}`,
          borderRadius: 12, padding: "16px 20px",
          marginBottom: 24, display: "flex", alignItems: "center", gap: 16,
        }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: T.purple + "22", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Icon name="bolt" size={18} color={T.purple} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: T.purple }}>AI: Next Best Action</span>
              <AiPill text="" />
            </div>
            <p style={{ fontSize: 13, color: T.text, fontWeight: 500 }}>
              Tackle <strong>{aiAction.id}</strong> first — it's critical priority with a 4.2 difficulty score. Resolving it earns you ~<strong>380 pts</strong>.
            </p>
          </div>
          <button className="btn-primary" onClick={() => navigate("/employee/tickets/1")} style={{ flexShrink: 0, fontSize: 12 }}>
            Open Ticket →
          </button>
        </div>
      )}
 
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20 }}>
        {/* Active tickets */}
        <Card style={{ padding: "20px 22px" }}>
          <SectionHeader title="Your Active Tickets" action={
            <button className="btn-ghost" style={{ fontSize: 12, padding: "6px 12px" }} onClick={() => navigate("/employee/tickets")}>View all</button>
          } />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {TICKETS.filter(t => t.status !== "closed" && t.assignee === "Alex K.").map(t => (
              <div key={t.id} className="hover-row" onClick={() => navigate("/employee/tickets/1")} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "10px 12px", borderRadius: 8, cursor: "pointer",
                border: `1px solid ${T.border}`, transition: "background 0.15s",
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 4 }}>{t.title}</div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <span className="mono" style={{ fontSize: 11, color: T.textSoft }}>{t.id}</span>
                    <Badge label={t.priority} color={priorityColor(t.priority)} />
                    <Badge label={statusLabel(t.status)} color={statusColor(t.status)} />
                  </div>
                </div>
                <div style={{ textAlign: "right", fontSize: 11, color: T.textSoft }}>{t.created}</div>
              </div>
            ))}
          </div>
        </Card>
        </div>
    </div>
    );
}
export default EmpDashboard;