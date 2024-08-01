const express = require('express');
const router = express.Router();
const authToken = require('../authMiddleware');
const db = require('../dbConfig');

router.get('/', authToken, (req, res) => {
    const user_id = req.user.id;
    const sql = "SELECT * FROM Profile WHERE user_id = ?";

    db.query(sql, [user_id], (err, result) => {
        if (err) {
            console.error('Erreur lors de la requête SQL', err);
            return res.status(500).json({ status: false, message: 'Erreur serveur' });
        }

        if (result.length === 0) {
            return res.status(404).json({ status: false, message: 'Le profil n\'a pu être chargé' });
        } else {
            return res.status(200).json({ status: true, profil: result });
        }
    });
});

module.exports = router;
