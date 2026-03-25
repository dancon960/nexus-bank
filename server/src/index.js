// src/index.js
const express = require('express');
const cors = require('cors');
const { port } = require('./config/env');
const taskRoutes = require('./routes/task.routes');

const app = express();

// --- MIDDLEWARES GLOBALES ---
app.use(cors());
app.use(express.json());

// --- RUTAS DE LA API ---
app.use('/api/v1/tasks', taskRoutes);

// --- MANEJO DE ERRORES GLOBAL ---
app.use((err, req, res, next) => {
    console.error(`[SERVER ERROR]: ${err.stack}`);
    res.status(500).json({ 
        error: 'Algo salió mal en el servidor',
        message: err.message 
    });
});

app.listen(port, () => {
    console.log(`🚀 Servidor TaskFlow conectado y capas activas`);
    console.log(`📍 Endpoints: http://localhost:${port}/api/v1/tasks`);
});