import React,{Component} from "react";
import {URL} from "../../util/url";
import "./Component1.css";

import PropTypes from "prop-types";

class Component1 extends Component{

  constructor(props){
    super(props);
    this.state={
      title:"HOLA",
      data:[],
      newEl:{
        title:"",
        description:"",
        num:0
      }
    };
    this.fun1=this.fun1.bind(this);
    this.addElement=this.addElement.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);    
  }

  getData(){
    fetch(`${URL}res1`,{
      method:"GET"
    }).then((response)=>{
      return response.json();
    }).then(json=>{
      console.log(json);
      this.setState({
        data:json
      });
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

  fun1(){
    console.log("HOLA");
  }

  componentDidMount(){
    this.fun1();
    this.getData();
  }

  handleChange(event) {
    let newState=this.state.newEl;
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    newState[name]=value;
    this.setState({
      newEl:newState
    });
  }
    
  handleSubmit(event) {
    console.log("A new val was submitted: ",this.state.newEl);
    event.preventDefault();
    this.addElement(this.state.newEl);

  }


  render()
  {
    const mapObjects= this.state.data.map(el=>(
      <div className="container" key={el._id}>
        <div className="row">
          <div className="col-12 col-sm-4 bg-danger">
            <p className="title">{el.title+":"+el.description}</p>
            <h6>{el.num}</h6>
            <p>{el.title.toString()}</p>
          </div>
        </div>
      </div>
    ));

    const addElement = (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input name="title" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={this.state.newEl.title} onChange={this.handleChange}/>
          <small id="emailHelp" className="form-text text-muted">We will never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <textarea name="description" className="form-control" id="exampleInputPassword1" placeholder="Password" value={this.state.newEl.description} onChange={this.handleChange}/>
        </div>
        <div className="form-group form-check">
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
          <input name="num" type="range" className="form-check-input" id="exampleCheck1" value={this.state.newEl.num} onChange={this.handleChange}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
    return(
      <div className="Hola" onClick={this.fun1}>
        {this.state.title}
        <p className="title">{this.props.description}</p>
        {addElement}
        <button className="btn btn-primary" onClick={()=>this.addElement()}>Add</button>
        {mapObjects}
      </div>
    );
  }
}

Component1.propTypes={
  description:PropTypes.any
};

export default Component1;