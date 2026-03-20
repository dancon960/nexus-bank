/**
 * Módulo de Almacenamiento
 * Gestiona la persistencia de datos en LocalStorage
 */

export const storage = {
    save(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },
    get(key) {
        const data = localStorage.getItem(key);
        try {
            return JSON.parse(data);
        } catch (e) {
            return data;
        }
    },
    exists(key) {
        return localStorage.getItem(key) !== null;
    }
};