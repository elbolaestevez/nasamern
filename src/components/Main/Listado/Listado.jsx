import React, { useContext, useState, useEffect } from "react";

import Pagination from '@mui/material/Pagination'
import CardLanding from "./CardLanding/CardLanding"
import { landingsContext } from "../../../context/landingscontext";
import usePagination from "../../../hooks/paginate";
import axios from "axios";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';


function Listado() {
  const { landings, set } = useContext(landingsContext);
  const [inputname, setSearchName] = useState([]);
  const [selectedFilterr, setSelectedFilterr] = useState(null);
  

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
    
    setSelectedFilterr(sortedData)
  } 
  const onSubmit = (e) => {
    e.preventDefault();
    if(e.target.nombre.value){
      setSearchName(e.target.nombre.value)
        console.log("llega masa",e.target.nombre.value); 
    }}
  // useEffect(() => {
    
   
  // }, [landings]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
  
       
        
        
        const resp = await axios.get(
          `http://localhost:5000/api/astronomy/landings/name/${inputname}`)
          const data = await resp.data;
          set(data)
       
         
        }catch (error) {
          console.log(error);
        }}
        fetchData();
         
          
         
        },[inputname])

  // const onSubmit = (e) => {

    
   
   
  // }


  console.log(landings);
 
  return (
    <div className="lista">
      <div className="titulo">
      <Button variant="contained" onClick={handleSort} color="success">Sort A-Z name</Button>
      {/* <button onClick={handleSortdate} variant="outlined">Sort A-Z date</button>
      <button onClick={handleSortmass} variant="outlined">Sort A-Z mass</button> */}
      <form className="row" onSubmit={onSubmit}>
          <input placeholder="Buscar por nombre" name="nombre" />
          <Button variant="contained" endIcon={<SendIcon />} type="submit" ></Button>
      </form>
      
       <Pagination
        count={count}
        size="large"
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />
      </div>
     
      <div className="listado">
        {landings.length !== 0
          ? _DATA.currentData().map((landing, i) => <CardLanding key={i} objlanding={landing} remove={()=>removeLanding(i)}  />)
          : ""}
      </div>
    </div>
  );
}

export default Listado;
