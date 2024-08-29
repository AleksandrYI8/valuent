import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LogIn from './pages/login';
import Home from './pages/Home';
import Singin from './pages/Singin'


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LogIn/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/singin" element={<Singin/>}/>
    </Routes>
    </BrowserRouter>
    
  )
}

export default App
