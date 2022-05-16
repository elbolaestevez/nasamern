import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { neasContext } from "../../../context/neascontext";
import CardNeas from "./CardNeas/CardNeas";

const Neas = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataneas, setSearch] = useState([]);
  const [datainput, setInput] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);

  /*   const { neas, save } = useContext(neasContext); */

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const resp = await axios.get(
          `http://localhost:5000/api/astronomy/neas/dates?1900`
        );
        const data = await resp.data;
        const dataSliced = data.slice(0, 10);
        console.log("meteorito", dataSliced);
        // save([
        //   ...neas,
        //   dataSliced])
        setSearch(dataSliced);
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


  const handleSortDesignation = () => setSelectedFilter('sortDesignation')
  const handleSortDesignationdesc = () => setSelectedFilter('sortDesignationdesc')
  const handleSortYear = () => setSelectedFilter('sortYear')
  const handleSortYeardesc = () => setSelectedFilter('sortYeardesc')
  const handleSortOrbit = () => setSelectedFilter('sortOrbit');
  const handleSortOrbitdesc = () => setSelectedFilter('sortOrbitdesc');
  const handleClearFilters = () => setSelectedFilter(null)


  const onSubmit = (e) => {
    e.preventDefault();
    if(e.target.nombre.value){
      setInput(e.target.nombre.value)
        console.log("llega designation",e.target.nombre.value); 
    }}


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
    


    
    <div className="list">
      <button onClick={handleSortDesignation} variant="outlined">
        Sort by A-Z Designation
      </button>
      <button onClick={handleSortDesignationdesc} variant="outlined">
        Sort by Z-A Designation
      </button>
      <button onClick={handleSortYear} variant="outlined">
        Sort by A-Z Year
      </button>
      <button onClick={handleSortYeardesc} variant="outlined">
        Sort by Z-A Year
      </button>
      <button onClick={handleSortOrbit} variant="outlined">
        Sort by A-Z orbit
      </button>
      <button onClick={handleSortOrbitdesc} variant="outlined">
        Sort by Z-A orbit
      </button>
      <button onClick={handleClearFilters} variant="outlined">
        No Sort Method
      </button>
      <form className="row" onSubmit={onSubmit}>
      <input placeholder="Buscar por nombre" name="nombre" />
      <input type="submit" ></input>
    </form>

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
