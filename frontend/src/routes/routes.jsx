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
      light: '#ffeeff',
      main: '#808080',
      dark: '#111111',
    },
    page : {
      background:{
        primary:{
          main:"#000000",
        },
      },
    },
    button: {
        text:{
          main: '#303030',
        },
        background:{
          dark: '#000000',
        main: '#505050',
          light: '#aaaaaa',
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
      root:({theme})=>({
        backgroundColor: theme.palette.secondary.main
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
