import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LogIn from './pages/login';
import Home from './pages/Home';
import Singin from './pages/singin'
import Loyaut from './loyaut/loyaut';


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="/singin" element={<Singin />} />
        <Route path='/' element={<Loyaut/>}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
