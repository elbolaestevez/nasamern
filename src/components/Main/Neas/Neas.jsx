import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { neasContext } from "../../../context/neascontext";
import CardNeas from "./CardNeas/CardNeas";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Neas = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataneas, setSearch] = useState([]);
  const [datainput, setInput] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [run, setrun] = useState(null);
  let navigate = useNavigate();

  /*   const { neas, save } = useContext(neasContext); */

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      try {
        const resp = await axios.get(
          `http://localhost:5000/api/astronomy/neas/dates?1900`
        );
        const data = await resp.data;
        // const dataSliced = data.slice(0, 10);
        // console.log("meteorito", dataSliced);
        // save([
        //   ...neas,
        //   dataSliced])
        setSearch(data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const removeNeas = (i) => {
    const remainingNeas = dataneas.filter((nea, j) => i !== j);
    setSearch(remainingNeas);
  };

  const filters = {
    sortDesignation: (a,b) => a.designation > b.designation ? 1 : -1,
    sortDesignationdesc: (a,b) => a.designation < b.designation ? 1 : -1,
    sortYear: (a,b) => a.discovery_date > b.discovery_date ? 1 : -1,
    sortYeardesc: (a,b) => a.discovery_date < b.discovery_date ? 1 : -1,
    sortOrbit: (a,b) => a.orbit_class > b.orbit_class ? 1 : -1,
    sortOrbitdesc: (a,b) => a.orbit_class < b.orbit_class ? 1 : -1,
  }


  const handleSortDesignation = () => setSelectedFilter("sortDesignation")
  const handleSortDesignationdesc = () => setSelectedFilter('sortDesignationdesc')
  const handleSortYear = () => setSelectedFilter('sortYear')
  const handleSortYeardesc = () => setSelectedFilter('sortYeardesc')
  const handleSortOrbit = () => setSelectedFilter('sortOrbit');
  const handleSortOrbitdesc = () => setSelectedFilter('sortOrbitdesc');
 


  const onSubmit = (e) => {
    e.preventDefault();
    if(e.target.nombre.value){
      setInput(e.target.nombre.value)
        console.log("llega designation",e.target.nombre.value); 
    }
    e.target.reset()
  }
    const handleClearFilters = (e) => {
   
    // navigate("../neas", { replace: true });
    // window.location.reload(false);
   
      }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const encodeddataneas=encodeURIComponent(datainput);
          const resp = await axios.get(
          `http://localhost:5000/api/astronomy/neas/designation/${encodeddataneas}`)
          const data = await resp.data;
          setSearch(data)
        }catch (error) {
          console.log(error);
        }}
        fetchData();
        
         
          
         
        },[datainput])





  return !isLoading ? (
    


    
    <div className="listaneas">
      <div>
    
      <Button variant="contained" onClick={handleSortDesignation} color="success">
        Sort by A-Z Designation
      </Button>
     
      <Button variant="contained" onClick={handleSortDesignationdesc} color="success">
        Sort by Z-A Designation
      </Button>
      <Button variant="contained" onClick={handleSortYear} color="success">
        Sort by A-Z Year
      </Button>
      <Button variant="contained" onClick={handleSortYeardesc} color="success">
        Sort by Z-A Year
      </Button>
      <Button variant="contained" onClick={handleSortOrbit} color="success">
        Sort by A-Z orbit
      </Button>
      <Button variant="contained" onClick={handleSortOrbitdesc} color="success">
        Sort by Z-A orbit
      </Button>
      <Button variant="contained" onClick={handleClearFilters} color="success">
       Volver al listado inicial
      </Button>
      </div>
      <div className="busqueda">
      <form className="row" onSubmit={onSubmit}>
      <input placeholder="Buscar por nombre" name="nombre" />
      <Button variant="contained" endIcon={<SendIcon />} type="submit" ></Button>
    </form>
    </div>

      <>
        {selectedFilter
          ? dataneas
              .sort(filters[selectedFilter])
              .map((nea, i) => (
                <CardNeas key={i} neadata={nea} remove={() => removeNeas(i)} />
              ))
          : dataneas.map((nea, i) => (
              <CardNeas key={i} neadata={nea} remove={() => removeNeas(i)} />
            ))}
      </>
    </div>
  ) : (
    <div> Loading...</div>
  );
};

export default Neas;
