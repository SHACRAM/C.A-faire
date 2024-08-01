const express = require('express');
const router = express.Router();
const authToken = require('../authMiddleware');
const db = require('../dbConfig');
/**
 * Ajouter un chiffre d'affaire
 * @param INT - Ajoute le montant du chiffre d'affaire
 * @param DATE -Ajoute la date du jour lors de la transaction
 * @return {object} - Un objet avec le status de la réponse avec un message de confirmation ou non
 */
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
