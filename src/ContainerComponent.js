import React from 'react';
import './Main.css';
import RowComponent from './RowComponent.js';

class ContainerComponent extends React.Component {

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



  breakSentence=()=>{ // Convert State String to an Array of Words

    // Split Sentence By Space
    let arrayOfWords=[]
    arrayOfWords=this.state.sentence.split(" ");

    let arrayWithSpacing=[];
    let lastElement=arrayOfWords.length-1


    arrayOfWords.forEach(value=>{

      if(arrayOfWords.indexOf(value)!==lastElement){
        arrayWithSpacing.push(value+" ");
      } else arrayWithSpacing.push(value);
      
    })

    this.setState({
      wordArray:arrayWithSpacing
    }) 

  }


  updateBlockCompleteness=(point)=>{ // Update the Block's Completeness to Parent Component - Main

    this.setState({
      blockGrade:this.state.blockGrade+point
    })

    if(this.state.wordArray.length===this.state.blockGrade){

      this.setState({
        blockCompleteness:true,
      },function(){
        this.props.markBlockComplete(this.state.blockCompleteness)
      })

    }

  }

  render() {

    return(

      // Generate 'Row Components' From The State's Array Of Words

      <div className="container">

        {this.state.wordArray.map(line=>(
          <RowComponent key={line} word={line} blockCompleteness={this.updateBlockCompleteness}/>
        ))}
        
      </div> 
      



    )
  }

}

export default ContainerComponent;