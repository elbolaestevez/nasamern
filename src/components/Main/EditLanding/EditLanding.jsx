import React, { useContext } from "react";
import { landingsContext } from "../../../context/landingscontext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignupSchema = yup.object().shape({
  name: yup.string().required(),
  id: yup.string().required(),
  recclass:  yup.string().required(),
  mass:yup.string().required(),
  fall:yup.string().required(),
  year: yup.date().required(),
  reclat: yup.string().required(),
  reclong: yup.string().required()

});

function EditLanding() {
  const { landings, set } = useContext(landingsContext);
  let navigate = useNavigate();
  const params = useParams();
  const id = params.id;

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
    
    // axios({
    //   url:`http://localhost:5000/api/astronomy/landings/create`,
    //   method:"post",
    //   data:{
    //     name:"guille",
    //     id:"5",
    //     recclass:"fall",    
    //     mass:"720",
    //     fall:"hola",
    //     year: "1910",
    //     reclat:"10",
    //     reclong:"10"
        
    // }



    // })
    console.log(id)
    const res = await axios.put(`http://localhost:5000/api/astronomy/landings/${id}`,data);


  
    



    // setTimeout(function () {
    //   return navigate("../listado", { replace: true });
    // }, 1000);
  };

  return (
    <div id="box">
      <form className="formNew" onSubmit={handleSubmit(onSubmit) }>
        <div>
          <h1>Modifica tu Landing</h1>
          <label>Name</label>
          <input {...register("name", { minLength: 3 })} />
          {errors.name && <p>{errors.name}</p>}
        </div>

        <div>
          <label>id</label>
          <input type="number" {...register("id", { valueAsNumber: true })} />
          {errors.id && <p>{errors.id.message}</p>}
        </div>
        <div>
          
          <label>Class</label>
          <input {...register("recclass", { minLength: 3 })} />
          {errors.recclass&& <p>{errors.recclass.message}</p>}
        </div>
        <div>
          <label>Mass</label>
          <input type="mass" {...register("mass", { valueAsNumber: true })} />
          {errors.mass && <p>{errors.mass.message}</p>}
        </div>
        <div>
          
          <label>State</label>
          <input {...register("fall", { minLength: 3 })} />
          {errors.fall && <p>{errors.fall.message}</p>}
        </div>
        <div>
          <label>Year</label>
          <input type="date" {...register("year")} />
          {errors.date && <p>{errors.date.message}</p>}
        </div>
        <div>
          <label>latitude</label>
          <input type="number" {...register("reclat", { valueAsNumber: true })} />
          {errors.reclat && <p>{errors.reclat.message}</p>}
        </div>
        <div>
          <label>longitude</label>
          <input type="number" {...register("reclong", { valueAsNumber: true })} />
          {errors.reclong && <p>{errors.reclong.message}</p>}
        </div>
      
        
        <input type="submit" />
      </form>
    </div>
  );
}
export default EditLanding;
