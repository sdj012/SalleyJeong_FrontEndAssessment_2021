import React from 'react';

class ColumnComponent extends React.Component {

  constructor(props){

    super(props);

    this.state={ 
      value:'',
      character:this.props.character,
      refId:this.props.refId,
      correct:false,
    }    

    this.handleChange=this.handleChange.bind(this);
  }

  handleChange(answer,event){ // Update the Column's Completeness to Parent Component - Container Component

    let entry=event.target.value.toLowerCase()
    if(entry===answer){

      this.setState({
        correct:true,
      })

      this.props.updateRowCompleteness(1)
    }


  }

  componentDidMount=()=>{
    this[this.state.refId]=React.createRef();
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


  render() {

    return(

        // Generate An Input Field For The Character. Pass The Answer Value As Well To 'On Handle Change'

        <div className="ColumnComponent column-style">

          <input ref={(ip)=> this["ipRef" + this.state.refId] = ip} style={{background: this.returnBackgroundColor()}} maxLength="1" className="column-style" type="text" onChange={(e)=>this.handleChange(this.state.character,e)}></input>
        
        </div>

    )
  }

}

export default ColumnComponent;