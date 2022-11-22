import { createTheme } from '@mui/material/styles'

const Colors = {
  type: 'light',
  primary: {
    main: '#00bcd4',
  },
  secondary: {
    main: '#5e35b1',
  },
  background: {
    default: '#fafafa',
  },
  text: {
    primary: '#212121',
    disabled: '#e0e0e0',
    secondary: '#757575',
  },
  error: {
    main: '#e53935',
  },
  warning: {
    main: '#ff9800',
  },
  info: {
    main: '#42a5f5',
  },
  divider: '#e0e0e0',
  success: {
    main: '#43a047',
  },
};


export const themeOptions = createTheme({
  palette: Colors,
  typography: {
    fontFamily: ["Roboto", "Nunito"],
  },
});

