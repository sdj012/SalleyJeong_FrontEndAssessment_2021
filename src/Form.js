import React, { Component } from 'react';

// import 'react-sharingbuttons/dist/Form.css'
// import Facebook from 'react-sharingbuttons/dist/buttons/Facebook'
// import Twitter from 'react-sharingbuttons/dist/buttons/Twitter'
// import Share from './Share'

class Form extends React.Component {

  constructor(props){

    super(props);

    this.state={ 
      value:'',
      sentence:this.props.sentence
    }
  
    // this.handleChange=this.handleChange.bind(this);
    // this.handleSubmit=this.handleSubmit.bind(this);
    // this.setState=this.setState.bind(this);
    // this.fillState=this.fillState.bind(this);

  }

  // handleSubmit(event){


  // }

  // handleChange(event){

  //   this.setState({
  //     value:event.target.value,
  //   }, () => { 
  //     console.log(this.state.value)
  //   });
  // }

  // fillState=()=>{

  //   this.setState({
  //     sentence:this.props.sentence
  //   })
  // }

  componentDidMount=()=>{
    console.log("Form Mounted: " + this.state.sentence)
  }

  componentDidUpdate=(prevProps)=>{

      if(prevProps.sentence !== this.props.sentence){
          this.setState({
               sentence:this.props.sentence
          })
      }
  }
  
  render() {

    return(

      <div className="grid-container">

        <div className="Form">

        <div>Form -{this.state.sentence}</div>

        {/* <div>
            <form>
              <input type="text" onChange={this.handleChange} onKeyDown={this.handleSubmit}></input>
            </form>
        </div> */}

        </div>
      </div>

    )
  }

}

export default Form;