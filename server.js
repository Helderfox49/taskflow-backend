require("dotenv").config();

const express = require("express");
const mongoose =  require("mongoose");
const cors = require("cors");

const app = express();

//Route de test
app.get("/api/ping", (req, res) =>{
    res.json({
        message: "Serveur TaskFlow operationnel"
    })
});



//Vérification à la connexion de Mongo DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connecté avec succès.");

        // Le serveur ne démarre que si la connexion à la base de données réussit
        app.listen(process.env.PORT, () => {
            console.log(`Serveur démarré sur le port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.error("Erreur de connexion à MongoDB :", err.message);
    });