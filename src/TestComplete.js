import React from 'react';
import Facebook from 'react-sharingbuttons/dist/buttons/Facebook';
import Twitter from 'react-sharingbuttons/dist/buttons/Twitter';
import 'react-sharingbuttons/dist/main.css'

class TestComplete extends React.Component {

  constructor(props){

    super(props);

    this.state={ 
     TestComplete:''
    }


  }


  render() {

    const url = 'https://github.com/caspg/react-sharingbuttons'
    const shareText = 'Check this site!'

      return(

        <div className="TestComplete-grid-container">
          <div className="complete-message">You Win!</div>
          <div>Share the Game:
              <Facebook url={url} />
              <Twitter url={url} shareText={shareText} /> 
            </div>
        </div>

      )
    }

}

export default TestComplete;

