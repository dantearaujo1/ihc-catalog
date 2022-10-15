import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import NavigationHeader from './components/Navigation/NavigationHeader'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <NavigationHeader>
      </NavigationHeader>
    </div>
  )
}

export default App
