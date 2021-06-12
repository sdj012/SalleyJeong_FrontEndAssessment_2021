import React, { Component } from 'react';
import axios from 'axios';
import ContainerComponent from './ContainerComponent';
import RowComponent from './RowComponent.js';

class TestComplete extends React.Component {

  constructor(props){

    super(props);

    this.state={ 
     TestComplete:''
    }


  }


  render() {

      return(

        <div className="TestComplete-grid-container">
          <div>Complete!</div>
        </div>

      )
    }

}

export default TestComplete;

