import { useState } from 'react'
import './index.css'
import './App.css'
import { Accueil } from './pages/Accueil';
import { Connexion } from './pages/Connexion';
import { CreateAccount } from './pages/CreateAccount';
import {Profil} from './pages/Profil';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


const router = createBrowserRouter([
  {
    path:'/',
    element: <Accueil/>
  },
  {
    path:'/Connexion',
    element: <Connexion/>
  },
  {
    path:'/CreateAccount',
    element: <CreateAccount/>
  },
  {
    path:'/Profil',
    element: <Profil/>
  }
  

])

function App() {
  return (
    <RouterProvider router={router} />
  )
    
}

export default App
