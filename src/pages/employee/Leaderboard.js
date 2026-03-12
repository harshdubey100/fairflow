{/* Leaderboard */}
        <Card style={{ padding: "20px 22px" }}>
          <SectionHeader title="Team Leaderboard" />
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {TEAM.map((m, i) => (
              <div key={m.name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < TEAM.length - 1 ? `1px solid ${T.border}` : "none" }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: i < 3 ? [T.amber, T.textMid, "#cd7f32"][i] : T.textSoft, width: 18, textAlign: "center" }}>
                  {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : m.rank}
                </span>
                <Avatar initials={m.avatar} size={28} color={T.primary} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: m.name === "Alex K." ? T.primary : T.text }}>{m.name} {m.name === "Alex K." && "(You)"}</div>
                  <div style={{ fontSize: 11, color: T.textSoft }}>{m.tickets} tickets closed</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{m.score.toLocaleString()}</div>
                  <div style={{ fontSize: 11, color: m.trend.startsWith("+") ? T.green : T.red }}>{m.trend}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>