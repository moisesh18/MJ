require('dotenv').config();

// In this file you can configure migrate-mongo

const user = encodeURIComponent(process.env.MONGO_USER || "");
const pass = encodeURIComponent(process.env.MONGO_PASSWORD || "");
const host = process.env.MONGO_HOST || "cluster0.v823j3u.mongodb.net";
// Parámetros de conexión extra; se pueden sobreescribir si lo necesitas.
const params = process.env.MONGO_PARAMS || "?retryWrites=true&w=majority&appName=Cluster0";

const config = {
    mongodb: {
        url: `mongodb+srv://${user}:${pass}@${host}/${params}`,

        databaseName: process.env.MONGO_DB || "mj",

        options: {
            useNewUrlParser: true // removes a deprecation warning when connecting
            //   connectTimeoutMS: 3600000, // increase connection timeout to 1 hour
            //   socketTimeoutMS: 3600000, // increase socket timeout to 1 hour
        }
    },

    // The migrations dir, can be an relative or absolute path. Only edit this when really necessary.
    migrationsDir: "migrations",

    // The mongodb collection where the applied changes are stored. Only edit this when really necessary.
    changelogCollectionName: "changelog"
};

//Return the config as a promise
module.exports = config;
