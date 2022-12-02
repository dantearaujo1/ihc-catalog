import { createTheme, responsiveFontSizes } from '@mui/material/styles'

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
    default: '#ffffff',
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
  },
  scrollbar:{
    light: '#E8E8E8',
    dark: '#7A7A7A',
  }
};


let themeOptions = createTheme({
  palette: Colors,
  typography: {
    fontFamily: ['Cabinet Grotesk', 'Roboto', 'Nunito'].join(','),
    h1:{
      fontFamily: "Cabinet Grotesk",
      fontWeight: 700,
      fontSize: "4.28rem",
      fontStyle: "normal",
    },
    h2:{
      fontFamily: "Cabinet Grotesk",
      fontWeight: 700,
      fontSize: "3.42rem",
      fontStyle: "normal",
    },
    h3:{
      fontFamily: "Cabinet Grotesk",
      fontWeight: 700,
      fontSize: "2rem",
      fontStyle: "normal",
    },
    h4:{
      fontFamily: "Cabinet Grotesk",
      fontWeight: 700,
      fontSize: "2.86rem",
      fontStyle: "normal",
    },
    h5:{
      fontFamily: "Roboto",
      fontWeight: 700,
      fontSize: "1.43rem",
      fontStyle: "normal",
    },
    h6:{
      fontFamily: "Roboto",
      fontWeight: 400,
      fontSize: "1.71rem",
      fontStyle: "normal",
    },
    h7:{
      fontFamily: "Roboto",
      fontWeight: 400,
      fontSize: "1.71rem",
      fontStyle: "normal",
    },
    h8:{
      fontFamily: "Roboto",
      fontWeight: 400,
      fontSize: "1.71rem",
      fontStyle: "normal",
    },
    button:{
      fontFamily: "Roboto",
      fontWeight: 500,
      fontSize: "1rem",
      fontStyle: "normal",
    },
    buttonSmall:{
      fontFamily: "Roboto",
      fontWeight: 500,
      fontSize: "0.86rem",
      fontStyle: "normal",
      textTransform: "uppercase",
    },
    buttonLarge:{
      fontFamily: "Roboto",
      fontWeight: 600,
      fontSize: "1.14rem",
      fontStyle: "normal",
      textTransform: "uppercase",
    },
    caption:{
      fontFamily: "Roboto",
      fontWeight: 400,
      fontSize: "0.86rem",
      fontStyle: "normal",
    },
    overline:{
      fontFamily: "Cabinet Grotesk",
      fontWeight: 400,
      fontSize: "0.86rem",
      fontStyle: "normal",
      textTransform: "uppercase",
    },
    subtitle1:{
      fontFamily: "Roboto",
      fontWeight: 500,
      fontSize: "1.14rem",
      fontStyle: "normal",
      textTransform: "uppercase",
    },
    subtitle2:{
      fontFamily: "Roboto",
      fontWeight: 500,
      fontSize: "1rem",
      fontStyle: "normal",
    },
    body1:{
      fontFamily: "Robot",
      fontWeight: 400,
      fontSize: "1.14rem",
      fontStyle: "normal",
    },
    body2:{
      fontFamily: "Roboto",
      fontWeight: 400,
      fontSize: "1rem",
      fontStyle: "normal",
    },
    inputLabel:{
      fontFamily: "Roboto",
      fontWeight: 500,
      fontSize: "0.86rem",
      fontStyle: "normal",
    },
    inputText:{
      fontFamily: "Roboto",
      fontWeight: 400,
      fontSize: "1.14rem",
      fontStyle: "normal",
    },
    tooltip:{
      fontFamily: "Roboto",
      fontWeight: 500,
      fontSize: "0.714rem",
      fontStyle: "normal",
    },
  },
});

themeOptions = responsiveFontSizes(themeOptions);

export default themeOptions;
