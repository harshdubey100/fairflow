import React from 'react';
import T from '../tokens/theme';

const Avatar = ({ initials, size = 30, color = T.primary }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%",
    background: color + "22", color,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: size * 0.35, fontWeight: 700, flexShrink: 0,
    border: `1.5px solid ${color}40`,
  }}>{initials}</div>
);

export default Avatar;