import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Home from "./Home";
import Admin from "./Admin";
import Login from "./Login";
import ResultList from "./ResultList";
import About from "./About";
import Tutorial from "./Tutorial";
import InstrumentDetail from "./InstrumentDetail";


function AppRoutes(){
   return(
       <BrowserRouter>
            <Routes>
              <Route element={ <Login/> }  path="/admin" exact />
              <Route element={ <Home/> }  path="/" exact />
              <Route element={ <Admin/> }  path="/admin_dboard" exact />
              <Route element={ <ResultList/> }  path="/result/:subID"/>
          {/* React Router v6 > drop support for optional params */}
              <Route element={ <ResultList/> }  path="/result/"/>
              <Route element={ <InstrumentDetail/> }  path="/instrument_detail" exact />
              <Route element={ <About/> }  path="/about"/>
              <Route element={ <Tutorial/> }  path="/tutorial"/>
            </Routes>
       </BrowserRouter>
   )
}

export default AppRoutes
