import { useState } from 'react'
import './index.css'
import './App.css'
import { Accueil } from './pages/Accueil';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


const router = createBrowserRouter([
  {
    path:'/',
    element: <Accueil/>
  }])

function App() {
  return (
    <RouterProvider router={router} />
  )
    
}

export default App
