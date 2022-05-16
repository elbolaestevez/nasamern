import React, { useEffect, useState,useContext } from "react";
import axios from "axios";
import { neasContext } from "../../../context/neascontext";
import CardNeas from "./CardNeas/CardNeas";

const Neas = () => {
  const [dataneas, setSearch] = useState([]);
  const {neas, save}=useContext(neasContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get(
          `http://localhost:5000/api/astronomy/neas/dates?1900`
        );
        const data = await resp.data;
        const dataSliced = data.slice(0,10);
        console.log("meteorito",dataSliced);
        // save([
        //   ...neas,
        //   dataSliced])
        setSearch(dataSliced);
        
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    console.log(dataneas);
  }, []);



  const removeNeas = (i) =>{
    const remainingNeas = dataneas.filter((nea,j)=>i!==j)
    setSearch(remainingNeas);
  }




  function handleSortDesignation() {
    
    const sortedData = dataneas.sort((a,b)=>{
      return a.designation > b.designation ? 1: -1
    })
    setSearch(sortedData)
    console.log(sortedData)
    
   
   
  } 
  function handleSortYear() {
    const sortedDataYear = dataneas.sort((a,b)=>{
      return a.discovery_date > b.discovery_date ? 1: -1
    })
    setSearch(sortedDataYear)
    
   
   
  } 
  function handleSortOrbit() {
    const sortedDataOrbit = dataneas.sort((a,b)=>{
      return a.orbit_class > b.orbit_class ? 1: -1
    })
    save(sortedDataOrbit)
    
   
   
  } 

if(dataneas){
  return (<div className="list">
<button onClick={handleSortDesignation} variant="outlined">Sort by A-Z Designation</button>
<button onClick={handleSortYear} variant="outlined">Sort by A-Z Year</button>
<button onClick={handleSortOrbit} variant="outlined">Sort by A-Z orbit</button>
    
  <>
   
       {dataneas.map((nea, i) => <CardNeas key={i} neadata={nea} remove={()=>removeNeas(i)}/>)}
     
  </>
</div>


  )

    }
}


export default Neas;
