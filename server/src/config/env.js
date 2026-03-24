// src/config/env.js
require('dotenv').config();

const config = {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development'
};

// Si por algún error no encuentra el .env, el servidor se negará a arrancar aquí
if (!process.env.PORT) {
    throw new Error('FATAL: El puerto no está definido en las variables de entorno (.env)');
}

module.exports = config;