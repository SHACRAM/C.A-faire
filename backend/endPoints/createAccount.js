const express = require('express');
const router = express.Router();
const db = require('../dbConfig');
const bcrypt = require('bcrypt');

/**
 * Création d'un compte utilisateur avec encryption du mot de passe
 * @param {String} req.body.enterprise -Reçois le nom de l'entreprise
 * @param {String} req.body.email  -Reçois l'email de l'utilisateur
 * @param {String} req.body.password -Reçois le mot de passe de l'utilisateur
 * @return {object} La réponse en json contenant le status de la reponse avec un message de confirmation
 */
router.post('/', async (req, res)=>{
    const {enterprise, email, password} = req.body;
    
    try{
        const hashedPassword = await bcrypt.hash(password, 10);

        if(!enterprise || !email || !password){
            return res.status(400).json({status: false, message: 'Tous les champs sont obligatoires'})
        }else{
            const sql = 'INSERT INTO Users (enterprise, email, password) VALUES (?, ?, ?)';
            db.query(sql, [enterprise, email, hashedPassword], (err, result)=>{
                if(err){
                    console.error('Erreur lors de cla création du compte', err)
                }else{
                    return res .status(201).json({status: true, message:'Le compte à été crée avec succès'})
                }
            })
        }} catch (error){
            console.error('Erreur lors du hachage du mot de passe', error);
            return res.status(500).json({ status: false, message: 'Erreur interne du serveur' });
        }

    

})



module.exports = router;