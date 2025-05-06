import React from 'react';

const Card = ({
  children,
  title,
  subtitle,
  elevation = 'md',
  padding = 'md',
  style = {},
  ...props
}) => {
  // This is a shared component that will be implemented differently
  // for web (using Material-UI) and mobile (using React Native Paper)
  // This file serves as a common interface definition
  
  return (
    <div 
      className={`
        card 
        card-elevation-${elevation}
        card-padding-${padding}
      `}
      style={style}
      {...props}
    >
      {title && <div className="card-title">{title}</div>}
      {subtitle && <div className="card-subtitle">{subtitle}</div>}
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

export default Card;
