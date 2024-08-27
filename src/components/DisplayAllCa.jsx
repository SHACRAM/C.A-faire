import React, { useState, useEffect } from "react";
import axios from "../../backend/utils/axiosConfig";

export const DisplayAllCa = () => {
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);
  const [moyenneCA, setMoyenneCA] = useState();

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (history.length > 0) {
      let somme = 0;
      history.forEach((row) => {
        somme += row.montant;
      });
      const moyenne = somme / history.length;
      setMoyenneCA(moyenne);
    } else {
      setMoyenneCA(0);
    }
  }, [history]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:3000/api/ca/history", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data.status && response.data.empty) {
          setMessage(response.data.message);
        } else if (response.data.status && !response.data.empty) {
          setHistory(response.data.history);
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données:", error);
      });
  }, []);

  return (
    <div>
      <h2 className="text-[1.5rem] mb-3 ml-3 flex justify-center">
        Mon historique
      </h2>
      <h3 className="ml-3 mt-8">Historique de tous mes chiffres d'affaires:</h3>
      {history.map((row, index) => (
        <div key={index} className="flex gap-5 mb-3 mt-3 ml-3">
          <p>{formatDate(row.datePeriode)}</p>
          <p>{row.montant} €</p>
        </div>
      ))}
      <div className="ml-3">
        <h3>Moyenne de votre chiffre d'affaire</h3>
        <p className="bg-[#F99884] flex-wrap">{moyenneCA} €</p>
      </div>
    </div>
  );
};
