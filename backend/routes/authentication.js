const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../dbConfig");
const bcrypt = require("bcrypt");
const sendConfirmationEmail = require("../nodeMailer");

/**
 * Crée un jeton JWT à partir des données fournies.
 *
 * @param {Object} jsonData - Les données à inclure dans le jeton.
 * @returns {string|null} Le jeton JWT ou null en cas d'erreur.
 */

const createTokenFromJson = (jsonData) => {
  try {
    const secretKey = "secretKey";
    const token = jwt.sign(jsonData, secretKey);
    return token;
  } catch (error) {
    console.log("error :", error.message);
    return null;
  }
};

/**
 * Route de connexion.
 *
 * @route POST /signin
 * @param {string} req.body.email - L'email de l'utilisateur.
 * @param {string} req.body.password - Le mot de passe de l'utilisateur.
 * @returns {Object} La réponse JSON contenant le statut et le jeton JWT si la connexion est réussie.
 */

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const sql =
    "SELECT id, enterprise, email, password FROM Users WHERE email = ?";

  db.query(sql, [email], async (err, data) => {
    if (err) return res.json("Echec de la connexion");
    if (data.length > 0) {
      const enterprise = data[0];
      const passwordMatch = await bcrypt.compare(password, enterprise.password);

      if (passwordMatch) {
        const jsonData = {
          email: enterprise.email,
          enterprise: enterprise.enterprise,
          id: enterprise.id,
        };
        const token = createTokenFromJson(jsonData);

        if (token) {
          return res.status(200).json({
            status: true,
            message: "Connexion réussie",
            token: token,
            enterprise: enterprise.enterprise,
          });
        } else {
          return res
            .status(500)
            .json({ status: false, message: "Échec de la création du jeton" });
        }
      } else {
        return res
          .status(401)
          .json({ status: false, message: "Identifiant incorrect" });
      }
    } else {
      return res
        .status(401)
        .json({ status: false, message: "Identifiant incorrect" });
    }
  });
});

/**
 * Création d'un compte utilisateur avec encryption du mot de passe
 * @param {String} req.body.enterprise -Reçois le nom de l'entreprise
 * @param {String} req.body.email  -Reçois l'email de l'utilisateur
 * @param {String} req.body.password -Reçois le mot de passe de l'utilisateur
 * @return {object} La réponse en json contenant le status de la reponse avec un message de confirmation
 */
router.post("/signup", async (req, res) => {
  const {
    enterprise,
    email,
    password,
    nomSalon,
    adresseSalon,
    dateOuverture,
    nombreEmployes,
    prenomGerant,
    nomGerant,
  } = req.body;
  //Fonction qui permet la vérification de la présence de majuscules, caractères spéciaux et longeur du mot de passe
  function validatePassword(password) {
    const error = [];
    if (password.length < 8) {
      error.push("Le mot de passe doit contenir au minimum 8 caratères");
    }
    if (!/[A-Z]/.test(password)) {
      error.push("Le mot de passe doit contenir au moins une majuscule");
    }
    if (!/\d/.test(password)) {
      error.push("Le mot de passe doit contenir au moins un chiffre");
    }
    if (!/[@$!%*?&]/.test(password)) {
      error.push("Le mot de passe doit contenir au moins un caractère spécial");
    }
    return error;
  }

  // Vérification des champs obligatoires
  if (!enterprise || !email || !password) {
    return res
      .status(400)
      .json({ status: false, message: "Tous les champs sont obligatoires" });
  }

  try {
    let hashedPassword;
    const passwordErrors = validatePassword(password);
    // Si le mot de passe ne satisfait pas tous les critères
    if (passwordErrors.length > 0) {
      return res.status(400).json({
        status: false,
        message: passwordErrors.join(" "),
      });
    }

    // Si le mot de passe est valide, on le hache
    hashedPassword = await bcrypt.hash(password, 10);

    // Insertion dans la base de données
    const sql =
      "INSERT INTO Users (enterprise, email, password, nomSalon, adresseSalon, dateOuverture, nombreemployes, prenomGerant, nomGerant ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      sql,
      [
        enterprise,
        email,
        hashedPassword,
        nomSalon,
        adresseSalon,
        dateOuverture,
        nombreEmployes,
        prenomGerant,
        nomGerant,
      ],
      (err, result) => {
        if (err) {
          console.error("Erreur lors de la création du compte", err);
          return res.status(500).json({
            status: false,
            message: "Erreur lors de la création du compte.",
          });
        } else {
          sendConfirmationEmail(req.body.email);
          return res.status(201).json({
            status: true,
            message: "Le compte a été créé avec succès",
          });
        }
      }
    );
  } catch (error) {
    console.error("Erreur lors du processus de création de compte", error);
    return res
      .status(500)
      .json({ status: false, message: "Erreur interne du serveur" });
  }
});

module.exports = router;
