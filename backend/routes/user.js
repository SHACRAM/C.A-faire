const express = require("express");
const router = express.Router();
const authToken = require("../authMiddleware");
const db = require("../dbConfig");

/**
 * Ajouter un chiffre d'affaire
 * @param INT - Ajoute le montant du chiffre d'affaire
 * @param DATE -Ajoute la date du jour lors de la transaction
 * @return {object} - Un objet avec le status de la réponse avec un message de confirmation ou non
 */
router.post("/ca", authToken, (req, res, next) => {
  const { montant, dateDuJour } = req.body;
  const user_id = req.user.id;

  const sql =
    "INSERT INTO ChiffreAffaire (montant, datePeriode, user_id) VALUES (?, ?, ?)";
  db.query(sql, [montant, dateDuJour, user_id], (err, result) => {
    if (err) {
      console.error(
        "Erreur lors de l'enregistrement du chiffre d'affaire",
        err
      );
      return res
        .status(500)
        .json({ status: false, message: "Erreur interne du serveur" });
    } else {
      return res.status(200).json({
        status: true,
        message: "Le chiffre d'affaire a été enregistré",
      });
    }
  });
});

/**
 *Récupère le profile de l'utilisateur
 *@param INT -Utilise l'id stocké dans le jeton pour récupérer les informations en bdd
 *@return {object} Retourne un objet avec la status de la réponse et le profile de l'utilisateur
 */

router.get("/profile", authToken, (req, res) => {
  const user_id = req.user.id;
  const sql = "SELECT * FROM Users WHERE id = ?";

  db.query(sql, [user_id], (err, result) => {
    if (err) {
      console.error("Erreur lors de la requête SQL", err);
      return res.status(500).json({ status: false, message: "Erreur serveur" });
    }
    if (result.length === 0) {
      return res.status(404).json({
        status: false,
        message: "Le profil n'a pu être chargé",
        updateProfil: true,
      });
    } else {
      return res.status(200).json({ status: true, profil: result });
    }
  });
});

router.post("/modifyUser", authToken, (req, res) => {
  const {
    nomSalon,
    adresseSalon,
    newDate,
    nombreEmployes,
    prenomGerant,
    nomGerant,
  } = req.body;
  const user_id = req.user.id;

  const modifysql =
    "UPDATE Users SET nomSalon = ?, adresseSalon = ?, dateOuverture = ?, nombreEmployes= ?, prenomGerant =?, nomGerant =? WHERE id = ?";

  db.query(
    modifysql,
    [
      nomSalon,
      adresseSalon,
      newDate,
      nombreEmployes,
      prenomGerant,
      nomGerant,
      user_id,
    ],
    (err, result) => {
      if (err) {
        console.error("Erreur serveur lors d'insertion des données", err);
        return res.status(500).json({
          status: false,
          message: "Erreur lors de l'enregistrement des informations",
        });
      } else {
        return res
          .status(200)
          .json({ status: true, message: "Les données sont enregistrés" });
      }
    }
  );
});

module.exports = router;
