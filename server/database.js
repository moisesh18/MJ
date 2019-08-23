const mongoose = require('mongoose');

//const URI = 'mongodb://172.16.174.214/mj';
const URI = 'mongodb://localhost/mj';
mongoose.connect(URI, {
    useNewUrlParser: true
  })
  .then(db => console.log('Base de datos conectada: ' + URI))
  .catch(err => console.error("Imposible conectar a " + URI));
module.exports = mongoose;
