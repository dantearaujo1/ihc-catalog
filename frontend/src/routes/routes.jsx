import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Home from "./Home";
import Admin from "./Admin";

function AppRoutes(){
   return(
       <BrowserRouter>
          <Routes>
            <Route element={ <Home/> }  path="/" exact />
            <Route element={ <Admin/> }  path="/dboard_admin" exact />
          </Routes>
       </BrowserRouter>
   )
}

export default AppRoutes
