import React, { useState } from 'react';
import T from '../../tokens/theme';
import Icon from '../../icons/icons';

// Employee: Create Ticket
const CreateTicket = ({ onNavigate }) => {
  const [title, setTitle] = useState("");
  const [suggestion, setSuggestion] = useState(null);
  const [loading, setLoading] = useState(false);
 
  const handleTitleChange = (val) => {
    setTitle(val);
    if (val.length > 15) {
      setLoading(true);
      setTimeout(() => {
        setSuggestion({ id: "TKT-003", text: "Add multi-language support to email templates" });
        setLoading(false);
      }, 900);
    } else {
      setSuggestion(null);
    }
  };
 
  return (
    <div className="page" style={{ padding: "28px 32px", maxWidth: 780 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, cursor: "pointer" }} onClick={() => onNavigate("tickets")}>
        <Icon name="chevronRight" size={14} color={T.textSoft} style={{ transform: "rotate(180deg)" }} />
        <span style={{ fontSize: 13, color: T.textSoft }}>Back to Tickets</span>
      </div>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>Create New Ticket</h2>
 
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {/* Title with AI deflection */}
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, color: T.text, display: "block", marginBottom: 6 }}>Title *</label>
          <input value={title} onChange={e => handleTitleChange(e.target.value)} placeholder="Describe the issue briefly..."
            style={{ width: "100%", padding: "10px 14px", border: `1.5px solid ${T.border}`, borderRadius: 8, fontSize: 13.5, color: T.text, outline: "none", transition: "border 0.15s" }}
            onFocus={e => e.target.style.borderColor = T.primary}
            onBlur={e => e.target.style.borderColor = T.border}
          />
          {loading && (
            <div style={{ marginTop: 8, fontSize: 12, color: T.textSoft, display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ display: "inline-block", width: 10, height: 10, border: `2px solid ${T.primary}`, borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
              AI checking for duplicates…
            </div>
          )}
          {suggestion && (
            <div style={{
              marginTop: 8, padding: "12px 14px", borderRadius: 8,
              background: T.amberLight, border: `1px solid #fde68a`,
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <Icon name="warning" size={15} color={T.amber} />
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: T.amber }}>Wait! Similar ticket found: </span>
                <span className="mono" style={{ fontSize: 12, color: T.amber }}>{suggestion.id}</span>
                <span style={{ fontSize: 12, color: T.textMid }}>  — "{suggestion.text}"</span>
              </div>
              <button className="btn-ghost" style={{ fontSize: 11, padding: "4px 10px" }}>View Solution</button>
            </div>
          )}
        </div>
 
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: T.text, display: "block", marginBottom: 6 }}>Priority</label>
            <select style={{ width: "100%", padding: "10px 14px", border: `1.5px solid ${T.border}`, borderRadius: 8, fontSize: 13, color: T.text, background: T.bgCard }}>
              <option>Critical</option><option>High</option><option>Medium</option><option>Low</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: T.text, display: "block", marginBottom: 6 }}>Category</label>
            <select style={{ width: "100%", padding: "10px 14px", border: `1.5px solid ${T.border}`, borderRadius: 8, fontSize: 13, color: T.text, background: T.bgCard }}>
              <option>Bug</option><option>Feature</option><option>Infrastructure</option><option>Security</option>
            </select>
          </div>
        </div>
 
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, color: T.text, display: "block", marginBottom: 6 }}>Description</label>
          <textarea rows={5} placeholder="Describe the issue in detail. Include steps to reproduce, expected vs actual behavior..."
            style={{ width: "100%", padding: "10px 14px", border: `1.5px solid ${T.border}`, borderRadius: 8, fontSize: 13, color: T.text, resize: "vertical", outline: "none" }}
            onFocus={e => e.target.style.borderColor = T.primary}
            onBlur={e => e.target.style.borderColor = T.border}
          />
        </div>
 
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button className="btn-ghost" onClick={() => onNavigate("tickets")}>Cancel</button>
          <button className="btn-primary" onClick={() => onNavigate("tickets")}>Create Ticket</button>
        </div>
      </div>
    </div>
  );
};

export default CreateTicket;