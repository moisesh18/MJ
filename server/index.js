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
//app.use(express.static("../dist"));


//OMW server

app.listen(app.get('port'),()=>{
    console.log('Server on port', app.get('port'));
});