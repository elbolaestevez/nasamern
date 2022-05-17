import React, { useEffect, useState,useContext } from "react";
import axios from "axios";
import { landingsContext } from "../../../context/landingscontext"
import { MapContainer, TileLayer,Marker,Popup } from "react-leaflet";
import "./Landings.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import meteorito from "../../../assets/meteorito.png"

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';



const Landings = () => {
  const [search, setValue] = useState(null);
  const { landings, set } = useContext(landingsContext);
  const [inputmass, setSearchMass] = useState(null);
  const [datamass, setMass] = useState(null);
  const [minmass, setMinMass]=useState(null)

  const onSubmit = (e) => {
    e.preventDefault();
    if(e.target.nombre.value){
    setSearchMass(e.target.nombre.value)
    setMinMass("")
                   }
    else if(e.target.nombreclase.value){
      
     setSearchMass(e.target.nombreclase.value)
      setValue(e.target.nombreclase.value)
      console.log("clase",e.target.nombreclase.value);
      setMinMass("")

    }
    else{
        
        setMinMass(e.target.selection.value)
        console.log("masaminima",e.target.selection.value);
        setValue("")
        setSearchMass("")
    }
    e.target.reset()

  };
 

  const asteroidIcon = new L.Icon({
    iconUrl: meteorito,
    iconAnchor: null,
    popupAnchor: [0, -10],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(40, 40)
  });




useEffect(() => {
  const fetchData = async () => {
    try {
      console.log("que llego",inputmass);
      console.log("que llego",search);
      console.log("que llego",minmass);

     
      
      if (inputmass>0) {
        console.log("numero", inputmass);
      const resp = await axios.get(
        `http://localhost:5000/api/astronomy/landings/mass/${inputmass}`)
        const data = await resp.data;
        console.log(data);
       
        setMass(data)
        set(data)
        
       
      }
       else if(search){
        //  console.log(inputmass);
        const resp = await axios.get(
          `http://localhost:5000/api/astronomy/landings/class/${search}`)
          const data = await resp.data;
          const dataSliced = data.slice(0,10);
          console.log("classs",dataSliced);
         
          setMass(dataSliced)
          set(dataSliced)

      }
      else if(minmass>1){
        //  console.log(inputmass);
        const resp = await axios.get(
          `http://localhost:5000/api/astronomy/landings?minimum_mass=${minmass}`)
          const data = await resp.data;
          const dataSliced = data.slice(0,50);
          console.log("masaminima",dataSliced);
         
          setMass(dataSliced)
          set(dataSliced)
          

      }
      else {
        const resp = await axios.get(
          `http://localhost:5000/api/astronomy/landings?minimum_mass=0`
        );
        const data = await resp.data;
        // const dataSliced = data.slice(0,100);
        // console.log("meteorito",dataSliced);
        // set([
        //   ...landings,
        //   dataSliced])
        // setValue(dataSliced);
        setMass(data)
        set(data)
        

      }

      
     
    } catch (error) {
      console.log(error);
    }
  }

  fetchData();
 
 
  console.log("datamass",datamass);
}, [inputmass,minmass]);



if(datamass){
  
return(
<>

        <form className="row" onSubmit={onSubmit}>
          <input placeholder="Buscar Masa" name="nombre" />
          <input placeholder="Buscar Clase" name="nombreclase" />
          <label for="quantity">Seleccione la masa minima</label>
          <select id="quantity" name="selection">
              <option value="0">0 </option>
              <option value="100">100 </option>
              <option value="200">200</option>
              <option value="500">500</option>
              <option value="1000">1000</option>
              <option value="2000">2000</option>
              <option value="5000">5000</option>
              <option value="10000">10000</option>
              <option value="20000">20000</option>
             
              <option value="100000">100000</option>
              <option value="400000">400000</option>
          </select>
          <input type="submit" >
          </input>
        </form>
       
        <div className="lista">
      <MapContainer center={[51.505, -0.09]} zoom={5}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
         {datamass.map((data, i) =>
          data.reclat ? (
            <Marker
              key={i}
              position={[data.reclat, data.reclong]}
              icon={asteroidIcon}
            >
              <Popup>Asteroid details:
                 <ul>
                
                  <li>Name: {data.name}</li>
                  <li>ID: {data._id}</li>
                  <li>Class: {data.recclass}</li>
                  <li>Mass(weight): {data.mass}</li>
                  <li>State: {data.fall}</li>
                  <li>Year: {data.year}</li> 
                  <li>Latitude: {data.reclat}</li>
                  <li>Longitude: {data.reclong}</li>
                </ul>
              </Popup>
            </Marker>
            ) : null

            )}
      
      </MapContainer>
    </div>
      


</>

          

)}};















          
  
    


export default Landings;
