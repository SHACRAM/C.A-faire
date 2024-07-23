import React from "react";
import { Header } from "../components/Header";
import { LoginForm } from "../components/LoginForm";


export const Connexion=()=>{
    return(
        <div>
            <Header/>
            <div className="flex justify-center">
                <LoginForm/>
            </div>
            
        </div>
    )
}