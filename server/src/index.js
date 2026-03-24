// src/index.js
const express = require('express');
const cors = require('cors');
const { port } = require('./config/env');

const app = express();

// Middlewares iniciales (los "filtros" de la entrada)
app.use(cors()); // Permite que tu frontend hable con este backend
app.use(express.json()); // Permite que el servidor entienda JSON

// Ruta de prueba (el "Hola Mundo")
app.get('/', (req, res) => {
    res.send('API de TaskFlow funcionando correctamente 🚀');
});

// Arrancar el servidor
app.listen(port, () => {
    console.log(`✅ Servidor Express corriendo en http://localhost:${port}`);
    console.log('Presiona Ctrl+C para detenerlo');
});