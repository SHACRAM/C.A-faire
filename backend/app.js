const express = require("express");
const cors = require("cors"); // Importer le middleware CORS
const db = require("./dbConfig");
const jwt = require("jsonwebtoken");
const authenticationRouter = require("./routes/authentication");
const userRouter = require("./routes/user");
const caRouter = require("./routes/ca");

const app = express();
app.use(express.json());

// Utilisation du middleware CORS
app.use(cors()); // Activer CORS pour toutes les routes

// Connexion à la base de données
db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion:" + err.stack);
    return;
  }
  console.log("Connexion réussie à la bdd");
});

app.use("/api/authentication", authenticationRouter);
app.use("/api/user", userRouter);
app.use("/api/ca", caRouter);

module.exports = app;
