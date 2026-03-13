const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connexion à MongoDB réussie !");
    } catch (error) {
        console.log("Erreur de connexion : ", error);
        process.exit(1);
    }
}

module.exports = connectDB;