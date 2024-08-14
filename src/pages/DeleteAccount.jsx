import React from "react";
import { Header } from "../components/Header";
import { useNavigate } from "react-router-dom";
import axios from "../../backend/utils/axiosConfig";
import { useState } from "react";

export const DeleteAccount = () => {
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/Profil");
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        "http://localhost:3000/api/user/deleteAccount",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.status) {
        setMessage("Le compte à été supprimé");
        setIsSuccess(true);
        localStorage.removeItem("token");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setMessage("Erreur lors de la suppression du compte");
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du compte:", error);
      setMessage("Une erreur s'est produite. Veuillez réessayer.");
      setIsSuccess(false);
    }
  };

  return (
    <div>
      <Header />
      <h2>êtes- vous sur de vouloir supprimer votre compte?</h2>
      <div className="border p-5 w-[10em] flex justify-around">
        <button onClick={handleDelete} className="border w-10 ">
          Oui
        </button>
        <button onClick={handleNavigate} className="border w-10">
          non
        </button>
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
  );
};
