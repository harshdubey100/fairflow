import React from 'react';
import T from '../../tokens/theme';

const Badge = ({ label, color = "blue" }) => {
  const colors = {
    blue: { bg: T.primaryLight, text: T.primary, border: T.primaryBorder },
    green: { bg: T.greenLight, text: T.green, border: "#bbf7d0" },
    amber: { bg: T.amberLight, text: T.amber, border: "#fde68a" },
    red: { bg: T.redLight, text: T.red, border: "#fecaca" },
    purple: { bg: T.purpleLight, text: T.purple, border: "#ddd6fe" },
    gray: { bg: "#f3f4f6", text: "#6b7280", border: "#e5e7eb" },
  };
  const c = colors[color] || colors.blue;
  return (
    <span className="tag" style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}>
      {label}
    </span>
  );
};

export default Badge;