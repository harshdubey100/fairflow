import React, { useState } from 'react';
import T from '../../tokens/theme';
import Card from '../../components/shared/Card';
import Icon from '../../icons/icons';
import AiPill from '../../components/shared/AiPill';
import Badge from '../../components/shared/Badge';
import { TICKETS } from '../../data/tickets';
import { priorityColor } from '../../priorityhelpers/PriorityColor';
import { statusColor } from '../../priorityhelpers/StatusColor';
import { statusLabel } from '../../priorityhelpers/StatusLabel';

// Admin: Command Center
const CommandCenter = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
 
  const examples = [
    "Show me API failures in the last week",
    "Which employee has the most unresolved tickets?",
    "Summarize all critical issues this month",
  ];
 
  const runQuery = (q) => {
    setQuery(q);
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setLoading(false);
      setResult({
        summary: `Found 7 tickets related to API failures in the last 7 days. The most affected area is the authentication endpoint, contributing to 3 of the 7 issues. Average resolution time for these tickets was 5.2 hours — 24% above the team baseline. Assignee "James L." handled 4 of these incidents.`,
        tickets: TICKETS.filter(t => t.tags.includes("API") || t.tags.includes("Backend")),
      });
    }, 1500);
  };
 
  return (
    <div className="page" style={{ padding: "28px 32px", maxWidth: 900 }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700 }}>Command Center</h2>
          <span style={{ padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 700, background: "#fef3c7", color: T.amber, border: "1px solid #fde68a" }}>GOD MODE</span>
        </div>
        <p style={{ color: T.textMid, fontSize: 13 }}>Query your entire ticketing system with natural language. Powered by vector search.</p>
      </div>
 
      {/* Search bar */}
      <Card style={{ padding: "20px 22px", marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ flex: 1, position: "relative" }}>
            <Icon name="search" size={16} color={T.textSoft} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
            <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && runQuery(query)}
              placeholder='Try: "Show me API failures in the last week"'
              style={{ width: "100%", padding: "12px 14px 12px 42px", border: `2px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.text, outline: "none", transition: "border 0.15s" }}
              onFocus={e => e.target.style.borderColor = T.primary}
              onBlur={e => e.target.style.borderColor = T.border}
            />
          </div>
          <button className="btn-primary" onClick={() => runQuery(query)} style={{ padding: "12px 20px", borderRadius: 10, fontSize: 13 }}>Search</button>
        </div>
        <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, color: T.textSoft, fontWeight: 500 }}>Try:</span>
          {examples.map(ex => (
            <button key={ex} onClick={() => runQuery(ex)} style={{
              fontSize: 11, padding: "4px 12px", borderRadius: 99,
              background: T.bg, border: `1px solid ${T.border}`, color: T.textMid,
              cursor: "pointer", transition: "all 0.15s",
            }} onMouseEnter={e => { e.currentTarget.style.borderColor = T.primary; e.currentTarget.style.color = T.primary; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.textMid; }}>
              {ex}
            </button>
          ))}
        </div>
      </Card>
 
      {/* Loading */}
      {loading && (
        <Card style={{ padding: "24px", textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, color: T.textMid, fontSize: 13 }}>
            <span style={{ display: "inline-block", width: 16, height: 16, border: `2px solid ${T.primary}`, borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
            Vectorizing query and searching knowledge base…
          </div>
        </Card>
      )}
 
      {/* Result */}
      {result && (
        <div className="fade-up">
          <Card style={{ padding: "20px 22px", marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <AiPill text="AI Summary" />
              <span style={{ fontSize: 12, color: T.textSoft }}>Vector search result for: <em>"{query}"</em></span>
            </div>
            <p style={{ fontSize: 13.5, color: T.text, lineHeight: 1.7 }}>{result.summary}</p>
          </Card>
          <Card style={{ overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", borderBottom: `1px solid ${T.border}`, fontSize: 13, fontWeight: 700 }}>Referenced Tickets ({result.tickets.length})</div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                {result.tickets.map((t, i) => (
                  <tr key={t.id} className="hover-row" style={{ borderBottom: i < result.tickets.length - 1 ? `1px solid ${T.border}` : "none" }}>
                    <td className="mono" style={{ padding: "12px 18px", fontSize: 12, color: T.primary, width: 100, fontWeight: 600 }}>{t.id}</td>
                    <td style={{ padding: "12px 18px", fontSize: 13, color: T.text }}>{t.title}</td>
                    <td style={{ padding: "12px 18px" }}><Badge label={t.priority} color={priorityColor(t.priority)} /></td>
                    <td style={{ padding: "12px 18px" }}><Badge label={statusLabel(t.status)} color={statusColor(t.status)} /></td>
                    <td style={{ padding: "12px 18px", fontSize: 12, color: T.textSoft }}>{t.assignee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CommandCenter;