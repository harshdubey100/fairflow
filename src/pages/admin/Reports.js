import React, { useState } from 'react';
import T from '../../tokens/theme';
import Card from '../../components/shared/Card';
import AiPill from '../../components/shared/AiPill';

// Admin: Reports
const Reports = () => {
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [progress, setProgress] = useState(0);
 
  const generate = () => {
    setGenerating(true);
    setGenerated(false);
    setProgress(0);
    const iv = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(iv); setGenerating(false); setGenerated(true); return 100; }
        return p + 8;
      });
    }, 120);
  };
 
  return (
    <div className="page" style={{ padding: "28px 32px", maxWidth: 820 }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>Generate Report</h2>
      <p style={{ color: T.textMid, fontSize: 13, marginBottom: 22 }}>AI-powered report generation. Streaming Markdown preview before PDF export.</p>
 
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        <Card style={{ padding: "20px" }}>
          <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 8 }}>Report Type</label>
          <select style={{ width: "100%", padding: "10px 14px", border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bgCard }}>
            <option>Efficiency Report</option>
            <option>Financial Summary</option>
            <option>HR & Performance</option>
            <option>Weekly Digest</option>
          </select>
        </Card>
        <Card style={{ padding: "20px" }}>
          <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 8 }}>Timeframe</label>
          <select style={{ width: "100%", padding: "10px 14px", border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bgCard }}>
            <option>This week</option>
            <option>This month</option>
            <option>Last 90 days</option>
            <option>Custom range</option>
          </select>
        </Card>
      </div>
 
      <button className="btn-primary" onClick={generate} disabled={generating} style={{ marginBottom: 20, padding: "11px 28px", fontSize: 13 }}>
        {generating ? "Generating…" : "✨ Generate Report"}
      </button>
 
      {generating && (
        <Card style={{ padding: "20px", marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 8 }}>
            <span style={{ color: T.textMid }}>Streaming from AI…</span>
            <span style={{ color: T.primary, fontWeight: 600 }}>{progress}%</span>
          </div>
          <div style={{ height: 6, background: T.bg, borderRadius: 4 }}>
            <div style={{ height: "100%", width: `${progress}%`, background: T.primary, borderRadius: 4, transition: "width 0.1s" }} />
          </div>
        </Card>
      )}
 
      {generated && (
        <Card className="fade-up" style={{ overflow: "hidden" }}>
          <div style={{ padding: "14px 20px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 700 }}>Efficiency Report — Week of Jun 24</span>
              <AiPill text="" />
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn-ghost" style={{ fontSize: 12 }}>📋 Copy Markdown</button>
              <button className="btn-primary" style={{ fontSize: 12 }}>⬇ Export PDF</button>
            </div>
          </div>
          <div style={{ padding: "20px 24px", fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, color: T.text, lineHeight: 1.9, background: "#fafbff" }}>
            <p><strong style={{ color: T.primary }}># Efficiency Report — Week of Jun 24, 2025</strong></p>
            <br />
            <p><strong>## Summary</strong></p>
            <p>The team closed <strong>94 tickets</strong> this week, a <span style={{ color: T.green }}>+11% improvement</span> over the previous period. Average resolution time dropped to <strong>4.2 hours</strong>.</p>
            <br />
            <p><strong>## Key Highlights</strong></p>
            <p>- 🏆 Top performer: **Alex K.** (1,840 pts, 24 tickets closed)</p>
            <p>- 🔴 Critical bottleneck: API failures category (7 open tickets)</p>
            <p>- ⚠️ Anomaly flagged: TKT-006 scored unusually low for duration</p>
            <br />
            <p><strong>## Recommendations</strong></p>
            <p>1. Assign 2 additional engineers to API-related tickets</p>
            <p>2. Review TKT-006 scoring override in Governance panel</p>
            <p>3. Consider scheduling a "Fast Fridays" sprint for low-difficulty backlog</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Reports;