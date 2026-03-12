import React from 'react';
import T from '../../tokens/theme';
import Card from './Card';
import Icon from '../../icons/icons';

const StatWidget = ({ label, value, sub, icon, color = T.primary, delay = 0 }) => (
  <Card className="fade-up" style={{ padding: "20px 22px", animationDelay: `${delay}s` }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div>
        <div style={{ fontSize: 12, color: T.textSoft, fontWeight: 500, marginBottom: 6 }}>{label}</div>
        <div style={{ fontSize: 28, fontWeight: 700, color: T.text, lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: 12, color: T.textSoft, marginTop: 6 }}>{sub}</div>
      </div>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: color + "18", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name={icon} size={18} color={color} />
      </div>
    </div>
  </Card>
);

export default StatWidget;