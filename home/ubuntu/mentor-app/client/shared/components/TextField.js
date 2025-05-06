import React from 'react';

const TextField = ({
  label,
  value,
  onChangeText,
  placeholder = '',
  error = null,
  helperText = '',
  disabled = false,
  multiline = false,
  numberOfLines = 1,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  style = {},
  ...props
}) => {
  // This is a shared component that will be implemented differently
  // for web (using Material-UI) and mobile (using React Native Paper)
  // This file serves as a common interface definition
  
  return (
    <div className="text-field-container" style={style}>
      {label && <label className="text-field-label">{label}</label>}
      {multiline ? (
        <textarea
          className={`text-field ${error ? 'text-field-error' : ''}`}
          value={value}
          onChange={(e) => onChangeText(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          rows={numberOfLines}
          {...props}
        />
      ) : (
        <input
          className={`text-field ${error ? 'text-field-error' : ''}`}
          type={secureTextEntry ? 'password' : 'text'}
          value={value}
          onChange={(e) => onChangeText(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          {...props}
        />
      )}
      {(error || helperText) && (
        <div className={`text-field-helper ${error ? 'text-field-error-text' : ''}`}>
          {error || helperText}
        </div>
      )}
    </div>
  );
};

export default TextField;
