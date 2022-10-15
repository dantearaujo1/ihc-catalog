import { useState } from 'react'
import './App.css'
import BodyFilter from './components/BodyFilter/BodyFilter'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <BodyFilter></BodyFilter>
    </div>
  )
}

export default App
