import React from "react";
import { Header } from "../components/Header";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CreateAccount = () => {
  const navigate = useNavigate();
  const [enterprise, setEnterprise] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [nomSalon, setNomSalon] = useState("");
  const [adresseSalon, setAdresseSalon] = useState("");
  const [dateOuverture, setDateOuverture] = useState("");
  const [nombreEmployes, setNombreEmployes] = useState("");
  const [prenomGerant, setPrenomGerant] = useState("");
  const [nomGerant, setNomGerant] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/authentication/signup",
        {
          enterprise,
          email,
          password,
          nomSalon,
          adresseSalon,
          dateOuverture,
          nombreEmployes,
          prenomGerant,
          nomGerant,
        }
      );
      if (response.data.status) {
        setMessage("Compte crée avec succés");
        setTimeout(() => {
          navigate("/Connexion");
        }, 2000);
        setIsSuccess(true);
      } else {
        setMessage("Erreur lors de la création du compte");
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("Erreur, impossible de créer votre compte");
      setIsSuccess(false);
    }
  };
  return (
    <div>
      <Header />
      <div className="m-5 flex flex-col gap-3 ">
        <h1>Merci de renseigner vos informations</h1>
        <div className=" bg-[#F99884]">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col ml-5 p-3 gap-3"
          >
            <div>
              <label htmlFor="enterpriseName">Nom de l'entreprise</label>
              <input
                type="text"
                name="enterpriseName"
                id="enterpriseName"
                className="w-[15em]"
                onChange={(e) => {
                  setEnterprise(e.target.value);
                }}
                required
              />
            </div>
            <div>
              <label htmlFor="nomSalon">Nom du Salon</label>
              <input
                type="text"
                name="nomSalon"
                id="nomSalon"
                required
                className="w-[15em]"
                onChange={(e) => {
                  setNomSalon(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="adresseSalon">Adresse du salon</label>
              <input
                type="text"
                required
                name="adresseSalon"
                id="adresseSalon"
                className="w-[15em]"
                onChange={(e) => {
                  setAdresseSalon(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="dateOuverture">Date d'ouverture du salon</label>
              <input
                type="date"
                required
                name="dateOuverture"
                id="dateOuverture"
                className="w-[15em]"
                onChange={(e) => {
                  setDateOuverture(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="nombreEmployes">Nombre d'employes</label>
              <input
                type="number"
                required
                name="nombreEmployes"
                id="nombreEmployes"
                className="w-[15em]"
                onChange={(e) => {
                  setNombreEmployes(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="prenomGerant">
                Prénom du gérant de l'entreprise
              </label>
              <input
                type="text"
                required
                name="prenomGerant"
                id="prenomGerant"
                className="w-[15em]"
                onChange={(e) => {
                  setPrenomGerant(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="nomGerant">Nom du gérant de l'entreprise</label>
              <input
                type="text"
                required
                name="nomGerant"
                id="nomGerant"
                className="w-[15em]"
                onChange={(e) => {
                  setNomGerant(e.target.value);
                }}
              />
            </div>

            <div>
              <label htmlFor="email">Votre email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-[15em]"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
            </div>

            <div>
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                name="password"
                id="password"
                className="w-[15em]"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
            </div>
            <button
              type="submit"
              className="flex justify-center mt-3 w-[12em] border border-black"
            >
              Créer le compte
            </button>
          </form>
        </div>
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
    </div>
  );
};
