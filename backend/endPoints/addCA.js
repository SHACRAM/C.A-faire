const express = require('express');
const router = express.Router();
const authToken = require('../authMiddleware');
const db = require('../dbConfig');

router.post('/', authToken, (req, res, next) => {
    const { montant, dateDuJour } = req.body;
    const user_id = req.user.id;

    const sql = 'INSERT INTO ChiffreAffaire (montant, datePeriode, user_id) VALUES (?, ?, ?)';
    db.query(sql, [montant, dateDuJour, user_id], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'enregistrement du chiffre d\'affaire', err);
            return res.status(500).json({ status: false, message: 'Erreur interne du serveur' });
        } else {
            return res.status(200).json({ status: true, message: 'Le chiffre d\'affaire a été enregistré' });
        }
    });
});

module.exports = router;
