import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

function CardNeas(props) {

const neasdata = props.neadata

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
        <Card sx={{ maxWidth: 1000 }}>
        <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="https://media.istockphoto.com/photos/comet-an-asteroid-a-meteorite-falls-to-the-ground-against-a-starry-picture-id1073058750?k=20&m=1073058750&s=612x612&w=0&h=M1yx0G5R-5vBaXWmEcVIFMgJVR6ZVDiLGkoVDATlL0Y="
      />
       <CardContent>
      
      <Typography gutterBottom variant="h5" component="div">
        <Link to={`/nea/${neasdata.designation}`}>
          Nombre: <p>{neasdata.designation}</p>
        </Link>
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Datos:
        <p>{neasdata.discovery_date}</p>
        <p>{neasdata.orbit_class}</p>
        </Typography>
        </CardContent>
        <CardActions>
        <button onClick={removeNeas}>Delete</button>
        <button><Link to={`/editneas/${neasdata.designation}`}>Update</Link></button>
        </CardActions>
        </Card>
      </div>
   
  );
}

export default CardNeas;
