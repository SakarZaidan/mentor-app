import React from 'react';

const Button = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  fullWidth = false,
  leftIcon = null,
  rightIcon = null,
  style = {},
  ...props 
}) => {
  // This is a shared component that will be implemented differently
  // for web (using Material-UI) and mobile (using React Native Paper)
  // This file serves as a common interface definition
  
  return (
    <button 
      onClick={onPress}
      disabled={disabled}
      className={`
        button 
        button-${variant} 
        button-${size}
        ${fullWidth ? 'button-full-width' : ''}
      `}
      style={style}
      {...props}
    >
      {leftIcon && <span className="button-icon-left">{leftIcon}</span>}
      {title}
      {rightIcon && <span className="button-icon-right">{rightIcon}</span>}
    </button>
  );
};

export default Button;
