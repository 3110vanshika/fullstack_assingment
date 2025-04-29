import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Dashboard from './pages/Dashboard'
import EmailVerififaction from './pages/EmailVerification'
import ResetPassword from './pages/ResetPassword'

const App = () => {
  return (
    <BrowserRouter>
       <Routes>
          <Route path='/' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/email-verify' element={<EmailVerififaction />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path="/reset-password/:OTP" element={<ResetPassword />} />
       </Routes>
    </BrowserRouter>
  )
}

export default App