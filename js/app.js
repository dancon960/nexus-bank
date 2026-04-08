// --- CONFIGURACIÓN ---
// Estas son las direcciones de nuestro servidor Express
const API_URL = 'http://localhost:3000/api/v1/tasks';
const API_CALC = 'http://localhost:3000/api/v1/calculadora'; 

// --- LÓGICA DE RED ---
// Función para validar el acceso (se activa al dar al botón "Entrar")
async function validarAccesoServidor() {
    const statusEl = document.getElementById('loginStatus');
    const btnEntrar = document.getElementById('btnEntrar');
    
    // 1. Estado de CARGA
    if (statusEl) statusEl.innerHTML = '<span class="text-zinc-500 animate-pulse">Conectando con el servidor...</span>';
    if (btnEntrar) {
        btnEntrar.disabled = true;
        btnEntrar.classList.add('opacity-50');
    }

    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Error en la respuesta');

        // 2. Estado de ÉXITO
        if (statusEl) statusEl.innerHTML = '<span class="text-green-500">Acceso concedido</span>';
        
        setTimeout(() => {
            const seccion = document.getElementById('seccionPrivada');
            const msg = document.getElementById('mensajeLogin');
            if (seccion) seccion.classList.remove('hidden');
            if (msg) msg.classList.add('hidden');
            
            window.location.hash = '';
            activarCalculadora(); // Encendemos los controles
        }, 800);

    } catch (error) {
        // 3. Estado de ERROR
        if (statusEl) statusEl.innerHTML = '<span class="text-red-500">Error: Servidor offline</span>';
        if (btnEntrar) {
            btnEntrar.disabled = false;
            btnEntrar.classList.remove('opacity-50');
        }
    }
}

// Esta función conecta los sliders con la lógica de cálculo
function activarCalculadora() {
    const inputs = ['capitalInicial', 'aporteMensual', 'plazoAnos'];
    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', actualizarCalculo);
    });
    actualizarCalculo(); // Calculamos por primera vez
}

// --- LÓGICA DEL SIMULADOR ---
async function actualizarCalculo() {
    // Cogemos los valores de los sliders
    const p = parseFloat(document.getElementById('capitalInicial').value) || 0;
    const a = parseFloat(document.getElementById('aporteMensual').value) || 0;
    const t = parseInt(document.getElementById('plazoAnos').value) || 1;
    const tasaInteres = 0.04;

    // Actualizamos el texto de los años
    const label = document.getElementById('labelAnos');
    if (label) label.innerText = `${t} años`;

    try {
        // INTENTO 1: Pedir el cálculo al servidor Express
        const response = await fetch(API_CALC, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ capital: p, aporte: a, anos: t })
        });

        if (!response.ok) throw new Error();
        const resultados = await response.json();
        
        pintarEnPantalla(resultados.total, resultados.ganancia);

    } catch (error) {
        // INTENTO 2: Si el servidor no responde, calculamos aquí (Modo Local)
        const meses = t * 12;
        let total = p;
        for (let i = 0; i < meses; i++) {
            total = (total + a) * (1 + (tasaInteres / 12));
        }
        const ganancia = total - (p + (a * meses));

        pintarEnPantalla(total, ganancia);
    }
}

// Función auxiliar para mostrar los números en el HTML
function pintarEnPantalla(total, ganancia) {
    const resFinal = document.getElementById('resultadoFinal');
    const benTotal = document.getElementById('beneficioTotal');
    
    if (resFinal) resFinal.innerText = total.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });
    if (benTotal) benTotal.innerText = `+${ganancia.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })} en intereses`;
}

// --- INICIO Y TEMA ---
window.onload = () => {
    // Cargamos el modo oscuro si estaba guardado
    if (localStorage.getItem('preferenciaOscura') === 'true') {
        document.documentElement.classList.add('dark');
    }

    // Arrancamos la calculadora nada más entrar para que se pueda usar directamente
    activarCalculadora(); 
};

window.toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('preferenciaOscura', isDark);
};

window.handleLogin = (e) => {
    e.preventDefault();
    validarAccesoServidor();
};