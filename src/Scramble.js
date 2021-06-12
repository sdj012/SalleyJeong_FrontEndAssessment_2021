import React from 'react';

class Scramble extends React.Component {

  constructor(props){

    super(props);

    this.state={ 
      firstWord:'',
      lastWord:'',
      words:[],
      scrambled:'',
      sentence:this.props.sentence,
      sentenceArray:[],
    }

    this.scrambleWord=this.scrambleWord.bind(this);
    this.scramble=this.scramble.bind(this);
    this.breakSentence=this.breakSentence.bind(this);

  }

  breakSentence=()=>{


    console.log("hit break sentence")

    //Split Sentence By Space
    let array=[]
    array=this.state.sentence.split(" ");
    // array.forEach(value=>{
    //   newArray.push(value);
    // })

    let sentencefirstWord=array[0]
    let sentencelastWord=array[array.length-1]

    this.setState({
      sentenceArray:array,
      firstWord: sentencefirstWord,
      lastWord:sentencelastWord
    },function(){
      this.scramble();
    })

    // console.log("new array: " + newArray)
    console.log("array: " + array)
    // return newArray;
  }

  scrambleWord=(word)=>{

    console.log("this.state.firstWord : " + this.state.firstWord)
    console.log("this.state.lastWord : " + this.state.lastWord)
    console.log("hit scrambleWord: " + word)

    let scrambledWord="";

    let randomnOrder=[]; //form a randomnly order of numbers between 1 and the lastIndex

    let randomnIndex="";
    let characterArray=Array.from(word);

    let firstLetter="";
    let lastLetter="";

    // If words are first or last words, trim out first or last letter
    // Assign to block "firstLetter" and "lastLetter" 

    if(word === this.state.firstWord){
      firstLetter=characterArray.shift()
      console.log("firstWord characterArray"+characterArray)
      // word=word.slice(1)
      // console.log("firstWord fixed: "  + word +"scrambledWord: " + scrambledWord) 
    }


    if(word === this.state.lastWord){
      // word=word.slice(0,lastIndex-1)
      lastLetter=characterArray.pop()
      console.log("lastWord characterArray"+characterArray)
      console.log("lastWord fixed: "  + word +" scrambledWord: " + scrambledWord) 
    }

    let firstIndex=0
    let lastIndex=characterArray.length 

    //Form an Array of Randomn Numbers between 0 and lastIndex - Make sure it is only as long as the word

    do{
      randomnIndex=Math.floor(Math.random() * lastIndex) + firstIndex
      console.log("scrambleWord: randomnIndex: " + randomnIndex)

      if(!randomnOrder.includes(randomnIndex)) randomnOrder.push(randomnIndex)

    } while(randomnOrder.length < characterArray.length)

    console.log("randomnOrder : " + randomnOrder)

    if(randomnOrder.length === characterArray.length){

      randomnOrder.map(randomnIndex=>(
      // scrambledWord=scrambledWord + word.charAt(randomnIndex)
      scrambledWord=scrambledWord + characterArray[randomnIndex]

      ))
    }
    
    scrambledWord=firstLetter+scrambledWord+lastLetter

    console.log("randomnOrder: " + randomnOrder)
    console.log("scrambledWord Value: " + scrambledWord)

    return scrambledWord;


  }

  
  scramble=()=>{

    console.log("hit: scramble this.state.sentenceArray is : " + this.state.sentenceArray)

    let scrambledSentence=""

    this.state.sentenceArray.map(wordVal=>(
      scrambledSentence+=this.scrambleWord(wordVal)+ " "
    ))

    console.log("scramble value: " + scrambledSentence)

    this.setState({
      scrambled:scrambledSentence
    },function(){
      return;
    })

  }

  componentDidUpdate=(prevProps)=>{

    if(prevProps.sentence !== this.props.sentence){
        this.setState({
            sentence:this.props.sentence
        })
    }
    console.log("Scramble " + this.state.sentence)
  }

  componentDidMount=()=>{
    this.breakSentence();
  }
  
  render() {

      return(

        <div className="Scramble-grid-container">
          {this.state.scrambled}
        </div>

      )
    }

}

export default Scramble;