import React from "react";
import { Header } from "../components/Header";
import { AddNewCA } from "../components/AddNewCA";
import { DisplayUserProfile } from "../components/DisplayUserProfile";

export const Profil = ()=>{

    return(<div>
        <Header/>
        <div>
            <DisplayUserProfile/>
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