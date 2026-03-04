// Localizamos los elementos del HTML
const selector = document.getElementById('planSelector');
const botonActivar = document.getElementById('activateBtn');
const cuadroDetalles = document.getElementById('planDetails');

// Información de los contratos (esto es lo que se guarda y se muestra)
const ventajasPlan = {
    "Standard": "Incluye pagos globales gratis, tarjeta virtual y soporte 24/7.",
    "Silver": "Todo lo de Standard + Seguro de viajes y 1% de Cashback en compras.",
    "Premium": "Todo lo de Silver + Acceso a Salas VIP en aeropuertos y transferencias gratis."
};

// Cuando el usuario elige un plan en el desplegable
selector.addEventListener('change', () => {
    const eleccion = selector.value;
    
    // Cambiamos el texto de la caja de detalles
    cuadroDetalles.innerHTML = `<p style="color:white;"><strong>Ventajas:</strong> ${ventajasPlan[eleccion]}</p>`;
});

// Al pulsar el botón de Activar
botonActivar.addEventListener('click', () => {
    const planFinal = selector.value;
    
    if (planFinal === "") {
        alert("Por favor, selecciona un plan primero.");
        return;
    }

    alert("¡Felicidades! Has activado el " + planFinal);
    
    // Guardamos la elección en la memoria del navegador (JSON)
    localStorage.setItem('contratoActivo', planFinal);
});

// Al cargar la página, comprobamos si ya había un plan guardado
window.onload = () => {
    const guardado = localStorage.getItem('contratoActivo');
    
    if (guardado) {
        // Restauramos la selección y el texto de ventajas
        selector.value = guardado;
        cuadroDetalles.innerHTML = `<p style="color:white;">Plan actual: <strong>${guardado}</strong>. ${ventajasPlan[guardado]}</p>`;
    }
};