import React, { useState } from 'react';
import T from '../../tokens/theme';
import { TICKETS } from '../../data/tickets';
import Icon from '../../icons/icons';
import Card from '../../components/shared/Card';
import Badge from '../../components/shared/Badge';
import { priorityColor } from '../../priorityhelpers/PriorityColor';
import { statusColor } from '../../priorityhelpers/StatusColor';
import { statusLabel } from '../../priorityhelpers/StatusLabel';

// Employee: Tickets Browse
const TicketsBrowse = ({ onNavigate }) => {
  const [view, setView] = useState("list");
  const [filter, setFilter] = useState("all");
 
  const filtered = filter === "all" ? TICKETS : TICKETS.filter(t => t.status === filter);
 
  return (
    <div className="page" style={{ padding: "28px 32px", maxWidth: 1100 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700 }}>Tickets</h2>
          <p style={{ color: T.textMid, fontSize: 13, marginTop: 3 }}>{TICKETS.length} total tickets</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn-ghost" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}>
            <Icon name="filter" size={13} /> Filter
          </button>
          <button className="btn-primary" style={{ display: "flex", alignItems: "center", gap: 6 }} onClick={() => onNavigate("create-ticket")}>
            <Icon name="plus" size={13} /> New Ticket
          </button>
        </div>
      </div>
 
      {/* Filters */}
      <div style={{ display: "flex", gap: 6, marginBottom: 18 }}>
        {[["all", "All"], ["open", "Open"], ["in_progress", "In Progress"], ["closed", "Closed"]].map(([val, label]) => (
          <button key={val} onClick={() => setFilter(val)} style={{
            padding: "6px 14px", borderRadius: 99, fontSize: 12, fontWeight: 500, cursor: "pointer", border: "1px solid",
            background: filter === val ? T.primary : T.bgCard,
            color: filter === val ? "#fff" : T.textMid,
            borderColor: filter === val ? T.primary : T.border,
            transition: "all 0.15s",
          }}>{label}</button>
        ))}
        <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
          {[["list", "list"], ["grid", "grid"]].map(([v, icon]) => (
            <button key={v} onClick={() => setView(v)} style={{
              width: 32, height: 32, border: `1px solid ${view === v ? T.primary : T.border}`,
              background: view === v ? T.primaryLight : T.bgCard, borderRadius: 8, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Icon name={icon} size={13} color={view === v ? T.primary : T.textSoft} />
            </button>
          ))}
        </div>
      </div>
 
      {view === "list" ? (
        <Card style={{ overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${T.border}` }}>
                {["Ticket ID", "Title", "Priority", "Status", "Difficulty", "Assignee", "Created"].map(h => (
                  <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: T.textSoft, letterSpacing: "0.04em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((t, i) => (
                <tr key={t.id} className="hover-row" onClick={() => onNavigate("ticket-detail")} style={{ borderBottom: i < filtered.length - 1 ? `1px solid ${T.border}` : "none", cursor: "pointer" }}>
                  <td className="mono" style={{ padding: "12px 16px", fontSize: 12, color: T.primary, fontWeight: 500 }}>{t.id}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13, color: T.text, fontWeight: 500, maxWidth: 280 }}>
                    <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.title}</div>
                    <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
                      {t.tags.map(tag => <Badge key={tag} label={tag} color="gray" />)}
                    </div>
                  </td>
                  <td style={{ padding: "12px 16px" }}><Badge label={t.priority} color={priorityColor(t.priority)} /></td>
                  <td style={{ padding: "12px 16px" }}><Badge label={statusLabel(t.status)} color={statusColor(t.status)} /></td>
                  <td style={{ padding: "12px 16px", fontSize: 13, color: T.text }}>
                    <span style={{
                      padding: "3px 9px", borderRadius: 6, fontSize: 12, fontWeight: 700,
                      background: t.difficulty >= 4 ? T.redLight : t.difficulty >= 3 ? T.amberLight : T.greenLight,
                      color: t.difficulty >= 4 ? T.red : t.difficulty >= 3 ? T.amber : T.green,
                    }}>{t.difficulty}×</span>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: 13, color: T.textMid }}>{t.assignee}</td>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: T.textSoft }}>{t.created}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {filtered.map((t, i) => (
            <Card key={t.id} className="fade-up" style={{ padding: "18px 20px", animationDelay: `${i * 0.04}s`, cursor: "pointer" }} onClick={() => onNavigate("ticket-detail")}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <span className="mono" style={{ fontSize: 11, color: T.primary, fontWeight: 600 }}>{t.id}</span>
                <Badge label={statusLabel(t.status)} color={statusColor(t.status)} />
              </div>
              <p style={{ fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 10, lineHeight: 1.4 }}>{t.title}</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                <Badge label={t.priority} color={priorityColor(t.priority)} />
                {t.tags.map(tag => <Badge key={tag} label={tag} color="gray" />)}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, color: T.textSoft }}>{t.assignee}</span>
                <span style={{
                  padding: "2px 8px", borderRadius: 5, fontSize: 11, fontWeight: 700,
                  background: t.difficulty >= 4 ? T.redLight : t.difficulty >= 3 ? T.amberLight : T.greenLight,
                  color: t.difficulty >= 4 ? T.red : t.difficulty >= 3 ? T.amber : T.green,
                }}>{t.difficulty}× diff</span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TicketsBrowse;
