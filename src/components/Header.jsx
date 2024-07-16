import React from "react";
import { NavLink } from "react-router-dom";

export const Header=()=>{
    return(
        <div className="flex justify-between p-3">
            <NavLink to='/'> <h1 className="text-[2em]">C.A faire</h1></NavLink>
           
            
                <ul className="flex flex-col">
                    <li><NavLink to='/Connexion' className='text-sm'>Se connecter</NavLink></li>
                    <li><NavLink to='/CreateAccount' className='text-sm'>Créer un compte</NavLink></li>
                </ul>
            
            
        </div>
    )
}