import React from 'react';
import './Main.css';

class TestComplete extends React.Component {

  constructor(props){

    super(props);

    this.state={ 
     TestComplete:''
    }

    this.reload=this.reload.bind(this);

  }

  reload=()=>{
    window.location.reload();
  }

  render() {

      return(

        <div className="TestComplete-grid-container">
          <div className="complete-message">You Win! <button onClick={this.reload}>Play Again</button></div>
        </div>

      )
    }

}

export default TestComplete;

