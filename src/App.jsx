import { nanoid } from "nanoid"
import Header from "./components/Header"
import people from "./components/people"
export default function App(){
  const content = people.map(role=>(
    <div className="Humans-box" style={{backgroundColor : role.backgroundColor , color:role.color}} key={nanoid()}>
      <span>{role.icon}</span>
      {role.name}
    </div>
  )
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
    </main>
  )
}