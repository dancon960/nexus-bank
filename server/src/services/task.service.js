// src/services/task.service.js

// "Base de Datos" temporal en memoria
let tasks = [
    { id: '1', titulo: 'Aprender Backend', prioridad: 3, completada: false }
];

const taskService = {
    // Retorna todas las tareas
    obtenerTodas: () => {
        return tasks;
    },

    // Crea una nueva tarea y la añade a la "Base de Datos"
    crearTarea: (datos) => {
        const nuevaTarea = {
            id: Date.now().toString(),
            titulo: datos.titulo,
            prioridad: datos.prioridad || 1,
            completada: false
        };
        tasks.push(nuevaTarea);
        return nuevaTarea;
    },

    // Elimina una tarea por ID
    eliminarTarea: (id) => {
        const inicialLength = tasks.length;
        tasks = tasks.filter(t => t.id !== id);
        
        if (tasks.length === inicialLength) {
            throw new Error('NOT_FOUND');
        }
        return true;
    }
};

module.exports = taskService;