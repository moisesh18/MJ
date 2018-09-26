const mongoose = require('mongoose');

//const URI = 'mongodb://doulos:mjDoulos1@ds251112.mlab.com:51112/heroku_t057fgfq';
const URI = 'mongodb://localhost/mj';
mongoose.connect(URI,{ useNewUrlParser: true })
    .then(db => console.log('DB is connected'))
    .catch (err => console.error(err));
module.exports = mongoose;
