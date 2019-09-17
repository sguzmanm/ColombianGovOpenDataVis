import React,{Component} from "react";
import {URL} from "../../util/url";
import "./Component1.css";

import PropTypes from "prop-types";

import navio from "navio";


class Component1 extends Component{

  constructor(props){
    super(props);
    this.state={
      data:[],
      URL:''
    };

    this.myRef = React.createRef();

    this.setNavioData=this.setNavioData.bind(this);
    this.addElement=this.addElement.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);    
  }

  getData(){
    console.log("Fetch data");
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

  addElement(body){
    if(!body)
    {
      body={
        "title":"Coodfl",
        "description":"Desc",
        "num":3,
        "test":[
          {
            "TEST":"TEST"
          }
        ]
      };
    }
    fetch(`${URL}res1`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(body)
    }).then((response)=>{
      console.log(response);
      this.getData();

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
    console.log("A new val was submitted: ",this.state.newEl);
    event.preventDefault();
    this.getData();
    this.addElement(this.state.newEl);

  }


  render()
  {
    const addElement = (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="inputTitle">Your dataset</label>
          <input name="url" className="form-control" id="inputTitle" aria-describedby="help" placeholder="Enter email" value={this.state.url} onChange={this.handleChange}/>
          <small id="help" className="form-text text-muted">Please put the URL for getting data from DatosAbiertos</small>
        </div>
        <button type="submit" className="btn btn-primary">Get</button>
      </form>
    );
    return(
      <div className="container-fluid">
        {addElement}
        <div className="row">
          <div className="col-12 col-sm-6" style={{'text-align':'left'}} ref={this.myRef}>
          </div>
        </div>
        
      </div>
    );
  }
}

Component1.propTypes={
  description:PropTypes.any
};

export default Component1;