const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../dbConfig'); 



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

router.post("/", (req, res)=>{
    const sql = 'SELECT enterprise, email, password FROM Users WHERE email = ? AND password = ?'
    
    db.query(sql, [req.body.email,  req.body.password], (err, data)=>{
        if(err) return res.json('Echec de la connexion');
        if(data.length > 0){
            console.log(data)
            const enterprise = data[0]
                const jsonData = {email : req.body.email, password: req.body.password};
                const token = createTokenFromJson(jsonData);

                if(token){
                    return res.json({status :true, message:"Connexion réussi", token : token, enterprise: enterprise.enterprise})
                } else{
                    return res.json({status : false, message: 'Echec de la création du jeton'})
                }
        }else{
            return res.json({status : false, message: 'Identifiant incorrect'})
        }

    })
})






module.exports = router;