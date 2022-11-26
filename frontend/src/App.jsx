import './App.css'
import AppRoutes  from './routes/routes'
import themeOptions from "./assets/themes"
import {  ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

function App() {

  return (
    <div className="App">
        <ThemeProvider theme={themeOptions}>
          <CssBaseline/>
            <AppRoutes/>
        </ThemeProvider>
    </div>
  )
}

export default App
