import React, { Component } from 'react';
import axios from 'axios';
import './Main.css';
import ContainerComponent from './ContainerComponent';
import RowComponent from './RowComponent.js';

class Main extends React.Component {

  constructor(props){

    super(props);

    this.state={ 
      sentence:this.props.sentence,
      sentenceArray:[],
      blockGrade:1,
      blockCompleteness:false,
    }
  
  
    this.breakSentence=this.breakSentence.bind(this);
    this.updateBlockCompleteness=this.updateBlockCompleteness.bind(this);

  }


  componentDidUpdate=(prevProps)=>{

    if(prevProps.sentence !== this.props.sentence){
        this.setState({
             sentence:this.props.sentence
        })
    }

    console.log("Container componentDidUpdate, this.props.sentence is : " + this.props.sentence)
  }

  componentDidMount=()=>{
    this.breakSentence();
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
      },function(){
        this.props.markBlockComplete(this.state.blockCompleteness)
      })



      console.log("if blockGrade" + this.state.blockGrade + "is equal to this.state.setence.length" + this.state.sentence.length)

    }

    console.log("blockCompleteness is: " +this.state.blockCompleteness)


  }

  render() {

    return(

      <div className="container">

        {this.state.sentenceArray.map(line=>(

          <RowComponent key={line} word={line} blockCompleteness={this.updateBlockCompleteness}/>

        ))}
        
      </div> 
      



    )
  }

}

export default Main;