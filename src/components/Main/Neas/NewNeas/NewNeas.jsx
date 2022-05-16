import React, { useContext } from "react";
import { neasContext } from "../../../../context/neascontext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignupSchema = yup.object().shape({
  designation: yup.string().required(),
  discovery_date: yup.date().required(),
  h_mag: yup.string().required(),
  moid_au:yup.string().required(),
  q_au_1:yup.string().required(),
  q_au_2: yup.string().required(),
  period_yr: yup.string().required(),
  i_deg: yup.string().required(),
  pha: yup.string().required(),
  orbit_class: yup.string().required()



});

function NewNeas() {
  const { neas, save } = useContext(neasContext);
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignupSchema),
  });
  const onSubmit = async (data) => {
    console.log(data);
    alert(JSON.stringify(data));
    // set([
    //   ...landings,
    //   {
    //     name:data.name,
    //     id:data.id,
    //     recclass:data.recclass,    
    //     mass:data.mass,
    //     fall:data.fall,
    //     year: data.year,
    //     reclat:data.reclat,
    //     reclong:data.reclong
    // }
    // ]);
    const res = await axios.post(`http://localhost:5000/api/astronomy/neas/create`,data)
    
 



    // const res = await axios.post(`http://localhost:5000/api/astronomy/landings/create`,data);
  
    



    // setTimeout(function () {
    //   return navigate("../listado", { replace: true });
    // }, 1000);
  };

  return (  
    <div id="box">
      <form className="formNew" onSubmit={handleSubmit(onSubmit) }>
        <div>
          <h1>Crea tu Landing</h1>
          <label>designation</label>
          <input {...register("designation", { minLength: 3 })} />
          {errors.designation && <p>{errors.designation}</p>}
        </div>
        <div>
         
          <label>Discovery date</label>
          <input type="date"{...register("discovery_date", { minLength: 3 })} />
          {errors.discovery_date && <p>{errors.discovery_date}</p>}
        </div>

        <div>
          <label>h_mag</label>
          <input type="number" {...register("h_mag", { valueAsNumber: true })} />
          {errors.h_mag && <p>{errors.h_mag.message}</p>}
        </div>
        <div>
          
          <label>moid_au</label>
          <input type="number"{...register("moid_au", { minLength: 3 })} />
          {errors.moid_au&& <p>{errors.moid_au.message}</p>}
        </div>
        <div>
          <label>q_au_1</label>
          <input type="number" {...register("q_au_1", { valueAsNumber: true })} />
          {errors.q_au_1 && <p>{errors.q_au_1.message}</p>}
        </div>
        <div>
          
          <label>q_au_2</label>
          <input type="number"{...register("q_au_2", { minLength: 3 })} />
          {errors.q_au_2 && <p>{errors.q_au_2.message}</p>}
        </div>
        <div>
          <label>Year</label>
          <input type="number" {...register("period_yr")} />
          {errors.period_yr && <p>{errors.period_yr.message}</p>}
        </div>
        <div>
          <label>i_deg</label>
          <input type="number" {...register("i_deg", { valueAsNumber: true })} />
          {errors.i_deg && <p>{errors.i_deg.message}</p>}
        </div>
        <div>
          <label>Pha</label>
          <input {...register("pha", { valueAsNumber: true })} />
          {errors.pha && <p>{errors.pha.message}</p>}
        </div>
        <div>
          <label>orbit_class</label>
          <input  {...register("orbit_class", { valueAsNumber: true })} />
          {errors.orbit_class && <p>{errors.orbit_class.message}</p>}
        </div>
      
        
        <input type="submit" />
      </form>
    </div>
  );
}
export default NewNeas;
