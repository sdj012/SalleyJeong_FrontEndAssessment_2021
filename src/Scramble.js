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
    let sentencelastWord=words[words.length-1] //Store To State: Last Word

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

    if(word.length <= 2) return word;

    let characterArray=Array.from(word);
    
    let firstLetter="";
    let lastLetter="";
    
    let randomnOrder=[]; 
    let randomnIndex="";
    
    let scrambledWord="";
    

    if(word === this.state.firstWord){
      firstLetter=characterArray.shift()
    }

    if(word === this.state.lastWord){

      lastLetter=characterArray.pop()
    }

    let firstIndex=0
    let lastIndex=characterArray.length 

    // Form An Array Of Randomnly Aligned Numbers. Must Be: As Long As The Word & Composed Of Values between 0 and a Max Value Equal = To The Length Of The Word

    do{
      randomnIndex=Math.floor(Math.random() * lastIndex) + firstIndex

      if(!randomnOrder.includes(randomnIndex)) randomnOrder.push(randomnIndex)

    } while(randomnOrder.length < characterArray.length)


    if(randomnOrder.length === characterArray.length){

      randomnOrder.map(randomnIndex=>(
      scrambledWord=scrambledWord + characterArray[randomnIndex]

      ))
    }
    
    scrambledWord=firstLetter+scrambledWord+lastLetter

    return scrambledWord;

  }

  

  componentDidUpdate=(prevProps)=>{

    if(prevProps.sentence !== this.props.sentence){
        this.setState({
            sentence:this.props.sentence
        })
    }

  }

  componentDidMount=()=>{ //As Component Mounts, Start Creating the Scramble by Coverting the String to an Array
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