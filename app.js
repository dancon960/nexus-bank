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
    
    // Miramos si ya tenía un contrato activo
    const guardado = JSON.parse(localStorage.getItem('contratoNexus'));
    if (guardado) {
        cuadroDetalles.innerHTML = `<span class="text-green-400 font-bold italic">✓ Tienes un contrato activo: ${guardado.nombre}</span>`;
    }
};