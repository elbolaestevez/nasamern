import React, { Component } from "react";
import Landings from "./Landings";
import Neas from "./Neas/Neas";
import Details from "./Details/Details";
import Listado from "./Listado/Listado";
import DetailLanding from "./Listado/CardLanding/DetailLanding/DetailLanding"
import SignUp from "./SignUp/SignUp";
import { Route, Routes } from "react-router-dom";
import NewLanding from "./NewLanding/NewLanding";
import Home from "./Home";
import EditLanding from "./EditLanding/EditLanding";
import NewNeas from "./Neas/NewNeas/NewNeas"
import EditNeas from "./Neas/EditNeas/EditNeas"

class Main extends Component {
  render() {
    return (
      <div>
        <Routes>
          <Route element={<Home/>} path="/"/>
          <Route element={<Landings />} path="/landings" />
          <Route element={<NewLanding />} path="/new" />
          <Route element={<Listado />} path="/listado" />
          <Route element={<Neas />} path="/neas" />
          <Route element={<Details />} path="/nea/:designation" />
          <Route element={<DetailLanding />} path="/landing/:id" />
          <Route element={<EditLanding />} path="/editlanding/:id" />
          <Route element={<EditNeas />} path="/editneas/:id" />
          <Route element={<NewNeas />} path="/newneas" />
          <Route element={<SignUp />} path="/singnup" />

        </Routes>
        {/* <Neas /> */}
      </div>
    );
  }
}

export default Main;
