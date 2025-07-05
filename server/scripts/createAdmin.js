require('dotenv').config();
const mongoose = require('../database');
const bcrypt = require('bcrypt-nodejs');
const Club = require('../models/club');
const Director = require('../models/director');

const createAdmin = async () => {
    try {
        // Verifica si ya existe un admin
        const existingAdmin = await Director.findOne({ role: 'admin' });
        if (existingAdmin) {
            console.log('Ya existe un usuario admin. Abortando.');
            return 'Ya existe un usuario admin.';
        }

        // Crea un club genérico si no existe ninguno
        let club = await Club.findOne({ name: 'General' });
        if (!club) {
            club = await Club.create({ name: 'General', type: 'General', fees: 0 });
            console.log('Club "General" creado');
        }

        // Password
        const plainPassword = process.env.ADMIN_PASSWORD || 'admin123';

        const admin = await Director.create({
            role: 'admin',
            student: 'admin',
            password: plainPassword,
            club: club._id
        });

        console.log('Usuario admin creado con éxito');
        return `Usuario admin creado. password: ${plainPassword}`;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

module.exports = createAdmin;

// Si se ejecuta desde CLI, correr y luego salir.
if (require.main === module) {
    createAdmin()
        .then(msg => {
            console.log(msg);
            mongoose.disconnect();
            process.exit(0);
        })
        .catch(err => {
            mongoose.disconnect();
            process.exit(1);
        });
} 