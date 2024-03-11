import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Registro } from './Pages/Registro/Registro'

import 'bootstrap/dist/css/bootstrap.css'


function App() {
  return (
    <Routes>
      <Route path = '/'/>
      <Route path = 'registrarse' element = {<Registro />}/>
      <Route path = "login"/>
    </Routes>
  )
}

export default App
