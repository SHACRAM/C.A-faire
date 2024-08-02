// app.js
const express = require('express');
const db = require('./dbConfig'); 
const jwt = require('jsonwebtoken');
const authenticationRouter = require("./routes/authentication");
const userRouter= require('./routes/user');

const app = express();
app.use(express.json());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Connexion à la base de données
db.connect((err)=>{
    if(err){
        console.error("Erreur de connexion:" +err.stack)
        return
    }
    console.log("Connexion réussie à la bdd")
})


app.use("/api/authentication", authenticationRouter);
app.use("/api/user", userRouter);




module.exports = app;
