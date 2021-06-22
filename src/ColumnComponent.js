import React from 'react';

class ColumnComponent extends React.Component {

  constructor(props){

    super(props);

    this.state={ 
      character:this.props.character,
      refId:this.props.refId,
      correct:false,
    }    

    this.handleChange=this.handleChange.bind(this);
    this.returnActiveness=this.returnActiveness.bind(this);
  }

  handleChange(answer,event){ // Update the Column's Completeness to Parent Component - Row Component By Lifting State Up

    let entry=event.target.value.toLowerCase()

    if(entry===answer){

      this.setState({
        correct:true,
      })

      this["ipRef" + this.state.refId].blur(); // Remove Focus From Input

      this.props.updateRowCompleteness(1); 
    } 


  }


  returnBackgroundColor=()=>{

    if(this.state.character===" " && this.state.correct===false) return "#ffb74d"
    if(this.state.correct===true) return "#4caf50";
    else return "#e1e1e1";

  }

  componentDidUpdate=(prevProps)=>{

      if(prevProps.character !== this.props.character){
          this.setState({
               character:this.props.character
          })
      }
  }

  returnActiveness=()=>{

    if(this.state.correct===true) return 1; // When Filled, Set "Disabled" To True. Else, Leave Open.
    else return 0; 

  }


  render() {

    return(

        // Generate An Input Field For The Character. Pass The Answer Value As Well To 'On Handle Change'

        <div className="ColumnComponent column-style">

          <input ref={(ip)=> this["ipRef" + this.state.refId] = ip} disabled={this.returnActiveness()} style={{background: this.returnBackgroundColor()}} maxLength="1" className="column-style" type="text" onChange={(e)=>this.handleChange(this.state.character,e)}></input>

        </div>

    )
  }

}

export default ColumnComponent;