import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from '@mui/material/CardMedia';

import Typography from "@mui/material/Typography";

// import { themeContext } from "../../../context/themeContext";
const Details = () => {
  const [detailnea, setdetailnea] = useState(null);
 
  // const { id } = useParams();
  const params = useParams();
  const designation = params.designation;
  

  useEffect(() => {
    async function fetchData() {
      
      try {
        const resp = await axios.get(`http://localhost:5000/api/astronomy/neas/designation/${designation}`);
        const data = await resp.data;
        setdetailnea(data)
        console.log("hola", data);

     
      } catch (error) {
        console.log(error);
      }
    }

    fetchData(designation);
  }, [designation]);

  if (detailnea) {
    return (
      <div className="detailcs">
        <>
        {detailnea.map((data, index) =>
          <Card sx={{ maxWidth: 1600 }}>
          <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image="https://media.istockphoto.com/photos/comet-an-asteroid-a-meteorite-falls-to-the-ground-against-a-starry-picture-id1073058750?k=20&m=1073058750&s=612x612&w=0&h=M1yx0G5R-5vBaXWmEcVIFMgJVR6ZVDiLGkoVDATlL0Y="
        />
        <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Nombre y id: {data.designation}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tipo: {data.q_au_1}
                {data.q_au_2}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Peso :{data.period_yr}
              </Typography>
              {data.orbitclass}
              {data.h_mag}
              {data.moid_au}
              {data.discovery_date}

              {data.pha}
              Altura: {data.i_deg}
            </CardContent>
            <CardActions>
              {/* <Button size="small">Share</Button>
            <Button size="small">Learn More</Button> */}
            </CardActions>
          </Card>
        )}
        </>
      </div>
    );
  }
};

export default Details;
