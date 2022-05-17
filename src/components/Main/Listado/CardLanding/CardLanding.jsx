import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { landingsContext } from "../../../../context/landingscontext";
import { useNavigate } from "react-router-dom";

// function CardLanding({ objlanding: landing }) {
  function CardLanding(props) {
    const landing = props.objlanding
    const { landings, set } = useContext(landingsContext);
  //otra forma es poner props entre parentesis en cards y luego poner copiar ruta del name
  //props.poke[0].name

  const removeLanding = async () =>{
    try {
      console.log(landing._id);
      const res = await axios.delete(`http://localhost:5000/api/astronomy/landings/${landing._id}`);
      const data = await res.data;
      console.log(data);
      props.remove();
    } catch (error) {
      console.log(error);
    }   
  }

 



  
  return (
    <div className="card">
        <Card sx={{ maxWidth: 1000 }}>
        <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="https://media.istockphoto.com/photos/comet-an-asteroid-a-meteorite-falls-to-the-ground-against-a-starry-picture-id1073058750?k=20&m=1073058750&s=612x612&w=0&h=M1yx0G5R-5vBaXWmEcVIFMgJVR6ZVDiLGkoVDATlL0Y="
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
                <Link to={`/landing/${landing._id}`}>
                <li>Name: {landing.name}</li>
                </Link>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                <li>Mass(weight): {landing.mass}</li>
                
                <li>Year: {landing.year}</li> 
                </Typography>
                </CardContent>
              <CardActions>
                <button onClick={removeLanding}>Delete</button>
                
                {/* <button onClick={favouritelanding}>Add Favourite</button> */}
                <button><Link to={`/editlanding/${landing._id}`}>Update</Link></button>
                </CardActions>
                </Card>
                
             
              
      </div>
    
  );
}

export default CardLanding;