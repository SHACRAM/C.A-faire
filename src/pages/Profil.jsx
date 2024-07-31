import React from "react";
import { Header } from "../components/Header";
import { AddNewCA } from "../components/AddNewCA";

export const Profil = ()=>{

    return(<div>
        <Header/>
        <div>
            //TODO affichage des informations du profil
        </div>
        <div>
            <AddNewCA/>
        </div>
        <div>
            //TODO affichage de l'historique des chiffres d'affaire
        </div>

    </div>
    );
}