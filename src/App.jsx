import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LogIn from './pages/login';
import Home from './pages/home';
import Singin from './pages/singin'
import Loyaut from './loyaut/loyaut';
import Wallet from './pages/wallet';
import Transictions from './pages/transictions';
import Exchange from './pages/exchange';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="/singin" element={<Singin />} />
        <Route path='/' element={<Loyaut/>}>
          <Route index element={<Home />} />
          <Route path='/wallet' element={<Wallet/>} />
          <Route path='/transictions' element={<Transictions/>} />
          <Route path='/exchange' element={<Exchange/>} />
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
