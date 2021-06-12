import React, { Component } from 'react';
import ColumnComponent from './ColumnComponent';

class RowComponent extends React.Component {

  constructor(props){

    super(props);

    this.state={ 
      value:'',
      word:this.props.word,
      characterArray:[],
      rowGrade:0,
      rowCompleteness:false,
    }

    this.createArrayOfCharacters=this.createArrayOfCharacters.bind(this);
    this.updateRowCompleteness=this.updateRowCompleteness.bind(this);  

  }
  
  createArrayOfCharacters=()=>{

    let characters=[]

    for(let i=0;i<this.state.word.length;i++){
      characters.push(this.state.word[i])
    }

    this.setState({
      characterArray:characters
    })

    console.log("characterArray: " + this.state.characterArray)

  }

  componentDidMount=()=>{
    console.log("Row Mounted: " + this.state.word);

    this.createArrayOfCharacters();
  }

  componentDidUpdate=(prevProps)=>{

      if(prevProps.word !== this.props.word){
          this.setState({
               word:this.props.word
          })
      }

    
 
    console.log("rowGrade is: " +this.state.rowGrade)
    console.log("rowCompleteness is: " +this.state.rowCompleteness)

    console.log("this.state.word = " + this.state.word.length + " characters long ")
  }

  updateRowCompleteness=(point)=>{

    this.setState({
      rowGrade:this.state.rowGrade+point
    })

    if(this.state.rowGrade=this.state.word.length){

      this.setState({
        rowCompleteness:true,
      })

      console.log("if rowGrade" + this.state.rowGrade + "is equal to this.state.word.length" + this.state.word.length)

      this.props.blockCompleteness(1)


    }

    console.log("rowCompleteness is: " +this.state.rowCompleteness)

  }

  
  render() {

    return(

      <div className="RowComponent">
        {this.state.characterArray.map((character,index)=>(
          <ColumnComponent key={index} character={character} rowCompleteness={this.updateRowCompleteness}/>
        ))}
      </div>

    )
  }

}

export default RowComponent;