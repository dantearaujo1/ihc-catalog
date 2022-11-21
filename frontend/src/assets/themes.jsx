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

const Theme = createTheme({
  palette : {
    primary : {
      main: '#7f56ff',
      light: '#a48eff',
      dark: '#7700c0',
    },
    secondary : {
      light: '#00ECF4',
      main: '#00C7CE',
      dark: '#00959B',
    },
    page : {
      background:{
        primary:{
          light:"#808080",
          main:"#606060",
          dark:"#202020",
        },
        secondary:{
          light:"#aaaaaa",
          main:"#808080",
          dark:"#606060",
        },
      },
    },
    text: {
      primary: '#212121',
      disabled: '#e0e0e0',
      secondary: '#757575',
    },
    status : {
      success: {
        light: "#00aa00",
        main: "#008000",
        dark: "#006000"
      },
      error: {
        light: "#bb0000",
        main: "#990000",
        dark: "#700000"
      },
    },
    button: {
        text:{
          main: '#303030',
        },
        background:{
          light: '#808080',
          main: "#505050",
          dark: '#202020',
        },
        hover:{
          main: '#00ffff',
          dark: '#ffffff',
          light: '#8000ff',
        },
    },
    textField:{
      background:{
        light: '#ffggff',
        main: '#ffffff',
        dark: '#00ggff',
      },
      outline: {
        main: '#000000',
      },

    }
  },
  typography: {
    fontFamily: ["Roboto", "Nunito"],
  },
})

// Theme.components = {
//   MuiOutlinedInput: {
//     styleOverrides:{
//       root: ({theme}) => ({
//         // backgroundColor: theme.palette.textField.background.main,
//         // borderRadius: "50px",
//       }),
//       "&:hover": ({theme}) => ({
//         // borderRadius: "50px",
//         // backgroundColor: theme.palette.primary.main,
//       }),
//     },
//   },
//   MuiButton:{
//     styleOverrides:{
//       contained:({theme})=>({
//         // backgroundColor: theme.palette.button.background.main
//       }),
//       text:({theme})=>({
//         // backgroundColor: "transparent"
//       }),
//     }
//   },
// };

export const themeOptions = createTheme({
  palette: {
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
  },
});


export default Theme;
