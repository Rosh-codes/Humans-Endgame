import { useState } from "react"
import Header from "./components/Header"
import people from "./components/people"
import { getFarewellText } from "./components/utility"
import { getRandomWord } from "./components/words"
import ReactConfetti from "react-confetti"


import clsx from "clsx"


export default function App() {
  const [Guess, setGuess] = useState(()=>getRandomWord())
  const [clickedKey, setClickedKey] = useState([])
  const WrongGuessCount = clickedKey.filter(keys => !Guess.includes(keys)).length
  const recentGuess = clickedKey[clickedKey.length - 1]
  const incorrectGuess = recentGuess && !Guess.includes(recentGuess)

  const GameWon = Guess.split("").every(letter => clickedKey.includes(letter))
  const GameLost = WrongGuessCount === people.length - 1
  const content = people.map((role, index) => (
    <div
      className={` Humans-box ${index < WrongGuessCount ? "lost" : ""}`}
      style={{ backgroundColor: role.backgroundColor, color: role.color }}
      key={role.name}
    >
      <span>{role.icon}</span>
      <span>{role.name}</span>
    </div>
  ))
  function NewGame(){
    setGuess(getRandomWord())
    setClickedKey([])
  }

  function PressKey(letter) {
    setClickedKey(prevClickKey =>
      prevClickKey.includes(letter)
        ? prevClickKey
        : [...prevClickKey, letter]
    )
  }

  const GuessWord = Guess.split("").map((letter, index) => {
      const MissedLetter = clsx({
        missedLetter : GameLost && !clickedKey.includes(letter)
      })
      return(
    <div key={index} className={MissedLetter}>
      {clickedKey.includes(letter) || GameLost ? letter.toUpperCase() : ""}
    </div>
  )})

  const keys = "abcdefghijklmnopqrstuvwxyz"
  const keyboard = keys.split("").map(alphabet => {
    const isGuessed = clickedKey.includes(alphabet)
    const isCorrect = isGuessed && Guess.includes(alphabet)
    const isWrong = isGuessed && !Guess.includes(alphabet)
    const className = clsx({
      CorrectKey: isCorrect,
      WrongKey: isWrong
    })

    return (
      <button
        className={className}
        onClick={() => PressKey(alphabet)}
        key={alphabet}
        disabled={GameLost || GameWon}
        aria-disabled = {GameLost || GameWon || isGuessed}

      >
        {alphabet.toUpperCase()}
      </button>
    )
  })
  return (
    <main>
      <Header />
      <section className="Result-section" style={
        { backgroundColor: GameWon ? "green" : GameLost ? "red" : incorrectGuess ? people[WrongGuessCount - 1].backgroundColor : null }
      }>
        {!GameWon && !GameLost && WrongGuessCount > 0 && incorrectGuess &&
          <div className="Status-Display">
            <p>{getFarewellText(people[WrongGuessCount - 1].name)}</p>
          </div>
        }
        {GameWon && <div className="Status-Display">
          <p> We WON! </p>
          <p>You saved humanity! </p>
        </div>
        }
        {GameLost && <div className="Status-Display">
          <p> We lost! </p>
          <p>They took over </p>
        </div>}
      </section>
      <section className="Rivals">{content}</section>
      <section className="Guess-section">{GuessWord}</section>
      <section className="Keyboard-section">{keyboard}</section>
      {GameWon || GameLost ? <button className="NewGame-Btn" onClick={NewGame}>New Game</button> : null}
      {GameWon && <ReactConfetti/>}
    </main>
  )
}
