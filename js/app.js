// Seleccionamos los elementos principales de la interfaz
const planSelector = document.getElementById('planSelector');
const activateButton = document.getElementById('activateBtn');
const planDetailsBox = document.getElementById('planDetails');
const benefitsList = document.getElementById('listaBeneficios');
const themeToggleButton = document.getElementById('themeToggle');

// Detalles de cada plan para mostrar en la UI
const plansInfo = {
    Standard: ["Tarjeta gratis", "App móvil", "Soporte básico"],
    Silver: ["Cashback 1%", "Seguro de viaje", "Tarjeta metal"],
    Premium: ["Salas VIP", "Seguro total", "Gestor personal"]
};

// Evento: selección de plan
planSelector.addEventListener('change', () => {
    const selectedPlan = planSelector.value;
    
    // Muestra mensaje de confirmación de selección
    planDetailsBox.innerHTML = `Has seleccionado el plan <span class="font-bold text-white dark:text-black">${selectedPlan}</span>`;
    
    // Crea la lista de beneficios con check verde
    let benefitsHtml = "<ul class='space-y-3'>";
    plansInfo[selectedPlan].forEach(benefit => {
        benefitsHtml += `<li class="flex items-center gap-3 text-zinc-400 dark:text-zinc-600">
                    <span class="text-green-500 font-bold">✓</span> ${benefit}
                 </li>`;
    });
    benefitsHtml += "</ul>";
    
    // Inserta en la interfaz
    benefitsList.innerHTML = benefitsHtml;
});

// Evento: activar plan
activateButton.addEventListener('click', () => {
    const selectedPlan = planSelector.value;
    if (!selectedPlan) return alert("Por favor, selecciona un plan primero.");

    // Objeto con la información del contrato
    const contractInfo = {
        nombre: selectedPlan,
        fecha: new Date().toLocaleDateString(),
        id: Math.floor(Math.random() * 9000)
    };

    // Guarda el contrato en localStorage
    localStorage.setItem('contratoNexus', JSON.stringify(contractInfo));
    alert("¡Felicidades! Tu plan " + selectedPlan + " ya está activo.");
});

// Evento: alternar entre modo claro/oscuro
themeToggleButton.addEventListener('click', () => {
    // Alterna la clase 'dark' en el documento
    document.documentElement.classList.toggle('dark');
    
    // Guarda la preferencia del modo en localStorage
    const isDarkMode = document.documentElement.classList.contains('dark');
    localStorage.setItem('preferenciaOscura', isDarkMode);
});

/**
 * Inicializa el modo de tema de la página según preferencia guardada.
 * Si está activada la preferencia de modo oscuro, aplica la clase 'dark'.
 */
function initThemePreference() {
    if (localStorage.getItem('preferenciaOscura') === 'true') {
        document.documentElement.classList.add('dark');
    }
}

/**
 * Carga datos previos del usuario: si hay un contrato activo, muestra el aviso
 * y deja registro en consola del modo actual.
 * Solo se ejecuta al cargar la web inicialmente.
 */
function loadPreviousUserData() {
    const currentTheme = document.documentElement.classList.contains('dark') ? 'oscuro' : 'claro';
    console.log(`La página se ha cargado en modo ${currentTheme}.`);

    const storedContract = JSON.parse(localStorage.getItem('contratoNexus'));
    if (storedContract) {
        planDetailsBox.innerHTML = `<span class="text-green-400 font-bold italic">✓ Tienes un contrato activo: ${storedContract.nombre}</span>`;
    }
}

// Evento de carga: inicializa el tema y carga datos previos
window.onload = () => {
    initThemePreference();
    loadPreviousUserData();
}
    
    // Código legado/redundante (puede eliminarse si loadPreviousUserData se llama solo):
    const currentTheme = document.documentElement.classList.contains('dark') ? 'oscuro' : 'claro';
    console.log(`La página se ha cargado en modo ${currentTheme}.`);
    const storedContract = JSON.parse(localStorage.getItem('contratoNexus'));
    if (storedContract) {
        planDetailsBox.innerHTML = `<span class="text-green-400 font-bold italic">✓ Tienes un contrato activo: ${storedContract.nombre}</span>`;
    }

// --- LÓGICA DE MOVIMIENTOS ---

let movimientosList = JSON.parse(localStorage.getItem('movimientosNexus')) || [];

const movimientoForm = document.getElementById('formMovimiento');
const movimientosContainer = document.getElementById('listaMovimientos');
const searchInput = document.getElementById('busqueda');

/**
 * Guarda el array de movimientos en localStorage
 * y renderiza la interfaz de movimientos y estadísticas.
 * @param {Array} data - Lista de movimientos a mostrar (opcional)
 */
function updateMovementsUI(data = movimientosList) {
    // Guarda en localStorage
    localStorage.setItem('movimientosNexus', JSON.stringify(movimientosList));
    
    // Limpia la UI antes de pintar
    movimientosContainer.innerHTML = '';
    
    let totalBalance = 0;
    let ingresosSum = 0;
    let gastosSum = 0;

    data.forEach(mov => {
        const amount = parseFloat(mov.cantidad);
        const isExpense = amount < 0;
        
        // Cálculo de estadísticas
        totalBalance += amount;
        if (isExpense) gastosSum += Math.abs(amount);
        else ingresosSum += amount;

        // CREA EL ITEM DE MOVIMIENTO
        const movElem = document.createElement('div');
        movElem.className = `flex justify-between items-center p-4 bg-zinc-800/50 rounded-xl border border-zinc-800 dark:bg-white dark:border-zinc-200`;
        movElem.innerHTML = `
            <div>
                <p class="font-bold">${mov.titulo}</p>
                <p class="text-xs text-zinc-500">${mov.fecha}</p>
            </div>
            <div class="flex items-center gap-4">
                <span class="font-black ${isExpense ? 'text-red-400' : 'text-green-400'}">${amount.toFixed(2)}€</span>
                <button onclick="eliminarMovimiento('${mov.id}')" class="text-zinc-600 hover:text-white">✕</button>
            </div>
        `;
        movimientosContainer.appendChild(movElem);
    });

    // Actualiza estadísticas en pantalla
    document.getElementById('statTotal').innerText = `${totalBalance.toFixed(2)}€`;
    document.getElementById('statIngresos').innerText = `${ingresosSum.toFixed(2)}€`;
    document.getElementById('statGastos').innerText = `${gastosSum.toFixed(2)}€`;
}

/**
 * Maneja el envío del formulario de movimientos:
 * - Valida: mínimo 3 caracteres en el título y cantidad > 0
 * - Si la validación falla, muestra un alert y no agrega el movimiento
 */
movimientoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const movTitle = document.getElementById('tituloMov').value.trim();
    const cantidadStr = document.getElementById('cantidadMov').value;
    const movAmount = parseFloat(cantidadStr);

    // Validación de título
    if (movTitle.length < 3) {
        alert('El título debe tener al menos 3 caracteres.');
        return;
    }

    // Validación de cantidad
    if (isNaN(movAmount) || movAmount <= 0) {
        alert('La cantidad debe ser un número mayor que 0.');
        return;
    }

    const newMovement = {
        id: Date.now().toString(),
        titulo: movTitle,
        cantidad: movAmount,
        fecha: new Date().toLocaleDateString()
    };

    movimientosList.push(newMovement);
    movimientoForm.reset();
    updateMovementsUI();
});

/**
 * Elimina un movimiento del listado según su ID
 * y actualiza la interfaz (botón de la x de cada movimiento)
 * @param {string} id - ID del movimiento a eliminar
 */
function eliminarMovimiento(id) {
    movimientosList = movimientosList.filter(mov => mov.id !== id);
    updateMovementsUI();
}

/**
 * Filtra los movimientos por tipo y actualiza la interfaz.
 * @param {'todos'|'ingreso'|'gasto'} tipo - Tipo a filtrar
 */
function filtrarMovimientos(tipo) {
    const filtered = tipo === 'todos'
        ? movimientosList
        : movimientosList.filter(mov => tipo === 'gasto' ? mov.cantidad < 0 : mov.cantidad >= 0);
    updateMovementsUI(filtered);
}

// Evento: búsqueda de movimientos por texto
searchInput.addEventListener('input', () => {
    const term = searchInput.value.toLowerCase();
    const filteredMovements = movimientosList.filter(mov => 
        mov.titulo.toLowerCase().includes(term)
    );
    updateMovementsUI(filteredMovements);
});

// Inicializa la interfaz de movimientos al arrancar la app
updateMovementsUI();

// Elementos y lógica para el login modal
const loginForm = document.querySelector('#login-modal form');
const privateSection = document.getElementById('seccionPrivada');
const loginMessage = document.getElementById('mensajeLogin');

/**
 * Evento: formulario de login, simula un usuario y guarda en localStorage
 */
loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Previene recarga

    // Consigue el nombre del usuario a partir del email
    const email = loginForm.querySelector('input[type="email"]').value;
    const username = email.split('@')[0];

    // Guarda el usuario en localStorage
    localStorage.setItem('usuarioNexus', username);
    
    // Cierra el modal (truco hash vacío)
    window.location.hash = ''; 
    
    alert(`Bienvenido de nuevo, ${username}`);
    checkLoggedUser();
});

/**
 * Comprueba si el usuario está logueado, para mostrar sección privada del dashboard
 */
function checkLoggedUser() {
    const loadedUser = localStorage.getItem('usuarioNexus');
    if (loadedUser) {
        privateSection.classList.remove('hidden');
        loginMessage.classList.add('hidden');
    }
}

// Comprueba sesión al cargar la página
window.addEventListener('load', checkLoggedUser);

/**
 * Exporta todos los movimientos a un archivo CSV (con fecha en el nombre y control de errores)
 */
function exportMovementsCSV() {
    try {
        const movimientosCsvArr = JSON.parse(localStorage.getItem('movimientosNexus')) || [];
        const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
        const csvContent = "data:text/csv;charset=utf-8," + movimientosCsvArr.map(mov => `${mov.titulo},${mov.cantidad},${mov.fecha}`).join("\n");
        const encodedUri = encodeURI(csvContent);
        const downloadLink = document.createElement("a");
        downloadLink.setAttribute("href", encodedUri);
        downloadLink.setAttribute("download", `movimientos_nexus_${today}.csv`);
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    } catch (error) {
        alert("Ocurrió un error al exportar los movimientos: " + error.message);
        console.error("Exportar CSV error:", error);
    }
}
