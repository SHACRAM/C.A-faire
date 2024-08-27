import React from "react";
import { Header } from "../components/Header";
import { AddNewCA } from "../components/AddNewCA";
import { DisplayUserProfile } from "../components/DisplayUserProfile";
import { NavLink } from "react-router-dom";
import { DisplayAllCa } from "../components/DisplayAllCa";

export const Profil = () => {
  return (
    <div>
      <Header />
      <div>
        <DisplayUserProfile />
        <NavLink to="/DeleteAccount" className="text-red-500 p-5">
          Supprimer mon compte
        </NavLink>
      </div>
      <div>
        <AddNewCA />
      </div>
      <div>
        <DisplayAllCa />
      </div>
    </div>
  );
};
