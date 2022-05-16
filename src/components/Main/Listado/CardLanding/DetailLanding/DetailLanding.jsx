import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from '@mui/material/CardMedia';

import Typography from "@mui/material/Typography";

// import { themeContext } from "../../../context/themeContext";
const DetailLanding = () => {
  const [landingdata, setlandingdata] = useState(null);
  // const { id } = useParams();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    async function fetchData() {
      console.log(id);
      try {
        const resp = await axios.get(`http://localhost:5000/api/astronomy/landings/id/${id}`);
        const data = await resp.data;
        console.log(data);
      

        setlandingdata(data);
        
      } catch (error) {
        console.log(error);
      }
      
    }

    fetchData(id);
    
  }, [id]);
  console.log("landing",landingdata);
  if (landingdata) {
    return (
      <div className="detailcs">
        
        
        {landingdata.map((data, index) =>
         <Card sx={{ maxWidth: 1000 }}>
         <CardMedia
         component="img"
         alt="green iguana"
         height="140"
         image="https://media.istockphoto.com/photos/comet-an-asteroid-a-meteorite-falls-to-the-ground-against-a-starry-picture-id1073058750?k=20&m=1073058750&s=612x612&w=0&h=M1yx0G5R-5vBaXWmEcVIFMgJVR6ZVDiLGkoVDATlL0Y="
       />
       <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        
          <li key={data.name} ></li>  
         <li>Name: {data.name}</li>
         </Typography>
          <Typography variant="body2" color="text.secondary">
         <li>ID: {data._id}</li>
         <li>Class: {data.recclass}</li>
         <li>Mass(weight): {data.mass}</li>
         <li>State: {data.fall}</li>
         <li>Year: {data.year}</li> 
         <li>Latitude: {data.reclat}</li>
         <li>Longitude: {data.reclong}</li>
         </Typography>
         </CardContent>
         </Card>
     
        )}
        
      
            
        
      </div>
    );
  }
};

export default DetailLanding;
