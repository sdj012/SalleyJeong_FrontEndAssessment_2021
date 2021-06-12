import React, { Component } from 'react';
import axios from 'axios';
import './Main.css';
import ContainerComponent from './ContainerComponent';
import Blurb from './Blurb';
import TestComplete from './TestComplete';

class Main extends React.Component {

  constructor(props){

    super(props);

    this.state={ 
      pagination:1,
      sentence:'',
      score:0,
      scrambled:'',
      scrambledMiddle:'',
      gameComplete:false,
      markBlockComplete:false,
    }
  
    this.getData=this.getData.bind(this);
    this.setSentence=this.setSentence.bind(this);
    this.returnSentence=this.returnSentence.bind(this);
    this.markBlockComplete=this.markBlockComplete.bind(this);

  }

  setSentence=(data)=>{

    this.setState({
      sentence:data,
    })

  }


  returnSentence=()=>{ 
    return this.state.sentence;
  }

  paginate=(e)=>{
    
    e.preventDefault();
    this.setState({
      pagination:this.state.pagination+1,
      markBlockComplete:false,
    },function(){
      this.getData();
    })

  }

  getData=()=>{
    axios.get("https://api.hatchways.io/assessment/sentences/" + this.state.pagination)
    .then(response => this.setSentence(response["data"]["data"]["sentence"]));
  }

  componentDidMount=()=>{
    this.getData();
  }


  markBlockComplete=(isComplete)=>{

    if(isComplete){

      this.setState({
        markBlockComplete:true,
        score:this.state.score+1
      })

    }

  }

  render() {

    if(this.state.score<10){

      return(

        <div className="main-grid-container">
    
            <div className="area-A">

              <Blurb key={this.state.sentence} sentence={this.state.sentence}/>
              
            </div>

            <div className="area-B">

              <ContainerComponent key={this.state.sentence} sentence={this.state.sentence} markBlockComplete={this.markBlockComplete}/>

              <button hidden={!this.state.markBlockComplete} onClick={this.paginate}>Next</button>

            </div>


        </div>

      )
    }

    else {
      return(
        <div><TestComplete/></div>
      )
    }
  }

}

export default Main;