// src/routes/task.routes.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

// Definimos el contrato de la API
router.get('/', taskController.getTasks);      // GET /api/v1/tasks
router.post('/', taskController.createTask);    // POST /api/v1/tasks
router.delete('/:id', taskController.deleteTask); // DELETE /api/v1/tasks/:id

module.exports = router;