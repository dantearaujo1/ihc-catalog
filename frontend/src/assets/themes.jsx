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
  effects:{
    primary:{
      lighter: '#00f3d8',
      darker: '#002bb3',
    },
    secondary:{
      lighter: '#a984ec',
      darker: '#4809a5',
    },
  }
};


export const themeOptions = createTheme({
  palette: Colors,
  typography: {
    fontFamily: ["Roboto", "Nunito"],
  },
});

