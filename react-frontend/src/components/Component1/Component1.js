import React,{Component} from "react";
import "./Component1.css";

import PropTypes from "prop-types";

import navio from "navio";


class Component1 extends Component{

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

    this.myRef = React.createRef();

    this.setNavioData=this.setNavioData.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);    
  }

  timeout(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getData(){
    console.log("Fetch data");
    const numRegistries=100
    
    try{
      while(!this.state.finished)
      {
        let req=await fetch(`${this.state.url}?$limit=${numRegistries}&$offset=${(this.state.numPage-1)*numRegistries}`,{
          method:"GET"
        });

        let currentData=await req.json()

        console.log("DATA",currentData,this.state.numPage);
        if(currentData.length===0)
        {
          this.setState({finished:true})
        }
        else
        {
          this.setState({
            data:this.state.data.concat(currentData),
            numPage:this.state.numPage+1
          })
          console.log("Start")
          console.log(this.state.data)
          await this.timeout(100)
          console.log("Time")
        }
      }
    }
    catch(e)
    {
      console.error(e);
    }
    
    fetch(this.state.url,{
      method:"GET"
    }).then((response)=>{
      return response.json();
    }).then(json=>{
      console.log(json);
      this.setState({
        data:json
      });
      this.setNavioData();
    }).catch((err)=>{
      console.error(err);
    });
  }

  setNavioData(){
    console.log("SET DATA");
    let nv= navio(this.myRef.current, 600);

    // NAVIO Step 2. Load your data!
    nv.data(this.state.data);

    // NAVIO Step 3. Detect your attributes (or load them manually)
    nv.addAllAttribs();

    this.setState({
      loading:false    
    })

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
    console.log("A new val was submitted: ",this.state.newEl);
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
    if(this.state.finished && this.state.choice!=="" && this.state.data.length!==0)
    {
      console.log(this.state.data);
      const numData=this.state.data.map(el=>{
        return el[this.state.choice];
      }).filter((el)=>!isNaN(el));

      const sum=numData.reduce((a,b) => {
        console.log("OPT",a,parseFloat(a));
        return(
          parseFloat(a) + parseFloat(b)
        );
      });
      console.log(sum,numData.length)
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
          <input name="url" className="form-control" id="inputTitle" aria-describedby="help" placeholder="Enter your url" value={this.state.url} onChange={this.handleChange}/>
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

    let content=null;

    if(this.state.finished)
    {
      content=(
        <div className="row">
          <div className="col-12 col-sm-6" style={{textAlign:"left"}} ref={this.myRef}>
          </div>
          {choiceRenderer}
        </div>
      )
    }

    return(
      <div className="container-fluid">
        {addElement}
        {content}
      </div>
    );
  }
}

Component1.propTypes={
  description:PropTypes.any
};

export default Component1;