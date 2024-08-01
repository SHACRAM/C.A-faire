// app.js
const express = require('express');
const app = express();
const db = require('./dbConfig'); 
const jwt = require('jsonwebtoken');
const login = require("./endPoints/login");
const createAccount = require('./endPoints/createAccount');
const addCA = require('./endPoints/addCA');
const displayUserprofil = require('./endPoints/userProfil');


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


app.use("/login", login);
app.use("/createAccount", createAccount);
app.use("/addCA", addCA);
app.use("/userProfil", displayUserprofil);








module.exports = app;
