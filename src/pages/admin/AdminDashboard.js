import React from 'react';
import T from '../../tokens/theme';
import StatWidget from '../../components/shared/StatWidget';
import Card from '../../components/shared/Card';
import SectionHeader from '../../components/shared/SectionHeader';
import AiPill from '../../components/shared/AiPill';
import { TEAM } from '../../data/team';
import Avatar from '../../priorityhelpers/Avatar';

// Admin: Dashboard
const AdminDashboard = () => (
  <div className="page" style={{ padding: "28px 32px", maxWidth: 1100 }}>
    <div style={{ marginBottom: 24 }}>
      <h2 style={{ fontSize: 22, fontWeight: 700 }}>Team Pulse</h2>
      <p style={{ color: T.textMid, fontSize: 13, marginTop: 3 }}>Real-time overview of your support organization.</p>
    </div>
 
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
      <StatWidget label="Open Tickets" value="18" sub="3 critical" icon="ticket" color={T.red} delay={0} />
      <StatWidget label="Avg Resolution" value="4.2h" sub="-0.8h vs last week" icon="clock" color={T.green} delay={0.06} />
      <StatWidget label="Team Throughput" value="94" sub="tickets this week" icon="chart" color={T.primary} delay={0.12} />
      <StatWidget label="Anomalies" value="2" sub="gaming detected" icon="warning" color={T.amber} delay={0.18} />
    </div>
 
    <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 20, marginBottom: 20 }}>
      {/* Bottlenecks */}
      <Card style={{ padding: "20px 22px" }}>
        <SectionHeader title="Ticket Bottlenecks" action={<AiPill text="AI" />} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { label: "API Issues", count: 7, pct: 78 },
            { label: "Auth & Login", count: 4, pct: 45 },
            { label: "Mobile Bugs", count: 3, pct: 33 },
            { label: "Performance", count: 2, pct: 22 },
            { label: "Database", count: 2, pct: 22 },
          ].map(b => (
            <div key={b.label}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 5 }}>
                <span style={{ fontWeight: 500, color: T.text }}>{b.label}</span>
                <span style={{ color: T.textSoft }}>{b.count} tickets</span>
              </div>
              <div style={{ height: 7, background: T.bg, borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${b.pct}%`, background: b.pct > 60 ? T.red : b.pct > 35 ? T.amber : T.primary, borderRadius: 4, transition: "width 1s ease" }} />
              </div>
            </div>
          ))}
        </div>
      </Card>
 
      {/* Team activity */}
      <Card style={{ padding: "20px 22px" }}>
        <SectionHeader title="Team Performance" />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {TEAM.map((m, i) => (
            <div key={m.name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < TEAM.length - 1 ? `1px solid ${T.border}` : "none" }}>
              <Avatar initials={m.avatar} size={32} color={T.primary} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{m.name}</div>
                <div style={{ height: 5, background: T.bg, borderRadius: 3, marginTop: 4 }}>
                  <div style={{ height: "100%", width: `${(m.score / 1840) * 100}%`, background: T.primary, borderRadius: 3 }} />
                </div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{m.score.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
 
    {/* Heatmap placeholder */}
    <Card style={{ padding: "20px 22px" }}>
      <SectionHeader title="Ticket Volume Heatmap" action={<span style={{ fontSize: 12, color: T.textSoft }}>Last 7 days</span>} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6 }}>
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, di) => (
          <div key={day}>
            <p style={{ fontSize: 10, color: T.textSoft, textAlign: "center", marginBottom: 6 }}>{day}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {Array.from({ length: 6 }).map((_, ti) => {
                const intensity = Math.random();
                return (
                  <div key={ti} title={`${Math.floor(intensity * 12)} tickets`} style={{
                    height: 22, borderRadius: 4,
                    background: intensity > 0.7 ? T.red : intensity > 0.4 ? T.amber : intensity > 0.2 ? T.primaryLight : T.bg,
                    opacity: 0.6 + intensity * 0.4,
                  }} />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

export default AdminDashboard;