import React from 'react';
import '../Main.css';
import RowComponent from './Row/RowComponent.js';
import NextButton from './NextButton';

class BlockComponent extends React.Component {

  constructor(props){

    super(props);

    this.state={ 
      sentence:this.props.sentence,
      wordArray:[],
      blockGrade:1,
      blockCompleteness:false,
    }
  
    this.breakSentence=this.breakSentence.bind(this);
    this.updateBlockCompleteness=this.updateBlockCompleteness.bind(this);
    this.callPaginate=this.callPaginate.bind(this);

  }

  componentDidUpdate=(prevProps)=>{

    if(prevProps.sentence !== this.props.sentence){
        this.setState({
             sentence:this.props.sentence
        })
    }

  }

  componentDidMount=()=>{
    
    this.breakSentence();

  }


  breakSentence=()=>{ // Convert Sentence String to An Array

    // Retrieve Words By Splitting Sentence By Space

    let arrayOfWords=[]
    arrayOfWords=this.state.sentence.split(" ");

    let arrayWithSpacing=[];
    let lastElement=arrayOfWords.length-1


    arrayOfWords.forEach(value=>{

      if(arrayOfWords.indexOf(value)!==lastElement){ // Add Space To All Words Except The Last
        arrayWithSpacing.push(value + " "); 
      } else arrayWithSpacing.push(value);
      
    })

    this.setState({
      wordArray:arrayWithSpacing
    }) 

  }


  updateBlockCompleteness=(point)=>{ // Update the Block's Completeness to Parent Component - Main

      if(this.state.blockGrade < this.state.wordArray.length){  // As Long As The Block Is Not Completed, Once Each Row is Complete, Pass Focus To The Next Row
        this["row"+this.state.blockGrade]["column"+0]["ipRef"+0].focus() 
      }

      this.setState({
        blockGrade:this.state.blockGrade+point
      })


      if(this.state.blockGrade === this.state.wordArray.length){ 

        this.setState({
          blockCompleteness:true,
        },function(){
          this.props.markBlockComplete(this.state.blockCompleteness)
          this["NextButton"]["buttonInput"].focus()  // Once Block Complete, Give Focus To The 'Next Button'
        })  
    
    }

  }

  callPaginate=(e)=>{
    this.props.callPaginate(e);
  }

  render() {

    return(

      // Generate 'Row Components' From The State's Array Of Words

      <div className="container" data-testid="block-test">

        {this.state.wordArray.map((line,index)=>(

          <RowComponent ref={(ro)=>this["row" + index] = ro} key={line} word={line} blockCompleteness={this.updateBlockCompleteness}/>

        ))}

        <div hidden={!this.state.blockCompleteness}><NextButton ref={(ro)=>this["NextButton"] = ro} callPaginate={this.callPaginate}/></div>
        
      </div> 
      



    )
  }

}

export default BlockComponent;