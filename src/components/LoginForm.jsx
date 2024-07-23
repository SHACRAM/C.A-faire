import React, { useState } from "react";

export const LoginForm=()=>{
    const {email, setEmail} = useState('');
    const {password, setPassword} = useState('');

    const handleSubmit= async (e)=>{
        e.preventDefault();

         const loginData={
            email,
            password
         }

         try{
            const response = await fetch('api/Login', {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData)
            });

            if (response.ok){
                const data = await response.json();
                console.log('login success', data);
            }else{
                console.log('fail to login');
            }

         }catch (error){
            console.error('There is an error', error);
         }
        

    };


    return(
        <div className="m-5 bg-[#F99884] flex justify-center lg:w-[40%]">
                <form onSubmit={handleSubmit} className="flex flex-col ml-5 p-3">
                    <label>Votre email</label>
                    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-[80%] lg:w-[20em] " required/>
                    <label>Mot de passe</label>
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-[80%] lg:w-[20em]" required/>
                    <button type="submit" className="flex justify-center mt-3 w-[6em] border border-black">Connection</button>
                </form>
            </div>
    )
}