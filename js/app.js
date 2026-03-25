// --- CONFIGURACIÓN ---
const API_URL = 'http://localhost:3000/api/v1/tasks';

// --- LÓGICA DE RED ---
async function validarAccesoServidor() {
    const statusEl = document.getElementById('loginStatus');
    const btnEntrar = document.getElementById('btnEntrar');
    
    // 1. Estado de CARGA
    statusEl.innerHTML = '<span class="text-zinc-500 animate-pulse">Conectando con el servidor...</span>';
    btnEntrar.disabled = true;
    btnEntrar.classList.add('opacity-50');

    try {
        // Simulamos la validación haciendo un GET al servidor
        const response = await fetch(API_URL);
        
        if (!response.ok) throw new Error('Error en la respuesta');

        // 2. Estado de ÉXITO
        statusEl.innerHTML = '<span class="text-green-500">Acceso concedido</span>';
        
        // Pequeño delay para que se vea el mensaje de éxito
        setTimeout(() => {
            document.getElementById('seccionPrivada').classList.remove('hidden');
            document.getElementById('mensajeLogin').classList.add('hidden');
            window.location.hash = '';
            activarCalculadora();
        }, 800);

    } catch (error) {
        // 3. Estado de ERROR
        statusEl.innerHTML = '<span class="text-red-500">Error: Servidor offline o inaccesible</span>';
        btnEntrar.disabled = false;
        btnEntrar.classList.remove('opacity-50');
        console.error("Fallo de red:", error);
    }
}

function activarCalculadora() {
    const inputs = ['capitalInicial', 'aporteMensual', 'plazoAnos'];
    inputs.forEach(id => {
        document.getElementById(id).addEventListener('input', actualizarCalculo);
    });
    actualizarCalculo();
}

// --- RESTO DE FUNCIONES (Calculadora y Tema) ---
function actualizarCalculo() {
    const p = parseFloat(document.getElementById('capitalInicial').value) || 0;
    const a = parseFloat(document.getElementById('aporteMensual').value) || 0;
    const t = parseInt(document.getElementById('plazoAnos').value);
    const tasaInteres = 0.04;

    document.getElementById('labelAnos').innerText = `${t} años`;

    // calcularRentabilidad debe estar definido en js/modules/logic.js
    const resultados = calcularRentabilidad(p, a, t, tasaInteres);

    document.getElementById('resultadoFinal').innerText = resultados.total.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });
    document.getElementById('beneficioTotal').innerText = `+${resultados.ganancia.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })} en intereses`;
}

window.onload = () => {
    // El tema es lo único que mantenemos en localStorage por UX
    if (localStorage.getItem('preferenciaOscura') === 'true') document.documentElement.classList.add('dark');
};

window.toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('preferenciaOscura', isDark);
};

window.handleLogin = (e) => {
    e.preventDefault();
    validarAccesoServidor();
};