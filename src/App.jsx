import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
        <h1>Avin Chiu</h1>
      </header>
      <main>
        <MyButton/>
        <p>This is my existing project content!</p>
      </main>
    </>
  );
}
function  MyButton (){
  return(
    <button>I'm a button</button>
  )
}

export default App
