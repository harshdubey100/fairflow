import React from 'react';
import T from '../../tokens/theme';

const SectionHeader = ({ title, action }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
    <h3 style={{ fontSize: 14, fontWeight: 700, color: T.text }}>{title}</h3>
    {action}
  </div>
);

export default SectionHeader;