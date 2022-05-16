import "./App.css";
import React, { useState } from "react";
import Main from "./components/Main/Main";
import Header from "./components/Header/Header";
import { BrowserRouter } from "react-router-dom";
import { landingsContext } from "./context/landingscontext";
import {neasContext} from "./context/neascontext"
import "./styles/styles.scss";
function App() {
  const [landings, setLanding] = useState([]);
  const [neas, setNea] = useState([]);
  const set = (landing) => {
    setLanding(landing);
  };
  const save = (nea) => {
    setNea(nea);
  };

  const NeaObj={
    save,
    neas
  };

  const landingObj = {
    set,
    landings,
   
  };
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
      <neasContext.Provider value={NeaObj}>
      <landingsContext.Provider value={landingObj}>
          <Main />
        </landingsContext.Provider>
        </neasContext.Provider>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
