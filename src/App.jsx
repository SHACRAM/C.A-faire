import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import "./App.css";
import { Accueil } from "./pages/Accueil";
import { Connexion } from "./pages/Connexion";
import { CreateAccount } from "./pages/CreateAccount";
import { Profil } from "./pages/Profil";
import { ProfilForm } from "./pages/ProfilForm";
import PrivateRoute from "./components/PrivateRoute";
import { DeleteAccount } from "./pages/DeleteAccount";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/Connexion" element={<Connexion />} />
        <Route path="/CreateAccount" element={<CreateAccount />} />
        <Route path="/Profil" element={<PrivateRoute element={Profil} />} />
        <Route path="/ProfilForm" element={<ProfilForm />} />
        <Route path="/DeleteAccount" element={<DeleteAccount />} />
      </Routes>
    </Router>
  );
}

export default App;
