require('dotenv').config();
const mongoose = require('mongoose');

// Si la variable de entorno MONGODB_URI existe, úsala tal cual.
// De lo contrario, construye la cadena con usuario, contraseña y host/cluster.

const {
  MONGODB_URI,
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_HOST = 'localhost',
  MONGO_DB = 'mj'
} = process.env;

let URI;

if (MONGODB_URI) {
  URI = MONGODB_URI;
} else if (MONGO_USER && MONGO_PASSWORD && MONGO_HOST.includes('mongodb.net')) {
  URI = `mongodb+srv://${encodeURIComponent(MONGO_USER)}:${encodeURIComponent(MONGO_PASSWORD)}@${MONGO_HOST}/${MONGO_DB}?retryWrites=true&w=majority`;
} else {
  URI = `mongodb://${MONGO_HOST}/${MONGO_DB}`;
}

mongoose.connect(URI, {
  useNewUrlParser: true
})
  .then(db => console.log('Base de datos conectada: ' + URI))
  .catch(err => console.error("Imposible conectar a " + URI));
module.exports = mongoose;
