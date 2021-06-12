import React from 'react';

class ColumnComponent extends React.Component {

  constructor(props){

    super(props);

    this.state={ 
      value:'',
      character:this.props.character,
      correct:false,
    }
    
    this.handleChange=this.handleChange.bind(this);

  }


  handleChange(answer,event){

    console.log("handleChange: " + answer)
    
    if(event.target.value===answer){

      console.log("answer")
      
      this.setState({
        correct:true,
      })

      this.props.rowCompleteness(1)

    }


  }


  returnBackgroundColor=()=>{
    if(this.state.character===" " && this.state.correct===false) return "#ffb74d"
    if(this.state.correct===true) return "#4caf50";
    else return "#e1e1e1";
  }

  componentDidMount=()=>{
    console.log("Column Mounted: " + this.state.character)
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

        <div className="ColumnComponent column-style">
          <input style={{background: this.returnBackgroundColor()}} maxlength="1" className="column-style" type="text" onChange={(e)=>this.handleChange(this.state.character,e)}></input>
        </div>

    )
  }

}

export default ColumnComponent;