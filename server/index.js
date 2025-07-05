const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const { mongoose } = require('./database');
const VerifyToken = require('./verifyToken');

//Server global settings
app.set('port', 8082);

//Middlewares
app.use(morgan('dev')); //developer logs
app.use(express.json());
app.use(cors({
    origin: ['http://localhost', 'http://localhost:4200', 'http://172.16.185.129:8081']
}));


//Routes
app.use('/api/directors', require('./routes/auth.routes'));
app.use('/api/students', VerifyToken, require('./routes/students.routes'));
app.use('/api/directors', VerifyToken, require('./routes/directors.routes'));
app.use('/api/enrolls', VerifyToken, require('./routes/enrolls.routes'));
app.use('/api/clubs', VerifyToken, require('./routes/clubs.routes'));
app.use('/api/cycles', VerifyToken, require('./routes/cycles.routes'));

// Ruta de salud
app.get('/', (req, res) => {
    res.status(200).send('🟢 API en línea');
});

//OMW server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});
