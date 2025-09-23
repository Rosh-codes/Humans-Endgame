import { useState } from "react"
import Header from "./components/Header"
import people from "./components/people"
export default function App(){
  const content = people.map(role=>(
    <div className="Humans-box" style={{backgroundColor : role.backgroundColor , color:role.color}} key={role.name}>
      <span>{role.icon}</span>
      {role.name}
    </div>
  )
  )
  const [Guess,SetGuess]=useState("Firewall")
  const GuessWord = Guess.split("").map((letter,index)=>{
    return (
      <div key={index}>
        {letter.toUpperCase()}
      </div>
    )
  })
  const keys = "abcdefghijklmnopqrstuvwxyz"
  const keyboard = keys.split("").map(aplhabet=>
  {
    return (
      <button key={aplhabet}>
        {aplhabet.toUpperCase()}
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
    </main>
  )
}