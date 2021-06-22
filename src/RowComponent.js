import React from 'react';
import ColumnComponent from './ColumnComponent';

class RowComponent extends React.Component {

  constructor(props){

    super(props);

    this.state={ 
      word:this.props.word,
      characterArray:[],
      rowGrade:1,
      rowCompleteness:false,
    }
    
    this.column=React.createRef();
    this.createArrayOfCharacters=this.createArrayOfCharacters.bind(this);
    this.updateRowCompleteness=this.updateRowCompleteness.bind(this);  

  }

  
  createArrayOfCharacters=()=>{

    let characters=[]

    for(let i=0;i<this.state.word.length;i++){

      let characterObject={'character':this.state.word[i], 'refId':i}

      characters.push(characterObject)
    }



    this.setState({
      characterArray:characters
    })

  }

  componentDidMount=()=>{ // On Mount: Convert The Passed Word Into An Array of Characters

    this.createArrayOfCharacters();    

    this.state.characterArray.map((character,index)=>{
      this["column"+index]=React.createRef()
    })

  }

  componentDidUpdate=(prevProps)=>{

      if(prevProps.word !== this.props.word){
          this.setState({
               word:this.props.word
          })
      }

  }

  updateRowCompleteness=(point)=>{ // Update the Row's "Completeness" to Parent Component - Block Component. rowGrade is Default To 1, As There Is No Previous Column To Call UpdateRowCompleteness

    if(this.state.rowGrade < this.state.word.length){ // As Long As The Row is Incomplete, Pass Focus To Next Column 
      this["column"+this.state.rowGrade]["ipRef"+this.state.rowGrade].focus() // Give Focus To Next Element Through Refs , Which Happens To Correspond With The Current [rowGrade] (Before Updating)
    };

    this.setState({ // Update rowGrade By Adding Point(1)
      rowGrade:this.state.rowGrade+point
    })

    if(this.state.rowGrade===this.state.word.length){

      this.setState({
        rowCompleteness:true,
      })

      this.props.blockCompleteness(1)


    }

  }

  render() {

    return(

      // Generate 'Column Components' From The State's Array Of Characters

      <div className="RowComponent">

        {this.state.characterArray.map((character,index)=>(
          <ColumnComponent ref={(col)=>this["column"+index] = col} refId={index} key={index} character={character.character} updateRowCompleteness={this.updateRowCompleteness}/>
        ))}
        
      </div>

    )
  }

}

export default RowComponent;