import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "../components/Header";
import axios from "../../backend/utils/axiosConfig";
import { useNavigate } from "react-router-dom";

export const ProfilForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [profil] = location.state;
  const [nomSalon, setNomSalon] = useState(profil[0].nomSalon);
  const [adresseSalon, setAdresseSalon] = useState(profil[0].adresseSalon);
  const [dateOuverture, setDateOuverture] = useState(profil[0].dateOuverture);
  const [nombreEmployes, setNombreEmployes] = useState(
    profil[0].nombreEmployes
  );
  const [prenomGerant, setPrenomgerant] = useState(profil[0].prenomGerant);
  const [nomGerant, setNomGerant] = useState(profil[0].nomGerant);
  const [message, setmessage] = useState();
  const [newDate, setNewDate] = useState();
  const [isSuccess, setIsSuccess] = useState(false);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/modifyUser",
        {
          nomSalon,
          adresseSalon,
          newDate,
          nombreEmployes,
          prenomGerant,
          nomGerant,
        }
      );
      if (response.data.status) {
        setmessage("Modifications enregistrées");
        setIsSuccess(true);
        setTimeout(() => {
          navigate("/Profil");
        }, 2000);
      } else {
        setmessage("Erreur lors de la modification");
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("Impossible de modifier le profile");
      setIsSuccess(false);
    }
  };

  return (
    <div>
      <Header />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 bg-[#F99884] p-3 w-[30em]"
      >
        <div className="flex gap-3">
          <label htmlFor="nomSalon">Nom du salon :</label>
          <input
            type="text"
            required
            value={nomSalon}
            onChange={(e) => setNomSalon(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <label htmlFor="adresseSalon">Adresse du salon :</label>
          <input
            type="text"
            required
            value={adresseSalon}
            onChange={(e) => setAdresseSalon(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <label htmlFor="dateOuverture">date d'ouverture :</label>
          <input
            type="date"
            required
            value={formatDate(dateOuverture)}
            onChange={(e) => setNewDate(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <label htmlFor="nombreEmployes">Nombre d'employés :</label>
          <input
            type="number"
            required
            value={nombreEmployes}
            onChange={(e) => setNombreEmployes(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <label htmlFor="prenomGerant">Prénom du gérant :</label>
          <input
            type="text"
            required
            value={prenomGerant}
            onChange={(e) => setPrenomgerant(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <label htmlFor="nomGerant">Nom du gérant :</label>
          <input
            type="text"
            required
            value={nomGerant}
            onChange={(e) => setNomGerant(e.target.value)}
          />
        </div>
        <button type="submit" className="border w-[8em]">
          Enregistrer
        </button>
      </form>
      {message && (
        <p
          className={`flex justify-center p-3 text-white ${
            isSuccess ? "bg-green-500" : "bg-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};
