import React,{Component} from "react";
import "./Component1.css";

import PropTypes from "prop-types";

import navio from "navio";


class Component1 extends Component{

  constructor(props){
    super(props);
    this.state={
      data:[],
      URL:"",
      choice:""
    };

    this.myRef = React.createRef();

    this.setNavioData=this.setNavioData.bind(this);

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
  }


  render()
  {
    let choiceRenderer=null;
    if(this.state.choice!=="" && this.state.data.length!==0)
    {
      console.log(this.state.data);
      const numData=this.state.data.map(el=>{
        return el[this.state.choice];
      });
      const total=numData.reduce((a,b) => {
        console.log("OPT",a);
        return(
          parseInt(a,10) + parseInt(b,10)
        );
      });
      const average=  total/ this.state.data.length;
      choiceRenderer=(
        <div className="">
          <p>Total {total}</p>
          <p>Average {average}</p>
          <p>Min {Math.min(...numData) }</p>
          <p>Max {Math.max(...numData) }</p>
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
          <input name="choice" className="form-control" id="inputChoice" aria-describedby="choiceHelp" placeholder="Enter your numeric filed of choice" value={this.state.choice} onChange={this.handleChange}/>
          <small id="choiceHelp" className="form-text text-muted">Please put the URL for getting data from DatosAbiertos</small>
        </div>
        <button type="submit" className="btn btn-primary">Get</button>
      </form>
    );
    return(
      <div className="container-fluid">
        {addElement}
        <div className="row">
          <div className="col-12 col-sm-6" style={{"text-align":"left"}} ref={this.myRef}>
          </div>
          <div className="col-12 col-sm-6">
            {choiceRenderer}
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