import React, { useState } from 'react';
import T from '../../tokens/theme';
import Card from '../../components/shared/Card';
import Icon from '../../icons/icons';
import AiPill from '../../components/shared/AiPill';
import { TICKETS } from '../../data/tickets';

// Admin: Governance
const Governance = () => {
  const [overrides, setOverrides] = useState({});
 
  return (
    <div className="page" style={{ padding: "28px 32px", maxWidth: 1000 }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>Fairness Engine</h2>
      <p style={{ color: T.textMid, fontSize: 13, marginBottom: 22 }}>Review AI scoring logic and override anomalies.</p>
 
      {/* Anomaly alert */}
      <div style={{ padding: "14px 18px", borderRadius: 10, background: T.amberLight, border: `1px solid #fde68a`, marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
        <Icon name="warning" size={18} color={T.amber} />
        <div>
          <span style={{ fontSize: 13, fontWeight: 700, color: T.amber }}>2 anomalies detected </span>
          <span style={{ fontSize: 13, color: T.textMid }}>— Possible "gaming the system" behavior flagged by AI.</span>
        </div>
        <button className="btn-ghost" style={{ marginLeft: "auto", fontSize: 12 }}>Review All</button>
      </div>
 
      <Card style={{ overflow: "hidden" }}>
        <div style={{ padding: "14px 18px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 700 }}>Audit Score Log</span>
          <AiPill text="" />
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${T.border}` }}>
              {["Ticket ID", "Assignee", "Duration", "AI Difficulty", "Base Score", "Final Score", "Override"].map(h => (
                <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: T.textSoft, textTransform: "uppercase", letterSpacing: "0.04em", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TICKETS.map((t, i) => {
              const finalScore = Math.round((overrides[t.id] ?? t.difficulty) * 60);
              const isAnomaly = t.id === "TKT-006";
              return (
                <tr key={t.id} className="hover-row" style={{ borderBottom: i < TICKETS.length - 1 ? `1px solid ${T.border}` : "none", background: isAnomaly ? "#fffbeb" : "transparent" }}>
                  <td className="mono" style={{ padding: "12px 16px", fontSize: 12, color: T.primary, fontWeight: 600 }}>
                    {t.id} {isAnomaly && <span style={{ marginLeft: 6, fontSize: 10, background: T.amberLight, color: T.amber, padding: "1px 6px", borderRadius: 99, border: "1px solid #fde68a" }}>⚠ anomaly</span>}
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: 13 }}>{t.assignee}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13, color: T.textMid }}>{(Math.random() * 4 + 1).toFixed(1)}h</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: T.amber }}>{t.difficulty}×</span>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: 13, color: T.textMid }}>60</td>
                  <td style={{ padding: "12px 16px", fontSize: 14, fontWeight: 700, color: T.primary }}>{finalScore}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <input type="number" step="0.1" min="1" max="5" defaultValue={t.difficulty}
                        onChange={e => setOverrides(p => ({ ...p, [t.id]: parseFloat(e.target.value) }))}
                        style={{ width: 56, padding: "4px 8px", border: `1px solid ${T.border}`, borderRadius: 6, fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}
                      />
                      <button style={{ fontSize: 11, padding: "4px 10px", background: T.greenLight, color: T.green, border: `1px solid #bbf7d0`, borderRadius: 6, cursor: "pointer", fontWeight: 600 }}>Save</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default Governance;