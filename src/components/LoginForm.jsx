import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:3000/login', { email, password });
            if (response.data.status) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("enterprise", response.data.enterprise);
                setMessage('Connexion réussie!');
                setIsSuccess(true);
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                setMessage('Identifiant incorrect');
                setIsSuccess(false);
            }
        } catch (error) {
            setMessage('Erreur de connexion');
            setIsSuccess(false);
            console.error('There is an error:', error);
        }
    };

    return (
        <div className="m-5 bg-[#F99884] flex flex-col justify-center lg:w-[40%]">
            <form onSubmit={handleSubmit} className="flex flex-col ml-5 p-3">
                <label>Votre email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-[80%] lg:w-[20em]" required />
                <label>Mot de passe</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-[80%] lg:w-[20em]" required />
                <button type="submit" className="flex justify-center mt-3 w-[6em] border border-black">Connexion</button>
            </form>

            {message && (
                <p className={`flex justify-center p-3 text-white ${isSuccess ? 'bg-green-500' : 'bg-red-600'}`}>
                    {message}
                </p>
            )}
        </div>
    );
};
