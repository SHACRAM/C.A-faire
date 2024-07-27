import React, { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export const Header=()=>{
    const isLoggedIn = !!localStorage.getItem('token');
    const enterprise = localStorage.getItem('enterprise');
    const navigate = useNavigate();

    const handleLogout = ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('enterprise');
        navigate('/Connexion');
    }

    return(
        <div className="flex justify-between p-3">
            <NavLink to='/'> <h1 className="text-[2em]">C.A faire</h1></NavLink>
           
            {isLoggedIn? (
                <ul className="flex flex-col">
                    <li><NavLink to='/profil' className='text-sm'>{enterprise}</NavLink></li>
                    <li><button onClick={handleLogout} className='text-sm'>Se déconnecter</button></li>
                </ul>) : 
                <ul className="flex flex-col">
                    <li><NavLink to='/Connexion' className='text-sm'>Se connecter</NavLink></li>
                    <li><NavLink to='/CreateAccount' className='text-sm'>Créer un compte</NavLink></li>
                </ul>
            }
                
            
            
        </div>
    )
}