import React from "react";
import { Header } from "../components/Header";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CreateAccount=()=>{
    const navigate = useNavigate();
    const [enterprise, setEnterprise]= useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);


    const handleSubmit = async (e)=>{
        e.preventDefault();

        try{
            const response = await axios.post ('http://localhost:3000/createAccount', {enterprise, email, password});
            if(response.data.status){
                setMessage('Compte crée avec succés');
                setTimeout(() => {
                    navigate('/Connexion');
                }, 2000);
                setIsSuccess(true)
            }else {
                setMessage('Erreur lors de la création du compte');
                setIsSuccess(false)
            }

        }catch (error){
            console.error('Erreur, impossible de créer votre compte');
            setIsSuccess(false);
        }
    }
    return(
        <div>
            <Header/>
            <div className="m-5 flex flex-col gap-3 ">
                <h1>Merci de renseigner vos informations</h1>
                <div className=" bg-[#F99884]">
                    <form onSubmit={handleSubmit} className="flex flex-col ml-5 p-3 gap-3">
                        <div>
                            <label htmlFor="enterpriseName">Nom de l'entreprise</label>
                            <input type="text" name="enterpriseName" id="enterpriseName" className="w-[15em]" onChange={(e)=>{setEnterprise(e.target.value)}} required/>
                        </div>

                        <div>
                            <label htmlFor="email">Votre email</label>
                            <input type="email" id="email" name='email'className="w-[15em]" onChange={(e)=>{setEmail(e.target.value)}} required/>
                        </div>

                        <div>
                            <label htmlFor="password">Mot de passe</label>
                            <input type="password" name="password" id="password" className="w-[15em]" onChange={(e)=>{setPassword(e.target.value)}} required/>
                        </div>
                        <button type="submit" className="flex justify-center mt-3 w-[12em] border border-black">Créer le compte</button>
                    </form>
                </div>
                {message && (
                <p className={`flex justify-center p-3 text-white ${isSuccess ? 'bg-green-500' : 'bg-red-600'}`}>
                    {message}
                </p>
            )}
            </div>
        </div>
    )
}