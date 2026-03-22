// --- ESTADO ---
let movimientosList = storage.get('movimientosNexus') || [];

// --- REFRESCAR UI ---
function refreshUI(data = movimientosList) {
    storage.save('movimientosNexus', movimientosList);
    const container = document.getElementById('listaMovimientos');
    if (container) {
        container.innerHTML = data.map(mov => ui.renderMovimiento(mov)).join('');
    }
    ui.actualizarStats(calcularEstadisticas(data));
}

// --- FUNCIONES GLOBALES (Para tus botones del HTML) ---

window.toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    storage.save('preferenciaOscura', isDark);
};

window.handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    if(!email) return alert("Introduce un email");
    
    const username = email.split('@')[0];
    storage.save('usuarioNexus', username);
    window.location.hash = ''; 
    alert(`Bienvenido, ${username}`);
    checkLoggedUser();
};

window.filtrarGlobal = (tipo) => {
    const filtrados = filtrarPorTipo(movimientosList, tipo);
    refreshUI(filtrados);
};

window.eliminarMovimientoGlobal = (id) => {
    movimientosList = movimientosList.filter(m => m.id !== id);
    refreshUI();
};

function checkLoggedUser() {
    const user = storage.get('usuarioNexus');
    const privateSection = document.getElementById('seccionPrivada');
    const loginMessage = document.getElementById('mensajeLogin');
    
    if (user && privateSection && loginMessage) {
        privateSection.classList.remove('hidden');
        loginMessage.classList.add('hidden');
    }
}

// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
    if (storage.get('preferenciaOscura')) document.documentElement.classList.add('dark');
    
    const form = document.getElementById('formMovimiento');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const titulo = document.getElementById('tituloMov').value;
            const cantidad = parseFloat(document.getElementById('cantidadMov').value);
            
            if (titulo.length < 3 || isNaN(cantidad)) return alert("Datos no válidos");

            movimientosList.push({
                id: Date.now().toString(),
                titulo,
                cantidad,
                fecha: new Date().toLocaleDateString()
            });
            form.reset();
            refreshUI();
        });
    }
    
    checkLoggedUser();
    refreshUI();
});