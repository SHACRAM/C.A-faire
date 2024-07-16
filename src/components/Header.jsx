import React from "react";
import { NavLink } from "react-router-dom";

export const Header=()=>{
    return(
        <div className="flex justify-between p-3">
            <h1 className="text-[2em]">C.A faire</h1>
            <ul>
                <li><NavLink to='/Connection'>Se connecter</NavLink></li>
            </ul>
        </div>
    )
}