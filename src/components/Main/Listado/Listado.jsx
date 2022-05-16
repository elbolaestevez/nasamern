import React, { useContext, useState, useEffect } from "react";

import Pagination from '@mui/material/Pagination'
import CardLanding from "./CardLanding/CardLanding"
import { landingsContext } from "../../../context/landingscontext";
import usePagination from "../../../hooks/paginate";
import axios from "axios";


function Listado() {
  const { landings, set } = useContext(landingsContext);
  const [inputname, setSearchName] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null);

  let [page, setPage] = useState(1);
  const PER_PAGE = 24;

  const count = Math.ceil(landings.length / PER_PAGE);
  const _DATA = usePagination(landings, PER_PAGE);


  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
    
  };
  const removeLanding = (i) =>{
    const remainingLandings = landings.filter((landing,j)=>i!==j)
    set(remainingLandings);
  }

  function handleSort() {
    const sortedData = landings.sort((a,b)=>{
      return a.name > b.name ? 1: -1
    })
    setSelectedFilter(sortedData)
    
   
   
  } 
  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   if(e.target.nombre.value){
  //     setSearchName(e.target.nombre.value)
  //       console.log("llega masa",e.target.nombre.value); 
  //   }}
  // useEffect(() => {
    
   
  // }, [landings]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
        
  
       
        
        
  //       const resp = await axios.get(
  //         `http://localhost:5000/api/astronomy/landings/name/${inputname}`)
  //         const data = await resp.data;
  //         set(data)
       
         
  //       }catch (error) {
  //         console.log(error);
  //       }}
  //       fetchData();
         
          
         
  //       },[inputname])

  // const onSubmit = (e) => {

    
   
   
  // }


  console.log(landings);
 
  return (
    <div className="list">
      <button onClick={handleSort} variant="outlined">Sort</button>
      {/* <form className="row" onSubmit={onSubmit}>
          <input placeholder="Buscar por nombre" name="nombre" />
          <input type="submit" ></input>
      </form> */}
       <Pagination
        count={count}
        size="large"
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />
     
      <>
        {landings.length !== 0
          ? _DATA.currentData().map((landing, i) => <CardLanding key={i} objlanding={landing} remove={()=>removeLanding(i)}  />)
          : ""}
      </>
    </div>
  );
}

export default Listado;
