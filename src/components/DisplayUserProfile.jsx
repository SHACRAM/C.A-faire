import React, { useState, useEffect } from "react";
import axios from '../../backend/utils/axiosConfig';

export const DisplayUserProfile = () => {
    const [profil, setProfil] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:3000/userProfil')
        .then(response => {
            setProfil(response.data.profil);
            setIsLoading(false);
        })
        .catch(error => {
            setError(error);
            setIsLoading(false);
        });
    }, []); 

    if (isLoading) return <p>Chargement en cours...</p>;
    if (error) return <p>Erreur lors du chargement du profil: {error.message}</p>;

    return (
        <div className="m-5">
            <h2 className="text-[1.5rem]">Mon profil entreprise</h2>
            {profil && (
                <div>
                    <p>Nom du Salon: {profil.nomDuSalon}</p>
                    <p>Adresse du Salon: {profil.adresseSalon}</p>
                    <p>Date d'Ouverture: {profil.dateOuverture}</p>
                    <p>Nombre d'Employés: {profil.nombreEmployes}</p>
                    <p>Prénom du Gérant: {profil.prenomGerant}</p>
                    <p>Nom du Gérant: {profil.nomGerant}</p>
                </div>
            )}
        </div>
    );
};
