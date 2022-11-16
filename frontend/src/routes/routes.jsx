import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles'

import Home from "./Home";
import Admin from "./Admin";
import Login from "./Login";

const theme = createTheme({
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
      header :{

      },
      content :{
        light: "#606060",
        main: "#303030",
        dark: "#000000",
      },
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
    fontFamily: "Nunito",
    h1:{
      fontSize:56,
    },
    h2:{
      fontSize:52,
    },
    h3:{
      fontSize:42,
    },
  },
})

theme.components = {
  MuiOutlinedInput: {
    styleOverrides:{
      root: ({theme}) => ({
        backgroundColor: theme.palette.textField.background.main,
        borderRadius: "50px",
      }),
      "&:hover": ({theme}) => ({
        backgroundColor: theme.palette.primary.main,
        borderRadius: "50px",
      }),
    },
  },
  MuiButton:{
    styleOverrides:{
      contained:({theme})=>({
        backgroundColor: theme.palette.button.background.main
      }),
      text:({theme})=>({
        backgroundColor: "transparent"
      }),
    }
  },
};


function AppRoutes(){
   return(
       <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route element={ <Login/> }  path="/login" exact />
            <Route element={ <Home/> }  path="/" exact />
            <Route element={ <Admin/> }  path="/dboard_admin" exact />
          </Routes>
        </ThemeProvider>
       </BrowserRouter>
   )
}

export default AppRoutes
