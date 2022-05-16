import React from "react";
import { Link } from "react-router-dom";


function Nav() {
  return (
    <nav className="nav">
      {/* <Link to="/">Home</Link> */}
      <Link to="/">HOME</Link>
      <Link to="/landings">Landings</Link>
      <Link to="/new">Crear Landing</Link>
      <Link to="/neas">Neas</Link>
      <Link to="/listado">Listado</Link>
      <Link to="/newneas">Crear Neas</Link>
      {/* <Link to="/neas">NEAs</Link> */}
    </nav>
  );
}

export default Nav;
