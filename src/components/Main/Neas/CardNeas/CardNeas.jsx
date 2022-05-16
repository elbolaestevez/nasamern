import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function CardNeas(props) {
const neasdata=props.neadata

  const removeNeas = async () =>{
    try {
      // console.log(landing._id);
      console.log(neasdata._id);
      const res = await axios.delete(`http://localhost:5000/api/astronomy/neas/${neasdata._id}`);
      const data = await res.data;
      console.log(data);
      props.remove();
    } catch (error) {
      console.log(error);
    }   
  }
  //otra forma es poner props entre parentesis en cards y luego poner copiar ruta del name
  //props.poke[0].name
  return (
    <div className="pokemon-card">
      
      <div className="card-body">
        <Link to={`/nea/${neasdata.designation}`}>
          Nombre: <p>{neasdata.designation}</p>
        </Link>
       
        Datos:
        <p>{neasdata.discovery_date}</p>
        <p>{neasdata.orbit_class}</p>
        <button onClick={removeNeas}>Delete</button>
        <button><Link to={`/editneas/${neasdata.designation}`}>Update</Link></button>
        
      </div>
    </div>
  );
}

export default CardNeas;
