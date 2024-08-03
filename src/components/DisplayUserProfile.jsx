import React, { useState, useEffect } from "react";
import axios from "../../backend/utils/axiosConfig";
import { NavLink } from "react-router-dom";

export const DisplayUserProfile = () => {
  const [profil, setProfil] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [updateProfil, setUpdateProfil] = useState(false);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Token is not available");
      setIsLoading(false);
      return;
    }

    axios
      .get("http://localhost:3000/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.status) {
          setProfil(response.data.profil);
        } else if (response.data.updateProfil) {
          setUpdateProfil(true);
        } else {
          setError("Profil non trouvé");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Chargement en cours...</p>;
  if (error)
    return <p>Erreur lors du chargement du profil: {error.message || error}</p>;
  if (updateProfil)
    return <NavLink to="/update-profile">Compléter mon profil</NavLink>;

  return (
    <div className="m-5">
      <h2 className="text-[1.5rem] mb-3 flex justify-center">
        Mon profil entreprise
      </h2>
      {profil && profil.length > 0 ? (
        <div className="flex flex-col gap-3">
          <div className="flex gap-3 items-center">
            <h3 className="text-[1.2rem]">Nom du Salon:</h3>
            <p>{profil[0].nomSalon}</p>
          </div>
          <div className="flex gap-3 items-center">
            <h3 className="text-[1.2rem]">Adresse du Salon:</h3>
            <p>{profil[0].adresseSalon}</p>
          </div>
          <div className="flex gap-3 items-center">
            <h3 className="text-[1.2rem]">Date d'Ouverture:</h3>
            <p>{formatDate(profil[0].dateOuverture)}</p>
          </div>
          <div className="flex gap-3 items-center">
            <h3 className="text-[1.2rem]">Nombre d'Employés:</h3>
            <p>{profil[0].nombreEmployes}</p>
          </div>
          <div className="flex gap-3 items-center">
            <h3 className="text-[1.2rem]">Prénom du Gérant:</h3>
            <p>{profil[0].prenomGerant}</p>
          </div>
          <div className="flex gap-3 items-center">
            <h3 className="text-[1.2rem]">Nom du Gérant:</h3>
            <p>{profil[0].nomGerant}</p>
          </div>
          <NavLink
            to="/ProfilForm"
            className="border w-[15em] flex justify-center p-3"
            state={[profil]}
          >
            Modifier mes informations
          </NavLink>
        </div>
      ) : (
        <p>Profil non trouvé</p>
      )}
    </div>
  );
};
