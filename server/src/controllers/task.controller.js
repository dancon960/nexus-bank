// src/controllers/task.controller.js
const taskService = require('../services/task.service');

const taskController = {
    // Obtener tareas
    getTasks: (req, res) => {
        const tasks = taskService.obtenerTodas();
        res.json(tasks);
    },

    // Crear tarea con VALIDACIÓN ESTRICTA
    createTask: (req, res) => {
        const { titulo, prioridad } = req.body;

        // Validación defensiva manual
        if (!titulo || typeof titulo !== 'string' || titulo.trim().length < 3) {
            return res.status(400).json({ 
                error: "El título es obligatorio y debe tener al menos 3 caracteres." 
            });
        }

        const nueva = taskService.crearTarea({ titulo, prioridad });
        res.status(201).json(nueva); // 201 significa "Creado con éxito"
    },

    // Eliminar tarea
    deleteTask: (req, res) => {
        try {
            const { id } = req.params;
            taskService.eliminarTarea(id);
            res.status(204).send(); // 204 significa "Éxito, pero no hay contenido que devolver"
        } catch (error) {
            if (error.message === 'NOT_FOUND') {
                res.status(404).json({ error: "Tarea no encontrada" });
            } else {
                res.status(500).json({ error: "Error interno" });
            }
        }
    }
};

module.exports = taskController;