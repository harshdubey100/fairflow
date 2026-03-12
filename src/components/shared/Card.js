import React from 'react';
import T from '../../tokens/theme';

const Card = ({ children, style = {}, className = "" }) => (
  <div className={`hover-card ${className}`} style={{
    background: T.bgCard,
    border: `1px solid ${T.border}`,
    borderRadius: 12,
    boxShadow: T.shadow,
    transition: "all 0.2s",
    ...style,
  }}>
    {children}
  </div>
);

export default Card;