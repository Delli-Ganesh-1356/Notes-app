import { useState } from 'react'
import './App.css'
import { Routes, Route, Router } from 'react-router-dom'
import   Register  from './pages/Register/Register'
import { ToastContainer } from 'react-toastify'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Notes from './pages/Notes/Notes'

function App() {
  
  return (
    <div>
      <ToastContainer/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/notes' element={<Notes/>}/>
        </Routes>
    </div>  
  )
}
export default App
