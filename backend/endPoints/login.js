const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../dbConfig'); 
const bcrypt = require('bcrypt');



/**
 * Crée un jeton JWT à partir des données fournies.
 * 
 * @param {Object} jsonData - Les données à inclure dans le jeton.
 * @returns {string|null} Le jeton JWT ou null en cas d'erreur.
 */

const createTokenFromJson = (jsonData)=>{
    try{
        const secretKey = "secretKey"
        const token = jwt.sign(jsonData, secretKey)
        return token

    }catch(error){
        console.log("error :", error.message)
        return null
    }
}


/**
 * Route de connexion.
 * 
 * @route POST /login
 * @param {string} req.body.email - L'email de l'utilisateur.
 * @param {string} req.body.password - Le mot de passe de l'utilisateur.
 * @returns {Object} La réponse JSON contenant le statut et le jeton JWT si la connexion est réussie.
 */

router.post("/",async (req, res)=>{
    const {email, password} = req.body;
    
    const sql = 'SELECT id, enterprise, email, password FROM Users WHERE email = ?'
    
    db.query(sql, [email],async  (err, data)=>{
        if(err) return res.json('Echec de la connexion');
        if(data.length > 0){
            const enterprise = data[0]
            const passwordMatch = await bcrypt.compare(password, enterprise.password )

            if (passwordMatch) {
                const jsonData = { email: enterprise.email, enterprise: enterprise.enterprise, id: enterprise.id};
                const token = createTokenFromJson(jsonData);

                if (token) {
                    return res.status(200).json({ status: true, message: "Connexion réussie", token: token, enterprise: enterprise.enterprise });
                } else {
                    return res.status(500).json({ status: false, message: 'Échec de la création du jeton' });
                }
            } else {
                return res.status(401).json({ status: false, message: 'Identifiant incorrect' });
            }
        } else {
            return res.status(401).json({ status: false, message: 'Identifiant incorrect' });
        }
    });
});

module.exports = router;