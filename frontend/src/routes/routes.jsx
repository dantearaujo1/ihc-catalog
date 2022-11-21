import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Home from "./Home";
import Admin from "./Admin";
import Login from "./Login";
import ResultList from "./ResultList";
import InstrumentDetail from "./InstrumentDetail";

import Theme, { themeOptions } from "../assets/themes"
import {  ThemeProvider } from '@mui/material/styles'



function AppRoutes(){
   return(
       <BrowserRouter>
        <ThemeProvider theme={Theme}>
          <Routes>
            <Route element={ <Login/> }  path="/admin" exact />
            <Route element={ <Home/> }  path="/" exact />
            <Route element={ <Admin/> }  path="/admin_dboard" exact />
            <Route element={ <ResultList/> }  path="/result" exact />
            <Route element={ <InstrumentDetail/> }  path="/instrument_detail" exact />
          </Routes>
        </ThemeProvider>
       </BrowserRouter>
   )
}

export default AppRoutes
