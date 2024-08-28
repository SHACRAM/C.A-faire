import React from "react";
import { Header } from "../components/Header";

export const Accueil = () => {
  return (
    <div>
      <Header />
      <div className="p-5">
        <h2 className="mb-3 text-lg">Qui sommes-nous?</h2>
        <p>
          Nous sommes spécialisés dans la collecte et l'analyse des chiffres
          d'affaires des salons d'esthétique. Notre plateforme innovante permet
          aux propriétaires de salons de répertorier facilement leurs
          performances financières et de suivre l'évolution de leur chiffre
          d'affaires au fil du temps.
        </p>
        <h2 className="text-lg mt-5 mb-3">Nos services</h2>
        <ul className="flex flex-col gap-3">
          <li>
            -Enregistrer et consulter l'historique de vos chiffres d'affaires
          </li>
          <li>-Analyser les tendances de croissance de votre salon</li>
        </ul>
      </div>
    </div>
  );
};
