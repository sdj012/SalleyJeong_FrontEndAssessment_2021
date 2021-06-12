import React from 'react';
import Scramble from './Scramble';

class Blurb extends React.Component {

  constructor(props){

    super(props);

    this.state={ 
     Blurb:'',
     sentence:this.props.sentence,
    }


  }

  componentDidUpdate=(prevProps)=>{

    if(prevProps.sentence !== this.props.sentence){
        this.setState({
             sentence:this.props.sentence
        })
    }
    console.log("Blurb: " + this.state.sentence)
  }


  render() {

      return(

        <div className="Blurb-grid-container">
          <Scramble key={this.state.sentence} sentence={this.state.sentence}/>
          <div>Guess the sentence! Start Typing</div>
          <div>The yellow blocks are meant for spaces</div>
        </div>

      )
    }

}

export default Blurb;

