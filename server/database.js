const mongoose = require('mongoose');

const URI = 'mongodb://172.16.174.214/mj';
mongoose.connect(URI, { useNewUrlParser: true })
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));
module.exports = mongoose;
