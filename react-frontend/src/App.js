import React,{Component} from "react";
import "./App.css";

import Component1 from "./components/Component1/Component1.js";

class App extends Component{

  constructor(props){
    super(props);
    this.state={
      data:[],
      url:"",
      choice:"",
      numPage:1,
      finished:false,
      loading:false
    };

    this.navioContainerRef = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);    
  }

  timeout(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getData(){
    const numRegistries=100
    this.setState({
      data:[],
      finished:false
    })

    let localEnd=false
    try{
      while(!localEnd)
      {
        let req=await fetch(`${this.state.url}?$limit=${numRegistries}&$offset=${(this.state.numPage-1)*numRegistries}`,{
          method:"GET"
        });

        let currentData=await req.json()

        if(currentData.length===0)
        {
          localEnd=true;
          this.setState({
            loading:false,
            finished:true
          })
          this.navioContainerRef.current.updateComponent()
        }
        else
        {
          await this.timeout(100)
          this.setState({
            data:this.state.data.concat(currentData),
            numPage:this.state.numPage+1
          })
        }
      }
    }
    catch(e)
    {
      this.setState({
        loading:false,
        finished:true
      })
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]:value
    });
  }
    
  handleSubmit(event) {
    if(this.state.loading)
      return;
    event.preventDefault();
    this.setState({
      loading:true,
      numPage:1    
    })
    this.getData();
  }


  render()
  {
    let choiceRenderer=null;
    const numData=this.state.data.map(el=>{
      return el[this.state.choice];
    }).filter((el)=>!isNaN(el));

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
          <p>Sum {sum}</p>
          <p>Average {average}</p>
          <p>Min {Math.min(...numData) }</p>
          <p>Max {Math.max(...numData) }</p>
          <p>Numeric data {numData.length}</p>
        </div>
      );
    }
    
    const addElement = (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="inputTitle">Your dataset</label>
          <input required name="url" className="form-control" id="inputTitle" aria-describedby="help" placeholder="Enter your url" value={this.state.url} onChange={this.handleChange}/>
          <small id="help" className="form-text text-muted">Please put the URL for getting data from DatosAbiertos</small>

          <label htmlFor="inputChoice">Your numeric field of choice</label>
          <input name="choice" className="form-control" id="inputChoice" aria-describedby="choiceHelp" placeholder="Enter your numeric field of choice" value={this.state.choice} onChange={this.handleChange}/>
          <small id="choiceHelp" className="form-text text-muted">Please put the URL for getting data from DatosAbiertos</small>
        </div>
        <button type="submit" className="btn btn-primary">
          {this.state.loading?<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>:<span></span>}
          {this.state.loading?'Loading... Page '+this.state.numPage:'Get'}
        </button>
      </form>
    );

    // Display content
    let content=null;
    if(this.state.finished)
    {
      content=(
        <div className="row">
          <Component1 show={this.state.finished} data={this.state.data} ref={this.navioContainerRef}/>
          {choiceRenderer}
        </div>
      )
    }

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
