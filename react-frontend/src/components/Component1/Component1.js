import React,{Component} from "react";
import "./Component1.css";

import PropTypes from "prop-types";

import navio from "navio";


class Component1 extends Component{

  constructor(props){
    super(props);

    this.navioRef = React.createRef();
  }

  updateComponent()
  {
    if(!this.props.data || this.props.data.length===0)
      return;

    let nv= navio(this.navioRef.current, 1000);

    // NAVIO Step 2. Load your data!
    nv.data(this.props.data);

    // NAVIO Step 3. Detect your attributes (or load them manually)
    nv.addAllAttribs();
  }

  render()
  {
    return(
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-sm-6" style={{textAlign:"left"}} ref={this.navioRef}>
          </div>
        </div>
      </div>
    );
  }
}

Component1.propTypes={
  data:PropTypes.array
};

export default Component1;