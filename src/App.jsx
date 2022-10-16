import { useState } from 'react'
import './App.css'
<<<<<<< HEAD
import BodyFilter from './components/BodyFilter/BodyFilter'
=======
import NavigationHeader from './components/Navigation/NavigationHeader'
>>>>>>> feature/navigation_bar

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
<<<<<<< HEAD
      <BodyFilter></BodyFilter>
=======
      <NavigationHeader>
      </NavigationHeader>
>>>>>>> feature/navigation_bar
    </div>
  )
}

export default App
