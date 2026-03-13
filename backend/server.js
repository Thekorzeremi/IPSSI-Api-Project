require('dotenv').config({ path: '.env.local' });
const express = require('express');
const connectDB = require('./config/database');

const app = express();

connectDB();

app.listen(process.env.API_PORT, () => {
    console.log("Serveur démarré sur le port " + process.env.API_PORT);
});