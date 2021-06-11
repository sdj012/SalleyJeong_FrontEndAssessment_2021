import React, { Component } from 'react';
import axios from 'axios';
import './Main.css';
import ContainerComponent from './ContainerComponent';
import RowComponent from './RowComponent.js';

class Main extends React.Component {

  constructor(props){

    super(props);

    this.state={ 
      pagination:1,
      value:'',
      sentence:'',
      score:0,
      sentenceArray:[],
      gameComplete:false,
      blockGrade:1,
      blockCompleteness:false,
    }
  
  
    this.setSentence=this.setSentence.bind(this);
    this.returnSentence=this.returnSentence.bind(this);
    this.getData=this.getData.bind(this);
    this.breakSentence=this.breakSentence.bind(this);
    this.updateBlockCompleteness=this.updateBlockCompleteness.bind(this);
    this.paginate=this.paginate.bind(this);

  }

  setSentence=(data)=>{

    this.setState({
      sentence:data,
    })

    this.breakSentence();

    console.log( "Sentence: " + this.state.sentence)

  }

  returnSentence=()=>{
    return this.state.sentence;
  }

  paginate=(e)=>{
    
    e.preventDefault();
    this.setState({
      pagination:this.state.pagination+1
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


  breakSentence=()=>{

    //Split Sentence By Space
    let array=[]
    array=this.state.sentence.split(" ");

    let newArray=[];
    let lastElement=array.length-1

    //With the Exception of the Last Element, push a space " " to every element

    array.forEach(value=>{

      if(array.indexOf(value)!=lastElement){
        newArray.push(value+" ");
      } else newArray.push(value);
      
    })

    this.setState({
      sentenceArray:newArray
    })

    console.log("new array: " + newArray)
    // return newArray;
  }


  updateBlockCompleteness=(point)=>{
    console.log("blockGrade: " + this.state.blockGrade)
    this.setState({
      blockGrade:this.state.blockGrade+point
    })

    if(this.state.sentence.length==this.state.blockGrade){

      this.setState({
        blockCompleteness:true,
      })

      console.log("if blockGrade" + this.state.blockGrade + "is equal to this.state.setence.length" + this.state.sentence.length)

    }

    console.log("blockCompleteness is: " +this.state.blockCompleteness)


  }

  render() {

    return(

      <div className="main-grid-container">
  
          <div className="area-A">

            <div>{this.returnSentence()}</div>
            <div>Guess the sentence! Start Typing</div>
            <div>The yellow blocks are meant for spaces</div>
            <div>Score: {this.state.score}</div>

          </div>

          <div className="area-B">

            {/* <ContainerComponent sentence={this.state.sentence}/> */}

            <div className="container">
              {this.state.sentenceArray.map(line=>(
              <RowComponent key={line} word={line} blockCompleteness={this.updateBlockCompleteness}/>
              ))}
            </div>    

            <button onClick={this.paginate}>Next</button>

          </div>


      </div>

    )
  }

}

export default Main;