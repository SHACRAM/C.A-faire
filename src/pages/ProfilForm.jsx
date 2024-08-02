import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "../components/Header";

export const ProfilForm = () => {
  const location = useLocation();
  const [profil] = location.state;
  return (
    <div>
      <Header />
      <form>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </form>
    </div>
  );
};
