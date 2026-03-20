import { storage } from './modules/storage.js';
import { ui } from './modules/ui.js';
import { calcularEstadisticas, filtrarPorTipo } from './modules/logic.js';

// --- CONFIGURACIÓN ---
const plansInfo = {
    Standard: ["Tarjeta gratis", "App móvil", "Soporte básico"],
    Silver: ["Cashback 1%", "Seguro de viaje", "Tarjeta metal"],
    Premium: ["Salas VIP", "Seguro total", "Gestor personal"]
};

let movimientosList = storage.get('movimientosNexus') || [];

// --- SELECTORES ---
const planSelector = document.getElementById('planSelector');
const container = document.getElementById('listaMovimientos');

// --- FUNCIONES CORE ---
function refreshUI(data = movimientosList) {
    storage.save('movimientosNexus', movimientosList);
    container.innerHTML = data.map(mov => ui.renderMovimiento(mov)).join('');
    ui.actualizarStats(calcularEstadisticas(data));
}

// Hacemos esta función global para que el botón 'X' funcione con módulos
window.eliminarMovimientoGlobal = (id) => {
    movimientosList = movimientosList.filter(m => m.id !== id);
    refreshUI();
};

// --- EVENTOS ---
document.getElementById('themeToggle').addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    storage.save('preferenciaOscura', isDark);
});

document.getElementById('formMovimiento').addEventListener('submit', (e) => {
    e.preventDefault();
    const titulo = document.getElementById('tituloMov').value;
    const cantidad = parseFloat(document.getElementById('cantidadMov').value);

    if (titulo.length < 3 || isNaN(cantidad)) return alert("Datos inválidos");

    movimientosList.push({
        id: Date.now().toString(),
        titulo,
        cantidad,
        fecha: new Date().toLocaleDateString()
    });
    
    e.target.reset();
    refreshUI();
});

// Inicialización
window.addEventListener('load', () => {
    if (storage.get('preferenciaOscura')) document.documentElement.classList.add('dark');
    refreshUI();
});