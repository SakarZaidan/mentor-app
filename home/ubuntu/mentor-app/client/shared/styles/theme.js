// Theme configuration for both web and mobile platforms
const theme = {
  colors: {
    primary: '#4361EE',
    secondary: '#3F37C9',
    accent: '#4CC9F0',
    background: '#F8F9FA',
    surface: '#FFFFFF',
    error: '#CF6679',
    text: '#000000',
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onBackground: '#000000',
    onSurface: '#000000',
    onError: '#FFFFFF',
    // Additional custom colors
    success: '#4CAF50',
    warning: '#FFC107',
    info: '#2196F3',
    lightGrey: '#E0E0E0',
    darkGrey: '#757575',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  typography: {
    fontFamily: {
      regular: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      medium: 'Roboto Medium, "Helvetica Neue", Helvetica, Arial, sans-serif',
      bold: 'Roboto Bold, "Helvetica Neue", Helvetica, Arial, sans-serif',
    },
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
      xxxl: 30,
    },
    lineHeight: {
      xs: 16,
      sm: 20,
      md: 24,
      lg: 28,
      xl: 32,
      xxl: 36,
    },
  },
  shape: {
    borderRadius: 8,
    buttonBorderRadius: 4,
    cardBorderRadius: 12,
  },
  shadows: {
    none: 'none',
    sm: '0px 2px 4px rgba(0, 0, 0, 0.05)',
    md: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    lg: '0px 8px 16px rgba(0, 0, 0, 0.15)',
    xl: '0px 16px 24px rgba(0, 0, 0, 0.2)',
  },
  // Animation durations
  animation: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
  // Z-index values
  zIndex: {
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
};

export default theme;
