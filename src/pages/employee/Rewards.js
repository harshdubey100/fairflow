import React, { useState } from 'react';
import T from '../../tokens/theme';
import Card from '../../components/shared/Card';
import { TICKETS } from '../../data/tickets';
import { REWARDS_CATALOG } from '../../data/rewardCatalog';

// Employee: Rewards
const Rewards = () => {
  const [points] = useState(1840);
  const [tab, setTab] = useState("wallet");
 
  return (
    <div className="page" style={{ padding: "28px 32px", maxWidth: 900 }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>Rewards</h2>
      <p style={{ color: T.textMid, fontSize: 13, marginBottom: 22 }}>Earn points by closing tickets. Spend them on perks.</p>
 
      {/* Balance hero */}
      <Card style={{ padding: "28px 32px", marginBottom: 22, background: "linear-gradient(135deg, #eff4ff 0%, #f5f3ff 100%)", border: `1px solid ${T.primaryBorder}` }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: T.textSoft, marginBottom: 6 }}>YOUR BALANCE</p>
            <p style={{ fontSize: 48, fontWeight: 800, color: T.primary, lineHeight: 1 }}>{points.toLocaleString()} <span style={{ fontSize: 18, fontWeight: 600, color: T.textMid }}>pts</span></p>
            <p style={{ fontSize: 13, color: T.textMid, marginTop: 8 }}>Normalized Score (adjusted for difficulty)</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 13, color: T.textSoft, marginBottom: 4 }}>Raw Tickets Closed</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: T.text }}>24</div>
            <div style={{ fontSize: 12, color: T.green, marginTop: 2 }}>+3 this week</div>
          </div>
        </div>
      </Card>
 
      {/* Tabs */}
      <div style={{ display: "flex", gap: 0, marginBottom: 18, border: `1px solid ${T.border}`, borderRadius: 10, overflow: "hidden", width: "fit-content" }}>
        {[["wallet", "My Wallet"], ["catalog", "Rewards Catalog"]].map(([val, label]) => (
          <button key={val} onClick={() => setTab(val)} style={{
            padding: "8px 20px", fontSize: 13, fontWeight: 500, border: "none", cursor: "pointer", transition: "all 0.15s",
            background: tab === val ? T.primary : T.bgCard,
            color: tab === val ? "#fff" : T.textMid,
          }}>{label}</button>
        ))}
      </div>
 
      {tab === "wallet" ? (
        <Card>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${T.border}` }}>
                {["Ticket", "Description", "Difficulty", "Base", "Bonus", "Points Earned", "Date"].map(h => (
                  <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: T.textSoft, textTransform: "uppercase", letterSpacing: "0.04em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TICKETS.filter(t => t.status === "closed").map((t, i, arr) => (
                <tr key={t.id} className="hover-row" style={{ borderBottom: i < arr.length - 1 ? `1px solid ${T.border}` : "none" }}>
                  <td className="mono" style={{ padding: "12px 16px", fontSize: 12, color: T.primary, fontWeight: 600 }}>{t.id}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13, color: T.text, maxWidth: 220 }}>
                    <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.title}</div>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 700, color: T.amber }}>{t.difficulty}×</td>
                  <td style={{ padding: "12px 16px", fontSize: 13, color: T.text }}>60</td>
                  <td style={{ padding: "12px 16px", fontSize: 13, color: T.green }}>+{Math.round(t.difficulty * 22)}</td>
                  <td style={{ padding: "12px 16px", fontSize: 14, fontWeight: 700, color: T.primary }}>{Math.round(60 + t.difficulty * 22)}</td>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: T.textSoft }}>{t.created}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {REWARDS_CATALOG.map((r, i) => (
            <Card key={r.name} className="fade-up" style={{ padding: "20px", animationDelay: `${i * 0.06}s` }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>{r.icon}</div>
              <p style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 4 }}>{r.name}</p>
              <p style={{ fontSize: 12, color: T.textSoft, marginBottom: 14 }}>{r.stock} remaining</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 16, fontWeight: 800, color: T.primary }}>{r.points.toLocaleString()} pts</span>
                <button className={points >= r.points ? "btn-primary" : "btn-ghost"} style={{ fontSize: 12, padding: "6px 14px" }}>
                  {points >= r.points ? "Redeem" : "🔒 Need more"}
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Rewards;