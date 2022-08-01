import { red, yellow, lightBlue, grey } from '@mui/material/colors';
// Replicate facebook's color palette
export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    background: {
      paper: mode === 'dark' ? '#242526' : '#F5F5F5',
      default: mode === 'dark' ? '#18191A' : '#F0F2F5',
      comment: mode === 'dark' ? '#3A3B3C' : '#F0F2F5'
    },
    text: {
      primary: mode === 'dark' ? '#E4E6EB' : '#050505'
    },
    primary: {
      main: '#2374E1',
      icon:
        mode === 'dark'
          ? 'invert(89%) sepia(6%) hue-rotate(185deg)'
          : 'invert(8%) sepia(10%) saturate(200%) saturate(200%) saturate(166%) hue-rotate(177deg) brightness(104%) contrast(91%)'
    },
    secondary: {
      main: mode === 'dark' ? 'rgba(255,255,255,.1)' : '#E4E6EB'
    },
    error: {
      main: red[500]
    },
    warning: {
      main: yellow[500]
    },
    success: {
      main: '#42b72a'
    },
    info: {
      main: lightBlue[500]
    }
  }
});
