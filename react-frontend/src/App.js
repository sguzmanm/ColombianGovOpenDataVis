/* eslint-disable no-undef */

import React,{Component} from "react";
import "./App.css";

import NavioComponent from "./components/NavioComponent/NavioComponent.js";

class App extends Component{

  constructor(props){
    super(props);

    this.state={
      data:[], // Data from URL
      url:"", // Input URL from user
      choice:"", // Choice for showing stats of a numeric attribute
      numPage:1, // Number of page consulted through URL
      finished:false, // Is the request finished or not?
      loading:false // Is the page loading or not?
    };

    this.navioContainerRef = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);    
  }

  /**
   * "Promesify" setTimeout wih given ms
   * @param {*} ms Miliseconds
   */
  timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Get data in an async manner to allow the use of waits
   */
  async getData(){
    // Number of registries and timeout time expected per request
    const numRegistries=100;
    const timeoutTime=100;
    // Reset state
    this.setState({
      data:[],
      finished:false
    });
    // Ver for finishing loop
    let localEnd=false;
    try{

      while(!localEnd)
      {
        let req=await fetch(`${this.state.url}?$limit=${numRegistries}&$offset=${(this.state.numPage-1)*numRegistries}`,{
          method:"GET"
        });

        let currentData=await req.json();

        if(currentData.length===0)
        {
          // The request is finished
          localEnd=true;
          this.setState({
            loading:false,
            finished:true
          });
          this.navioContainerRef.current.updateComponent();
        }
        else
        {
          // Make a new request
          await this.timeout(timeoutTime);
          this.setState({
            data:this.state.data.concat(currentData),
            numPage:this.state.numPage+1
          });
        }
      }
    }
    catch(e)
    {
      console.error(e);
      this.setState({
        loading:false,
        finished:true
      });
    }
  }

  // Change of form
  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]:value
    });
  }
    
  // Form submission
  handleSubmit(event) {
    if(this.state.loading)
      return;
    event.preventDefault();
    this.setState({
      loading:true,
      numPage:1    
    });
    this.getData();
  }


  render()
  {
    // Config data
    const numData=this.state.data.map(el=>{
      return el[this.state.choice];
    }).filter((el)=>!isNaN(el));

    // Render stats from user choice
    let choiceRenderer=null;

    if(numData.length!==0 && this.state.finished && this.state.choice!=="" && this.state.data.length!==0)
    {
      const sum=numData.reduce((a,b) => {
        return(
          parseFloat(a) + parseFloat(b)
        );
      });
      const average=  sum/ numData.length;
      choiceRenderer=(
        <div className="col-12 col-sm-6">
          <h4>{this.state.choice} stats</h4>
          <p>Sum {sum}</p>
          <p>Average {average}</p>
          <p>Min {Math.min(...numData) }</p>
          <p>Max {Math.max(...numData) }</p>
          <p>Numeric data {numData.length}</p>
        </div>
      );
    } 

    if(numData.length===0 && this.state.choice!=="" && this.state.finished)
    {
      choiceRenderer=(
        <div className="col-12 col-sm-6">
          <h4>User numeric {this.state.choice} stats are not available</h4>
        </div>
      );
    }
    
    // Add form
    const addElement = (
      <div className="row">
        <div className="col-12">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="inputTitle">Your dataset</label>
              <input required name="url" className="form-control" id="inputTitle" aria-describedby="help" placeholder="Enter your url" value={this.state.url} onChange={this.handleChange}/>
              <small id="help" className="form-text text-muted">Please put the URL for getting data from DatosAbiertos</small>

              <label htmlFor="inputChoice">Your numeric field of choice</label>
              <input name="choice" className="form-control" id="inputChoice" aria-describedby="choiceHelp" placeholder="Enter your numeric field of choice" value={this.state.choice} onChange={this.handleChange}/>
              <small id="choiceHelp" className="form-text text-muted">Please put the numeric attribute you want to get stats from</small>
            </div>
            <button type="submit" className="btn btn-primary">
              {this.state.loading?<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>:<span></span>}
              {this.state.loading?"Loading... Page "+this.state.numPage:"Get"}
            </button>
          </form>
        </div>
      </div>
    );

    // Display content
    let content=null;
    if(this.state.finished)
    {
      content=(
        <div className="row">
          <NavioComponent show={this.state.finished} data={this.state.data} ref={this.navioContainerRef}/>
          {choiceRenderer}
        </div>
      );
    }

    // Render
    return(
      <div className="App">
        <h1>Colombian Government Open Data Visualizator</h1>
        <p>Hi, for this prototype all you need to do is input an API link from: <a href="https://datos.gov.co/">Datos Abiertos</a> in the first field</p>
        <p>If you want to get meaningful stats from  any numeric fields please fill the second field with the name of that component in the data</p>
        <div className="container-fluid">
          {addElement}
          {content}
        </div>
      </div>
    );
  }
}

export default App;
