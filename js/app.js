// --- ESTADO ---
const tasaInteres = 0.04;

// --- FUNCIONES ---
function actualizarCalculo() {
    const p = parseFloat(document.getElementById('capitalInicial').value) || 0;
    const a = parseFloat(document.getElementById('aporteMensual').value) || 0;
    const t = parseInt(document.getElementById('plazoAnos').value);

    // Actualizamos el label de los años
    document.getElementById('labelAnos').innerText = `${t} años`;

    // Calculamos usando la lógica del módulo
    const resultados = calcularRentabilidad(p, a, t, tasaInteres);

    // Mostramos en la UI
    document.getElementById('resultadoFinal').innerText = resultados.total.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });
    document.getElementById('beneficioTotal').innerText = `+${resultados.ganancia.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })} en intereses`;
}

// --- EVENTOS ---
window.onload = () => {
    // Modo oscuro
    if (localStorage.getItem('preferenciaOscura') === 'true') document.documentElement.classList.add('dark');
    
    // Comprobar Login
    const user = localStorage.getItem('usuarioNexus');
    if (user) {
        document.getElementById('seccionPrivada').classList.remove('hidden');
        document.getElementById('mensajeLogin').classList.add('hidden');
        
        // Asignar eventos a los inputs de la calculadora
        const inputs = ['capitalInicial', 'aporteMensual', 'plazoAnos'];
        inputs.forEach(id => {
            document.getElementById(id).addEventListener('input', actualizarCalculo);
        });
        
        actualizarCalculo(); // Cálculo inicial
    }
};

window.toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('preferenciaOscura', isDark);
};

window.handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.querySelector('input[type="email"]').value.split('@')[0];
    localStorage.setItem('usuarioNexus', username);
    window.location.hash = '';
    location.reload(); // Recargamos para que se activen los eventos de la calculadora
};