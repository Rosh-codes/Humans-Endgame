import { useState } from "react"
import Header from "./components/Header"
import people from "./components/people"
import clsx from "clsx"
export default function App(){
  const content = people.map(role=>(
    <div className="Humans-box" style={{backgroundColor : role.backgroundColor , color:role.color}} key={role.name}>
      <span>{role.icon}</span>
      {role.name}
    </div>
  )
  )
  const [Guess,setGuess]=useState("firewall")
  const [clickedKey,setClickedKey]=useState([])
  const WrongGuessKey = clickedKey.filter(keys=>!Guess.includes(keys)).length
  console.log(WrongGuessKey)
  function PressKey(letter){
    setClickedKey(prevClickKey=>{
      return prevClickKey.includes(letter)
      ? prevClickKey : [...prevClickKey,letter]
    })
  }
  const GuessWord = Guess.split("").map((letter,index)=>{
    return (
      <div key={index}>
        {clickedKey.includes(letter) ? letter.toUpperCase():""}
      </div>
    )
  })
    
  const keys = "abcdefghijklmnopqrstuvwxyz"
  const keyboard = keys.split("").map(alphabet=>
  {
const isGuessed = clickedKey.includes(alphabet)
const isCorrect = isGuessed && Guess.includes(alphabet)
const isWrong = isGuessed && !Guess.includes(alphabet)
    const className = clsx({
      CorrectKey : isCorrect,
      WrongKey : isWrong
    })
    return (
      <button className={className} onClick={()=>PressKey(alphabet)} key={alphabet}>
        {alphabet.toUpperCase()}
      </button>
    )
  }
  )
  return(
    <main>
    <Header/>
    <section className="Result-section">
        <p>You saved humanity! </p>
          <p>The humans survive!🥳</p>
    </section>
    <section className="Rivals">
      {content}
    </section>
    <section className="Guess-section">
      {GuessWord}
    </section>
    <section className="Keyboard-section">
      {keyboard}
    </section>
    <button className="NewGame-Btn">New Game</button>
    </main>
  )
}