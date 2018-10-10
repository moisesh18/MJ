const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const {mongoose} = require('./database');

//Server global settings
app.set('port', 8082);

//Middlewares
app.use(morgan('dev')); //developer logs
app.use(express.json());
app.use(cors({origin: ['http://localhost:4200','http://localhost:8081']}));


//Routes
app.use('/api/students',require('./routes/students.routes'));
app.use('/api/directors',require('./routes/directors.routes'));
app.use('/api/enrolls',require('./routes/enrolls.routes'));
app.use('/api/clubs',require('./routes/clubs.routes'));
app.use('/api/cycles',require('./routes/cycles.routes'));


//OMW server
app.listen(app.get('port'),()=>{
    console.log('Server on port', app.get('port'));
});