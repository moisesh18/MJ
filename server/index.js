const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const {mongoose} = require('./database');

//Server global settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: '*'}));


//Routes
app.use('/api/students',require('./routes/students.routes'));
app.use('/api/directors',require('./routes/directors.routes'));
app.use('/api/enrolls',require('./routes/enrolls.routes'));
app.use('/api/clubs',require('./routes/clubs.routes'));
app.use('/api/cycles',require('./routes/cycles.routes'));

// Create link to Angular build directory
//var distDir = __dirname + "/dist/";
//app.use(express.static(distDir));
app.use("/*",express.static(__dirname + "/dist/")); 


//OMW server

app.listen(app.get('port'),()=>{
    console.log('Server on port', app.get('port'));
});