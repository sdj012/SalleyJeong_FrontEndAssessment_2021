import React from 'react';
import axios from 'axios';
import './Main.css';
import Blurb from './Blurb/Blurb';
import BlockComponent from './Block/BlockComponent';
import TestComplete from './TestComplete/TestComplete';

class Main extends React.Component {
  
  constructor(props){

    super(props);

    this.state={ 
      pagination:1,
      numberOfSentences:10,
      sentence:"",
      score:0,
      markBlockComplete:false,
    }

    this.getData=this.getData.bind(this);
    this.setSentence=this.setSentence.bind(this);
    this.markBlockComplete=this.markBlockComplete.bind(this);
    this.detectEnter=this.detectEnter.bind(this);
  }

  componentDidMount=()=>{
    this.getData();
  }

  getData=()=>{

    axios.get("https://api.hatchways.io/assessment/sentences/" + this.state.pagination)
    .then(response => this.setSentence(response["data"]["data"]["sentence"]));
  }

  setSentence=(data)=>{

    data=data.toLowerCase()

    this.setState({
      sentence:data,
    })

  }

  paginate=(e)=>{
    
    e.preventDefault();

    this.setState({
      pagination:this.state.pagination+1,
      markBlockComplete:false,
      score:this.state.score+1,
    },function(){
      this.getData();
    })

  }

  detectEnter=(event)=>{

    event.preventDefault();

    if(event.keyCode === 13 )this.paginate(event);

  }

  /* Receives Data OnCompleteness From Child Component and Communicates To State To Update 'Score' */

  markBlockComplete=(isComplete)=>{

    if(isComplete){

      this.setState({
        markBlockComplete:true,
      })

    }

  }
  
  render() {

    /* If Game Is Complete: Render Test Complete Component*/

    if(this.state.score === this.state.numberOfSentences){ 

      return(

        <div>
          <TestComplete/>
        </div>

      )

    }

    else { /* Else: Render Quizzes Generated From Fetched Data*/

      return(

        <div className="home-grid-container" data-testid="main-test">

        <div className="main-grid-container">

          {/* Renders: Scrambled Sentence and Current Score*/}

            <div className="area-A"> 

              <Blurb key={this.state.sentence} sentence={this.state.sentence}/>

              <div className="score"> Score: {this.state.score}</div>
              
            </div>

          {/* Renders: Series of Text Inputs and Conditionally Visible 'Next' Button */}

            <div className="area-B"> 

              <BlockComponent key={this.state.sentence} sentence={this.state.sentence} markBlockComplete={this.markBlockComplete} callPaginate={this.paginate}/>

            </div>

        </div>

      </div>
      )
    }
  }

}

export default Main;