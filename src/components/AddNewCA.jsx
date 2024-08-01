import React, { useState } from "react";
import axios from '../../backend/utils/axiosConfig';

export const AddNewCA = () => {
    const [montant, setMontant] = useState('');
    const [message, setMessage] = useState('');
    const [valide, setValide] = useState(false);
    const date = new Date();
    const monthName = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    const month = date.getMonth();
    const year = date.getFullYear();
    const dateDuJour = date.toISOString().split('T')[0];
    const actualMonth = monthName[month];
// Fonction pour soumettre les informations
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/addCA', { montant, dateDuJour });
            if (response.data.status) {
                setMessage('Votre chiffre d\'affaire a été enregistré');
                setValide(true);
            } else {
                setMessage('Merci de renseigner un montant valide');
                setValide(false);
            }
        } catch (error) {
            console.error("Une erreur s'est produite", error);
            setMessage('Erreur lors de l\'enregistrement');
            setValide(false);
        }
    };
// Formulaire pour ajouter un nouveau chiffre d'affaire
    return (
        <div className="flex flex-col items-center m-5">
            <h2 className="text-[1.5rem]">Chiffre d'affaire</h2>
            <h3>Enregistrer mon chiffre d'affaire de {actualMonth} {year}</h3>
            <div className="flex justify-center flex-col w-[100%] items-center">
                <form onSubmit={handleSubmit} className="bg-[#F99884] flex flex-col w-[75%] items-center gap-3">
                    <label>Saisir le montant</label>
                    <input type="number" onChange={(e) => setMontant(e.target.value)} required className="w-[50%]" />
                    <button type="submit" className="w-[10em] border mb-3">Enregistrer</button>
                </form>
                {message && (
                    <p className={`flex justify-center p-3 text-white w-[75%] ${valide ? 'bg-green-500' : 'bg-red-600'}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};
