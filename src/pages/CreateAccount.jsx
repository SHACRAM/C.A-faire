import React from "react";
import { Header } from "../components/Header";

export const CreateAccount=()=>{
    return(
        <div>
            <Header/>
            <div className="m-5 flex flex-col gap-3 ">
                <h1>Merci de renseigner vos informations</h1>
                <div className=" bg-[#F99884]">
                    <form action="" method='POST' className="flex flex-col ml-5 p-3 gap-3">
                        <div>
                            <label htmlFor="enterpriseName">Nom de l'entreprise</label>
                            <input type="text" name="enterpriseName" id="enterpriseName" className="w-[15em]"/>
                        </div>

                        <div>
                            <label htmlFor="email">Votre email</label>
                            <input type="email" id="email" name='email'className="w-[15em]"/>
                        </div>

                        <div>
                            <label htmlFor="password">Mot de passe</label>
                            <input type="password" name="password" id="password" className="w-[15em]" />
                        </div>
                        <button type="submit" className="flex justify-center mt-3 w-[12em] border border-black">Créer le compte</button>
                    </form>
                </div>
            </div>
        </div>
    )
}