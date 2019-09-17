import React from 'react';
import './App.css';

import Component1 from './components/Component1/Component1.js'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Home() {
  return <h2>Home</h2>;
}

function Topic({ match }) {
  return <h3>Requested Param: {match.params.id}</h3>;
}

const routes=()=>{
  return(
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/comp1/">Component 1</Link>
                </li>
                <li>
                  <Link to="/topics/1">Topic 1</Link>
                </li>
              </ul>
            </nav>
    
            <Route path="/" exact component={Home} />
            <Route path="/comp1/" component={()=><Component1 description="HOla hola hola"/>} />
            <Route path="/topics/:id" component={Topic} />
          </div>
        </Router>
      );
    }

function App() {
  return (
    <div className="App">
      {routes()}
    </div>
  );
}

export default App;
