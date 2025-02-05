import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Landing from '../pages/Landing'
import SignIn from '../pages/SignIn'
import Dashboard from '../pages/Dashboard'
import Navbar from '../components/Navbar'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
      <footer className='footer'>
        <p className='footer-text'>Copyright 2025 Argent Bank</p>
      </footer>
    </BrowserRouter>
  )
}

export default App
