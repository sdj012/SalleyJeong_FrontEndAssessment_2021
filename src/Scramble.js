import React, { Component } from 'react';
import axios from 'axios';
import ContainerComponent from './ContainerComponent';
import RowComponent from './RowComponent.js';

class Scramble extends React.Component {

  constructor(props){

    super(props);

    this.state={ 
      firstLetter:'',
      lastLetter:'',
      words:[],
      scrambled:'',
      sentence:this.props.sentence,
      sentenceArray:[],
    }

    this.scrambleWord=this.scrambleWord.bind(this);
    this.scramble=this.scramble.bind(this);
    this.breakSentence=this.breakSentence.bind(this);

  }

  breakSentence=()=>{

    console.log("hit break sentence")

    //Split Sentence By Space
    let array=[]
    array=this.state.sentence.split(" ");

    let newArray=[];
    let lastElement=array.length-1

    //With the Exception of the Last Element, push a space " " to every element

    array.forEach(value=>{

      if(array.indexOf(value)!=lastElement){
        newArray.push(value);
      } else newArray.push(value);
      
    })

    this.setState({
      sentenceArray:newArray
    },function(){
      this.scramble();
    })

    console.log("new array: " + newArray)
    // return newArray;
  }

  scrambleWord=(word)=>{


    console.log("hit scrambleWord: " + word)

    // if first word, remove (0) word=word.substr(1)
    // if last word, .slice(0,-1) word=word.substr(0,word.length-1);

    let scrambledWord="";
    let randomnOrder=[]; //form a randomnly order of numbers between 1 and the lastIndex
    let randomnIndex="";
    let firstIndex=0
    let lastIndex=word.length

    do{

 
      randomnIndex=Math.floor(Math.random() * lastIndex) + firstIndex
      console.log("scrambleWord: randomnIndex: " + randomnIndex)

      if(!randomnOrder.includes(randomnIndex))randomnOrder.push(randomnIndex)

    }while(randomnOrder.length < word.length)

    if(randomnOrder.length = word.length){
      randomnOrder.map(randomnIndex=>(
        scrambledWord=scrambledWord+word.charAt(randomnIndex)
      ))
    }
    console.log("randomnOrder: " + randomnOrder)
    console.log("scrambledWord Value: " + scrambledWord)

    return scrambledWord;


  }

  
  scramble=()=>{

    console.log("hit: scramble this.state.sentenceArray is : " + this.state.sentenceArray)
    let scrambledSentence=""

    this.state.sentenceArray.map(wordVal=>(
      scrambledSentence+=this.scrambleWord(wordVal)+ " "
    ))

    console.log("scramble value: " + scrambledSentence)

    this.setState({
      scrambled:scrambledSentence
    },function(){
      return;
    })

  }

  componentDidUpdate=(prevProps)=>{

    if(prevProps.sentence !== this.props.sentence){
        this.setState({
             sentence:this.props.sentence
        })
    }
    console.log("Scramble " + this.state.sentence)
  }

  componentDidMount=()=>{
    this.breakSentence();
    // this.scramble();
  }
  
  render() {

      return(

        <div className="Scramble-grid-container">
          Scramble: {this.state.scrambled}
          {/* <div>this.state.scrambled</div> */}

        </div>

      )
    }

}

export default Scramble;