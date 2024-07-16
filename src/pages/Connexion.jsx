import React from "react";
import { Header } from "../components/Header";

export const Connexion=()=>{
    return(
        <div>
            <Header/>
            <div className="m-5 bg-[#F99884]">
                <form action="" method='POST' className="flex flex-col ml-5 p-3">
                    <label htmlFor="email">Votre email</label>
                    <input type="email" id="email" name='email'className="w-[15em]" required/>
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" name="password" id="password" className="w-[15em]" required/>
                    <button type="submit" className="flex justify-center mt-3 w-[6em] border border-black">Connection</button>
                </form>
            </div>
        </div>
    )
}