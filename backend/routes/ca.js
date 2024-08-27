const express = require("express");
const router = express.Router();
const authToken = require("../authMiddleware");
const db = require("../dbConfig");

router.get("/history", authToken, (req, res) => {
  const userId = req.user.id;
  const sqlHistory = "SELECT * FROM ChiffreAffaire WHERE user_id=?";

  db.query(sqlHistory, [userId], (err, result) => {
    if (err) {
      console.error("Erreur lors de la requête", err);
      return res.status(500).json({ status: false, message: "Erreur serveur" });
    }
    if (result.length === 0) {
      return res.status(200).json({
        status: true,
        empty: true,
        message: "vous n'avez pas encore enregistré de chiffre d'affaire",
      });
    } else {
      return res
        .status(200)
        .json({ status: true, empty: false, history: result });
    }
  });
});

module.exports = router;
