// Pillamos los elementos de la web que vamos a usar
const selector = document.getElementById('planSelector');
const botonActivar = document.getElementById('activateBtn');
const cuadroDetalles = document.getElementById('planDetails');
const listaBeneficios = document.getElementById('listaBeneficios');
const botonModo = document.getElementById('themeToggle');

// Los datos de los planes para que el JS sepa qué mostrar
const planes = {
    "Standard": ["Tarjeta gratis", "App móvil", "Soporte básico"],
    "Silver": ["Cashback 1%", "Seguro de viaje", "Tarjeta metal"],
    "Premium": ["Salas VIP", "Seguro total", "Gestor personal"]
};

// Cada vez que cambias el plan en el selector...
selector.addEventListener('change', () => {
    const elegido = selector.value;
    
    // Ponemos un mensaje de confirmación
    cuadroDetalles.innerHTML = `Has seleccionado el plan <span class="font-bold text-white dark:text-black">${elegido}</span>`;
    
    // Creamos la lista de ventajas con checks verdes
    let html = "<ul class='space-y-3'>";
    planes[elegido].forEach(ventaja => {
        html += `<li class="flex items-center gap-3 text-zinc-400 dark:text-zinc-600">
                    <span class="text-green-500 font-bold">✓</span> ${ventaja}
                 </li>`;
    });
    html += "</ul>";
    
    // Lo pintamos en la pantalla
    listaBeneficios.innerHTML = html;
});

// Cuando pulsas el botón de activar...
botonActivar.addEventListener('click', () => {
    const planFinal = selector.value;
    if (!planFinal) return alert("Por favor, selecciona un plan primero.");

    // Creamos un objeto con la info del contrato (Esto es el JSON)
    const miContrato = {
        nombre: planFinal,
        fecha: new Date().toLocaleDateString(),
        id: Math.floor(Math.random() * 9000)
    };

    // Lo guardamos en el navegador para que no se pierda al cerrar
    localStorage.setItem('contratoNexus', JSON.stringify(miContrato));
    alert("¡Felicidades! Tu plan " + planFinal + " ya está activo.");
});

// El interruptor para cambiar entre modo luz y oscuridad
botonModo.addEventListener('click', () => {
    // Le añadimos o quitamos la clase 'dark' al documento
    document.documentElement.classList.toggle('dark');
    
    // Guardamos qué modo prefiere el usuario
    const esOscuro = document.documentElement.classList.contains('dark');
    localStorage.setItem('preferenciaOscura', esOscuro);
});

// Al abrir la web, recuperamos los datos guardados
window.onload = () => {
    // Miramos si el usuario prefería el modo oscuro/claro
    if (localStorage.getItem('preferenciaOscura') === 'true') {
        document.documentElement.classList.add('dark');
    }
    
    // Indicamos en la consola en qué modo estamos
    const modoActual = document.documentElement.classList.contains('dark') ? 'oscuro' : 'claro';
    console.log(`La página se ha cargado en modo ${modoActual}.`);
    
    // Miramos si ya tenía un contrato activo
    const guardado = JSON.parse(localStorage.getItem('contratoNexus'));
    if (guardado) {
        cuadroDetalles.innerHTML = `<span class="text-green-400 font-bold italic">✓ Tienes un contrato activo: ${guardado.nombre}</span>`;
    }
};
// --- LÓGICA DE MOVIMIENTOS ---

let movimientos = JSON.parse(localStorage.getItem('movimientosNexus')) || [];

const formMov = document.getElementById('formMovimiento');
const listaMov = document.getElementById('listaMovimientos');
const inputBusqueda = document.getElementById('busqueda');

// Función para guardar y pintar todo
function actualizarInterfaz(datos = movimientos) {
    // Guardamos en LocalStorage (Punto 7)
    localStorage.setItem('movimientosNexus', JSON.stringify(movimientos));
    
    // Limpiamos la lista antes de pintar
    listaMov.innerHTML = '';
    
    let total = 0;
    let ingresos = 0;
    let gastos = 0;

    datos.forEach(m => {
        const valor = parseFloat(m.cantidad);
        const esGasto = valor < 0;
        
        // Sumamos para las estadísticas (Punto 3)
        total += valor;
        if(esGasto) gastos += Math.abs(valor);
        else ingresos += valor;

        // Creamos el HTML de cada fila (Punto 6)
        const item = document.createElement('div');
        item.className = `flex justify-between items-center p-4 bg-zinc-800/50 rounded-xl border border-zinc-800 dark:bg-white dark:border-zinc-200`;
        item.innerHTML = `
            <div>
                <p class="font-bold">${m.titulo}</p>
                <p class="text-xs text-zinc-500">${m.fecha}</p>
            </div>
            <div class="flex items-center gap-4">
                <span class="font-black ${esGasto ? 'text-red-400' : 'text-green-400'}">${valor.toFixed(2)}€</span>
                <button onclick="eliminarMovimiento('${m.id}')" class="text-zinc-600 hover:text-white">✕</button>
            </div>
        `;
        listaMov.appendChild(item);
    });

    // Actualizamos los numeritos de las estadísticas
    document.getElementById('statTotal').innerText = `${total.toFixed(2)}€`;
    document.getElementById('statIngresos').innerText = `${ingresos.toFixed(2)}€`;
    document.getElementById('statGastos').innerText = `${gastos.toFixed(2)}€`;
}

// Añadir un movimiento nuevo
formMov.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nuevoMov = {
        id: Date.now().toString(),
        titulo: document.getElementById('tituloMov').value,
        cantidad: document.getElementById('cantidadMov').value,
        fecha: new Date().toLocaleDateString()
    };

    movimientos.push(nuevoMov);
    formMov.reset();
    actualizarInterfaz();
});

// Eliminar (Punto 6)
function eliminarMovimiento(id) {
    movimientos = movimientos.filter(m => m.id !== id);
    actualizarInterfaz();
}

// Filtrar (Ingresos / Gastos)
function filtrarMovimientos(tipo) {
    if (tipo === 'todos') {
        actualizarInterfaz(movimientos);
    } else {
        const filtrados = movimientos.filter(m => {
            return tipo === 'gasto' ? m.cantidad < 0 : m.cantidad >= 0;
        });
        actualizarInterfaz(filtrados);
    }
}

// Buscador por texto (Punto 8)
inputBusqueda.addEventListener('input', () => {
    const texto = inputBusqueda.value.toLowerCase();
    const filtrados = movimientos.filter(m => 
        m.titulo.toLowerCase().includes(texto)
    );
    actualizarInterfaz(filtrados);
});

// Al arrancar, cargamos lo que haya
actualizarInterfaz();
// Buscamos el formulario del modal de login
const formLogin = document.querySelector('#login-modal form');
const seccionPrivada = document.getElementById('seccionPrivada');
const mensajeLogin = document.getElementById('mensajeLogin');

formLogin.addEventListener('submit', (e) => {
    e.preventDefault(); // Evitamos que la página se recargue
    
    // Pillamos el email para simular el nombre de usuario
    const email = formLogin.querySelector('input[type="email"]').value;
    const nombreUsuario = email.split('@')[0]; // Sacamos el nombre antes del @

    // Guardamos en LocalStorage que ya estamos dentro (Punto 7)
    localStorage.setItem('usuarioNexus', nombreUsuario);
    
    // Cerramos el modal (usando el truco del hash vacío)
    window.location.hash = ''; 
    
    alert(`Bienvenido de nuevo, ${nombreUsuario}`);
    comprobarSesion();
});

function comprobarSesion() {
    const usuarioCargado = localStorage.getItem('usuarioNexus');
    
    if (usuarioCargado) {
        // Si hay usuario, mostramos los movimientos y quitamos el mensaje
        seccionPrivada.classList.remove('hidden');
        mensajeLogin.classList.add('hidden');
    }
}

// Llamamos a la función al cargar la página
window.addEventListener('load', comprobarSesion);

// Función para exportar todos los movimientos a un archivo CSV
function exportarCSV() {
    const movimientos = JSON.parse(localStorage.getItem('movimientosNexus')) || [];
    const csvContent = "data:text/csv;charset=utf-8," + movimientos.map(m => `${m.titulo},${m.cantidad},${m.fecha}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "movimientos_nexus.csv");
    document.body.appendChild(link);
    link.click();
}
