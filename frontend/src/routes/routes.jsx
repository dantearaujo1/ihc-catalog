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
      light: '#ffggff',
      dark: '#00ggff',
    },
    secondary : {
      light: '#ffggff',
      main: '#000000',
      dark: '#00ggff',
    },
    typography: {
      fontFamily: "Nunito",
    },
  },
})

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
