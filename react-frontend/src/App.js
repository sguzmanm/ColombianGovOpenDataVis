import React from "react";
import "./App.css";

import Component1 from "./components/Component1/Component1.js";

function App() {
  return (
    <div className="App">
      <h1>Colombian Government Open Data Visualizator</h1>
      <p>Hi, for this prototype all you need to do is input an API link from: <a href="">Datos Abiertos</a> in the first field</p>
      <p>If you want to get meaningful stats from  any numeric fields please fill the second field with the name of that component in the data</p>
      {<Component1/>}
    </div>
  );
}

export default App;
