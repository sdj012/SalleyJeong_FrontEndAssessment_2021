import React from 'react';
import './Main.css';

class NextButton extends React.Component {

  constructor(props){

    super(props);
    

    this.enter=this.enter.bind(this);
  }

  enter=(e)=>{
    this.props.callPaginate(e);
  }

  render() {

      return(

        <div className="NextButton-grid-container">
          <button className="next" ref={(nb)=> this["buttonInput"] = nb} onClick={this.enter} onKeyDown={this.enter}>Next</button>
        </div>

      )
    }

}

export default NextButton;

