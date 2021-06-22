import React from 'react';

class Scramble extends React.Component {

  constructor(props){

    super(props);

    this.state={ 
      sentence:this.props.sentence,
      firstWord:'',
      lastWord:'',
      words:[],
      scrambled:' ',
    }

    this.scrambleWord=this.scrambleWord.bind(this);
    this.scramble=this.scramble.bind(this);
    this.breakSentence=this.breakSentence.bind(this);

  }

  breakSentence=()=>{ // Convert The Given Sentence To An Array Of Words. Once Finished, Call The Scramble Function

    let words=[]
    words=this.state.sentence.split(" ");

    let sentencefirstWord=words[0] // Store To State: First Word
    let sentencelastWord=words[words.length-1] // Store To State: Last Word

      this.setState({

        words:words,
        firstWord: sentencefirstWord,
        lastWord:sentencelastWord

      },function(){

        this.scramble();

      })

  }
  
  scramble=()=>{ // Iterate Through The State's Array of Words and Scramble Each Word By Calling this.scrambleWord. As It Receives The Scrambled Words, It Merges It Into A Single String. 

    let scrambledSentence=""

    this.state.words.map(word=>(

      scrambledSentence+=this.scrambleWord(word)+ " "
      
    ))

      this.setState({

        scrambled:scrambledSentence // Save The Scrambled Sentence To The State

      },function(){
        return;
      })

  }

  scrambleWord=(word)=>{ // Scramble Words Passed By this.scramble. Do Not Change Positions Of: First Character,Last Character, Words Less Than < or Equal = To 2 Characters In Length
    
    if(word.length <= 2) return word; // If Word Is 2 Letters Long Or Less, Do Not Scramble.

    let scrambledWord="";

    let characterArray=Array.from(word);
    
    let firstLetter="";
    let lastLetter="";
    
    let randomnOrder=[]; 
    let randomnIndex="";
    
    if(word === this.state.firstWord){ //If The Word Is The First Word Of The Sentence, Remove and Store First Letter Seperately
      firstLetter=characterArray.shift()
    }

    if(word === this.state.lastWord){ //If The Word Is The Last Word Of The Sentence, Remove and Store First Letter Seperately
      lastLetter=characterArray.pop()
    }

    let MinVal=0
    let MaxVal=characterArray.length 

    // Generate An Array Of Randomnly Aligned Numbers 'randomnOrder[]'
    //  Must Be: As Long As The Word & Composed Of Values Between 0 and A Non-Inclusive Value Equal To The Length Of The Word

    do{
      randomnIndex=Math.floor(Math.random() * MaxVal) + MinVal

      if(!randomnOrder.includes(randomnIndex)) randomnOrder.push(randomnIndex)

    } while(randomnOrder.length < characterArray.length) 


    if(randomnOrder.length === characterArray.length){ // Retrieve And Store The Word's Values At Randomn Indexes

      randomnOrder.map(randomnIndex=>(
        scrambledWord+=characterArray[randomnIndex]
      ))
    }

    // If The Word Is The First Word Of Sentence, Line Will Add The First Letter Sliced Earlier. Variable 'lastLetter' Will Be Empty.
    // If The Word Is The Last Word Of Sentence, Line Will Add The Last Letter Sliced Earlier. Variable 'firstLetter' Will Be Empty.
    // If Neither The First Word Or Last Word, Both 'firstLetter' and 'lastLetter' Variables Are Empty.
    
    scrambledWord = firstLetter + scrambledWord + lastLetter 

    return scrambledWord;

  }

  
  componentDidUpdate=(prevProps)=>{

    if(prevProps.sentence !== this.props.sentence){ // Keep State Updated As Parent Updates Props
        this.setState({
            sentence:this.props.sentence
        })
    }

  }

  componentDidMount=()=>{ // When Component Mounts, Create Begin By Generating An Array Of Words From Passed Sentence

    this.breakSentence();

  }
  
  render() {

      return(

        <div className="Scramble-grid-container" id="scrambled-word">
          {this.state.scrambled}
        </div>

      )
    }

}

export default Scramble;