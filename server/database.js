const mongoose = require('mongoose');

//en la um
const URI = 'mongodb://172.16.174.214/mj';
//localhost
//const URI = 'mongodb://localhost/mj';
mongoose.connect(URI, {
    useNewUrlParser: true
  })
  .then(db => console.log('Base de datos conectada: ' + URI))
  .catch(err => console.error("Imposible conectar a " + URI));
module.exports = mongoose;
