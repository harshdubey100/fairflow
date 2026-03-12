import React, { useState } from 'react';
import T from '../../tokens/theme';
import { TICKETS } from '../../data/tickets';
import { COMMENTS } from '../../data/comments';
import Icon from '../../icons/icons';
import Badge from '../../components/shared/Badge';
import Card from '../../components/shared/Card';
import SectionHeader from '../../components/shared/SectionHeader';
import Avatar from '../../priorityhelpers/Avatar';
import AiPill from '../../components/shared/AiPill';
import { priorityColor } from '../../priorityhelpers/PriorityColor';
import { statusColor } from '../../priorityhelpers/StatusColor';
import { statusLabel } from '../../priorityhelpers/StatusLabel';

// Employee: Ticket Detail (The Workhorse)
const TicketDetail = ({ onNavigate }) => {
  const ticket = TICKETS[0];
  const comments = COMMENTS;
  const [reply, setReply] = useState("");
  const [showTranslation, setShowTranslation] = useState({});
  const [ragResults, setRagResults] = useState(null);
  const [drafting, setDrafting] = useState(false);
 
  const activateRag = () => {
    setRagResults([
      { id: "TKT-089", title: "Rate limiting config for nginx upstream", similarity: "94%" },
      { id: "TKT-214", title: "Production 503 errors during traffic spikes", similarity: "87%" },
      { id: "TKT-332", title: "API gateway timeout configuration", similarity: "78%" },
    ]);
  };
 
  const draftReply = () => {
    setDrafting(true);
    setTimeout(() => {
      setReply("Based on the analysis, I recommend increasing the rate limit threshold in nginx.conf from 100r/m to 500r/m and adding a Redis-backed request queue. This solution was applied successfully in TKT-089 and resolved similar issues within 15 minutes.");
      setDrafting(false);
    }, 1200);
  };
 
  return (
    <div className="page" style={{ padding: "28px 32px", maxWidth: 1100 }}>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16, fontSize: 12, color: T.textSoft }}>
        <span style={{ cursor: "pointer", color: T.primary }} onClick={() => onNavigate("emp-dashboard")}>Dashboard</span>
        <Icon name="chevronRight" size={12} />
        <span style={{ cursor: "pointer", color: T.primary }} onClick={() => onNavigate("tickets")}>Tickets</span>
        <Icon name="chevronRight" size={12} />
        <span className="mono">{ticket.id}</span>
      </div>
 
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 20 }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{ticket.title}</h2>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            <span className="mono" style={{ fontSize: 12, color: T.textSoft }}>{ticket.id}</span>
            <Badge label={ticket.priority} color={priorityColor(ticket.priority)} />
            <Badge label={statusLabel(ticket.status)} color={statusColor(ticket.status)} />
            {ticket.tags.map(t => <Badge key={t} label={t} color="gray" />)}
            <span style={{ fontSize: 12, color: T.textSoft, marginLeft: 4 }}>Opened {ticket.created} · Assigned to {ticket.assignee}</span>
          </div>
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: 8, padding: "8px 14px",
          background: T.redLight, border: `1px solid #fecaca`, borderRadius: 8,
          fontSize: 12, fontWeight: 600, color: T.red,
        }}>
          <Icon name="clock" size={14} color={T.red} /> 2h 14m elapsed
        </div>
      </div>
 
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20 }}>
        {/* Left: chat */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Comments */}
          <Card style={{ padding: "20px" }}>
            <SectionHeader title="Activity & Comments" />
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {comments.map((c, i) => (
                <div key={i} style={{ display: "flex", gap: 12 }}>
                  <Avatar initials={c.avatar} size={32} color={T.primary} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>{c.user}</span>
                      <span style={{ fontSize: 11, color: T.textSoft }}>{c.time}</span>
                      {c.translated && <AiPill text="AI" />}
                    </div>
                    <div style={{ fontSize: 13, color: T.text, lineHeight: 1.6, padding: "10px 14px", background: T.bg, borderRadius: "0 8px 8px 8px", border: `1px solid ${T.border}` }}>
                      {c.text}
                      {c.translated && (
                        <div>
                          <button onClick={() => setShowTranslation(p => ({ ...p, [i]: !p[i] }))} style={{
                            marginTop: 6, fontSize: 11, color: T.purple, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, padding: 0
                          }}>
                            <Icon name="translate" size={11} color={T.purple} />
                            {showTranslation[i] ? "Hide" : "Show"} AI Translation (EN)
                          </button>
                          {showTranslation[i] && (
                            <div style={{ marginTop: 6, padding: "8px 10px", background: T.purpleLight, border: `1px solid #ddd6fe`, borderRadius: 6, fontSize: 12, color: T.purple, fontStyle: "italic" }}>
                              "{c.translatedText}"
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
 
            {/* Reply box */}
            <div style={{ marginTop: 20, borderTop: `1px solid ${T.border}`, paddingTop: 16 }}>
              <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                <button onClick={draftReply} style={{
                  fontSize: 11, padding: "5px 12px", borderRadius: 6,
                  background: T.purpleLight, border: `1px solid #ddd6fe`, color: T.purple,
                  cursor: "pointer", display: "flex", alignItems: "center", gap: 5, fontWeight: 600,
                }}>
                  {drafting ? <span style={{ display: "inline-block", width: 10, height: 10, border: `2px solid ${T.purple}`, borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} /> : <Icon name="brain" size={11} color={T.purple} />}
                  {drafting ? "Drafting…" : "AI Smart Reply"}
                </button>
              </div>
              <textarea value={reply} onChange={e => setReply(e.target.value)} rows={3} placeholder="Write a comment..."
                style={{ width: "100%", padding: "10px 14px", border: `1.5px solid ${T.border}`, borderRadius: 8, fontSize: 13, resize: "none", outline: "none" }}
                onFocus={e => e.target.style.borderColor = T.primary}
                onBlur={e => e.target.style.borderColor = T.border}
              />
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
                <button className="btn-primary" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}>
                  <Icon name="send" size={12} /> Send
                </button>
              </div>
            </div>
          </Card>
        </div>
 
        {/* Right: AI Copilot sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Copilot */}
          <Card style={{ padding: "18px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: T.purpleLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="brain" size={14} color={T.purple} />
              </div>
              <span style={{ fontSize: 13, fontWeight: 700 }}>AI Copilot</span>
              <AiPill text="" />
            </div>
 
            {!ragResults ? (
              <button onClick={activateRag} className="btn-primary" style={{ width: "100%", fontSize: 12, padding: "9px" }}>
                🔍 Find Similar Tickets
              </button>
            ) : (
              <div>
                <p style={{ fontSize: 11, color: T.textSoft, marginBottom: 10, fontWeight: 500 }}>Similar tickets found via RAG:</p>
                {ragResults.map(r => (
                  <div key={r.id} style={{ padding: "10px 12px", borderRadius: 8, border: `1px solid ${T.border}`, marginBottom: 8, cursor: "pointer", transition: "all 0.15s" }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = T.primaryBorder}
                    onMouseLeave={e => e.currentTarget.style.borderColor = T.border}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                      <span className="mono" style={{ fontSize: 11, color: T.primary, fontWeight: 600 }}>{r.id}</span>
                      <span style={{ fontSize: 10, background: T.greenLight, color: T.green, padding: "1px 6px", borderRadius: 99, fontWeight: 600 }}>{r.similarity}</span>
                    </div>
                    <p style={{ fontSize: 12, color: T.text, lineHeight: 1.4 }}>{r.title}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>
 
          {/* Score preview */}
          <Card style={{ padding: "18px" }}>
            <p style={{ fontSize: 12, fontWeight: 700, marginBottom: 10, color: T.text }}>Score Preview</p>
            <div style={{ display: "flex", justify: "space-between", gap: 8 }}>
              {[["Difficulty", `${ticket.difficulty}×`, T.amber], ["Base Pts", "90", T.primary], ["Total Est.", "~378", T.green]].map(([label, val, color]) => (
                <div key={label} style={{ flex: 1, textAlign: "center", padding: "10px 6px", borderRadius: 8, background: color + "12", border: `1px solid ${color}30` }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color }}>{val}</div>
                  <div style={{ fontSize: 10, color: T.textSoft, marginTop: 2 }}>{label}</div>
                </div>
              ))}
            </div>
          </Card>
 
          {/* Actions */}
          <Card style={{ padding: "18px" }}>
            <p style={{ fontSize: 12, fontWeight: 700, marginBottom: 10, color: T.text }}>Actions</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <button className="btn-primary" style={{ fontSize: 12 }}>✓ Mark as Resolved</button>
              <button className="btn-ghost" style={{ fontSize: 12 }}>↗ Escalate Ticket</button>
              <button className="btn-ghost" style={{ fontSize: 12, color: T.red, borderColor: "#fecaca" }}>✕ Close as Won't Fix</button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;