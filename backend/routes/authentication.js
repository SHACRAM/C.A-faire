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

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    if (!enterprise || !email || !password) {
      return res
        .status(400)
        .json({ status: false, message: "Tous les champs sont obligatoires" });
    } else {
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
            console.error("Erreur lors de cla création du compte", err);
          } else {
            sendConfirmationEmail(req.body.email);
            return res.status(201).json({
              status: true,
              message: "Le compte à été crée avec succès",
            });
          }
        }
      );
    }
  } catch (error) {
    console.error("Erreur lors du hachage du mot de passe", error);
    return res
      .status(500)
      .json({ status: false, message: "Erreur interne du serveur" });
  }
});

module.exports = router;
