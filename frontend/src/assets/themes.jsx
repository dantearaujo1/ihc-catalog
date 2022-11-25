import { createTheme } from '@mui/material/styles'

const Colors = {
  type: 'light',
  primary: {
    light: '#51b7Ae',
    main: '#26a69A',
    dark: '#1a746B',
  },
  secondary: {
    light: '#9778CE',
    main: '#7e57c2',
    dark: '#583c87',
  },
  background: {
    default: '#fafafa',
  },
  text: {
    primary: '#424242',
    disabled: '#e0e0e0',
    secondary: '#757575',
  },
  error: {
    light: '#ea605d',
    main: '#e53935',
    dark: '#a02725',
  },
  warning: {
    light: '#ffac33',
    main: '#ff9800',
    dark: '#b26a00',
  },
  info: {
    light: '#67b7f7',
    main: '#42a5f5',
    dark: '#2e73ab',
  },
  divider: '#e0e0e0',
  success: {
    light: '#68b36b',
    main: '#43a047',
    dark: '#2e7031',
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

