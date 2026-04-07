import { useState } from 'react'
import './App.css'


function App() {
  let [usermove, setUsermove] = useState("")
  let [computermove,setComputermove]=useState("")
  let [scoreresult, setScoreresult ]=useState({win:0,lose:0,round:0,streak:0})
  let [history,setHistory]= useState([])
  
  function resetScore(){
    setUsermove("")
    setComputermove("")
    setScoreresult({win:0,lose:0,round:0,streak:0})
    setHistory([])
    
  }

  function handleClick(move){
    let userChocie=move;
    let roundResult=''


    const RandomNumber=Math.random()
    let computerChoice="";
    if (RandomNumber>=0 && RandomNumber<1/3){
      computerChoice="Rock"
    } else if (RandomNumber>=1/3 && RandomNumber<2/3){
      computerChoice="Paper"
    }else{
      computerChoice="Scissors"
    }

    if (userChocie===computerChoice){
      roundResult="Tie"
      
    }else if ((userChocie === "Rock" && computerChoice === "Paper") ||
        (userChocie === "Paper" && computerChoice === "Scissors") ||
        (userChocie === "Scissors" && computerChoice === "Rock")){
          roundResult="You lose"
    }else{
      roundResult="You win"
    }
    
    
    setUsermove(userChocie)
    setComputermove(computerChoice)

    setScoreresult((prev) => {
    let newWin = prev.win;
    let newLose = prev.lose;
    let newStreak=prev.streak;
    let newRound = prev.round + 1;
  
    if (roundResult === "You win") {
      newWin += 1;
      newStreak+=1;
    } else if ((roundResult === "You lose")){
      newLose += 1;
      newStreak=0;
    }
  
    return {
      win: newWin,
      lose: newLose,
      round: newRound,
      streak: newStreak
    };
  });

    setHistory((prev) => {
      let newEntry = "";

      if (roundResult === "Tie") {
        newEntry = "Tie"
      } else if (roundResult === "You win") {
        newEntry = "You won";
      } else {
        newEntry = "Computer won";
      }

      return [...prev, newEntry];
    });

  
  }
  return (
    <>
    <h1>Computer:You</h1>

    <h2>{computermove}:{usermove}</h2>
    <h2>Round:{scoreresult.round}</h2>
    <h2>Score-{scoreresult.lose}:{scoreresult.win}</h2>
    <h2>Streak:{scoreresult.streak}</h2>
    <button onClick={()=>{handleClick("Rock")}}><img src="https://a.slack-edge.com/production-standard-emoji-assets/15.0/apple-small/1faa8@2x.png"/></button>
    <button onClick={()=>{handleClick("Paper")}}><img src="https://a.slack-edge.com/production-standard-emoji-assets/15.0/apple-small/1f4c3@2x.png"/></button>
    <button onClick={()=>{handleClick("Scissors")}}><img src="https://a.slack-edge.com/production-standard-emoji-assets/15.0/apple-small/2702-fe0f@2x.png"/></button>
   <button onClick={()=>resetScore()}>Reset</button>
    <h2>History</h2>
    <ol>{history.map((item)=>(
      <li>{item}</li>
    ))}</ol>

    </>
  )
}
export default App
