require('dotenv').config();
const mongoose = require('../database');
const bcrypt = require('bcrypt-nodejs');
const Club = require('../models/club');
const Director = require('../models/director');

(async () => {
    try {
        // Verifica si ya existe un admin
        const existingAdmin = await Director.findOne({ role: 'admin' });
        if (existingAdmin) {
            console.log('Ya existe un usuario admin. Abortando.');
            return process.exit(0);
        }

        // Crea un club genérico si no existe ninguno
        let club = await Club.findOne({ name: 'General' });
        if (!club) {
            club = await Club.create({ name: 'General', type: 'General', fees: 0 });
            console.log('Club "General" creado');
        }

        // Password
        const plainPassword = process.env.ADMIN_PASSWORD || 'admin123';
        const hash = bcrypt.hashSync(plainPassword, null, null);

        const admin = await Director.create({
            role: 'admin',
            student: 'admin',
            password: hash,
            club: club._id
        });

        console.log('Usuario admin creado con éxito. Credenciales:');
        console.log('usuario: admin');
        console.log('password:', plainPassword);
    } catch (err) {
        console.error(err);
    } finally {
        mongoose.disconnect();
    }
})(); 