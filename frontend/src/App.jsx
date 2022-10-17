import { useState } from 'react'
import './App.css'
import BodyFilter from './components/BodyFilter/BodyFilter'
import NavigationHeader from './components/Navigation/NavigationHeader'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <NavigationHeader>
      </NavigationHeader>
      <BodyFilter>
      </BodyFilter>
    </div>
  )
}

export default App
