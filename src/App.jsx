import { useState } from "react"
import Header from "./components/Header"
import people from "./components/people"
import clsx from "clsx"

export default function App() {
  const [Guess, setGuess] = useState("firewall")
  const [clickedKey, setClickedKey] = useState([])

  const WrongGuessCount = clickedKey.filter(keys => !Guess.includes(keys)).length
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
  const GameWon = Guess.split("").every(letter => clickedKey.includes(letter))

  const GameLost = WrongGuessCount === people.length - 1

  function PressKey(letter) {
    setClickedKey(prevClickKey =>
      prevClickKey.includes(letter)
        ? prevClickKey
        : [...prevClickKey, letter]
    )
  }

  const GuessWord = Guess.split("").map((letter, index) => (
    <div key={index}>
      {clickedKey.includes(letter) ? letter.toUpperCase() : ""}
    </div>
  ))

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
      >
        {alphabet.toUpperCase()}
      </button>
    )
  })

  return (
    <main>
      <Header />
      <section className="Result-section" style={
        { backgroundColor: GameWon ? "green" : GameLost ? "red" : "" }
      }>
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
      {GameWon || GameLost ? <button className="NewGame-Btn">New Game</button> : null}
    </main>
  )
}
