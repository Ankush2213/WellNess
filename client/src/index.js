import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: { main: '#4CAF9D' }, // Mint Green
    secondary: { main: '#A7E8BD' }, // Light Teal
    warning: { main: '#FF6B6B' }, // Coral Orange as accent
    background: { default: '#F9FAF9', paper: '#FFFFFF' }, // Soft White
    text: { primary: '#2E2E2E' }, // Charcoal Gray
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      defaultProps: { variant: 'contained', size: 'medium' },
      styleOverrides: {
        root: {
          minWidth: 120,
          height: 36,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#F9FAF9',
          color: '#2E2E2E',
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
