import React from 'react';
import Icon from '../../icons/icons';
import T from '../../tokens/theme';

const AiPill = ({ text }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: 5,
    padding: "3px 10px", borderRadius: 99,
    background: "linear-gradient(135deg, #eff4ff, #f5f3ff)",
    border: "1px solid #c4b5fd",
    fontSize: 11, fontWeight: 600, color: T.purple,
  }}>
    <Icon name="brain" size={11} color={T.purple} /> AI
  </span>
);

export default AiPill;
