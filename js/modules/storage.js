/**
 * Módulo de Almacenamiento
 * Gestión del almacenamiento en el navegador
 */
const storage = {
    // Guarda datos asociados a una clave
    save(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },
    // Recupera datos y los convierte en objeto/array
    get(key) {
        const data = localStorage.getItem(key);
        try {
            return JSON.parse(data);
        } catch (e) {
            return data;
        }
    }
};