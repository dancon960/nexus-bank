// Primero, cogemos los elementos de la web para poder usarlos
const selector = document.getElementById('planSelector');
const botonActivar = document.getElementById('activateBtn');
const cuadroDetalles = document.getElementById('planDetails');
const listaBeneficios = document.getElementById('listaBeneficios');

// Aquí guardamos la información de lo que ofrece cada plan
const infoPlanes = {
    "Standard": ["Tarjeta virtual gratis", "Pagos globales", "Soporte básico"],
    "Silver": ["Seguro de viajes", "Cashback del 1%", "Soporte 24/7"],
    "Premium": ["Acceso a salas VIP", "Transferencias SWIFT gratis", "Seguro total"]
};

// Esto se activa cada vez que el usuario elige un plan en la lista
selector.addEventListener('change', () => {
    const eleccion = selector.value;
    
    // Ponemos un texto que confirme qué plan ha elegido
    cuadroDetalles.innerHTML = `<p style="color:white;">Has seleccionado: <strong>${eleccion}</strong></p>`;

    // Aquí creamos los puntos de la lista con las ventajas automáticamente
    let listaHTML = "<ul style='padding-left: 20px;'>";
    
    // Recorremos la lista de ventajas del plan elegido y creamos los puntos
    infoPlanes[eleccion].forEach(beneficio => {
        listaHTML += `<li style='margin-bottom: 5px;'>${beneficio}</li>`;
    });
    
    listaHTML += "</ul>";
    
    // Metemos esa lista en el hueco que hemos dejado en el HTML
    listaBeneficios.innerHTML = listaHTML;
});

// Esto es lo que pasa cuando pulsas el botón "Activar Plan"
botonActivar.addEventListener('click', () => {
    const planFinal = selector.value;
    
    if (planFinal === "") {
        alert("Primero tienes que elegir un plan en la lista.");
        return;
    }

    // Creamos una ficha del contrato con el plan, la fecha y un número de ID
    const contrato = {
        plan: planFinal,
        fecha: new Date().toLocaleDateString(),
        idContrato: Math.floor(Math.random() * 5000) // Un número al azar para que parezca real
    };

    // Guardamos la ficha en la memoria del navegador (usando formato JSON)
    localStorage.setItem('contratoNexus', JSON.stringify(contrato));
    
    alert("¡Contrato " + contrato.idContrato + " activado con éxito!");
});

// Cuando entras en la web o refrescas, miramos si ya tenías algo guardado
window.onload = () => {
    const guardado = JSON.parse(localStorage.getItem('contratoNexus'));
    
    if (guardado) {
        // Si hay algo guardado, ponemos el selector y el texto como estaban
        selector.value = guardado.plan;
        cuadroDetalles.innerHTML = `<p style="color:#00ff00;">✓ Plan actual: ${guardado.plan} (ID: ${guardado.idContrato})</p>`;
        
        // También volvemos a pintar la lista de ventajas
        let listaHTML = "<ul style='padding-left: 20px;'>";
        infoPlanes[guardado.plan].forEach(beneficio => {
            listaHTML += `<li>${beneficio}</li>`;
        });
        listaHTML += "</ul>";
        listaBeneficios.innerHTML = listaHTML;
    }
};
// Pillamos el botón
const botonTema = document.getElementById('themeToggle');

// Al cargar la web, miramos si el usuario ACTIVÓ el modo claro a propósito
window.addEventListener('load', () => {
    if (localStorage.getItem('temaClaro') === 'true') {
        document.body.classList.add('light-mode');
    } else {
        // Si no hay nada guardado, nos aseguramos de que NO tenga la clase clara
        document.body.classList.remove('light-mode');
    }
});

// El evento del botón sigue igual
botonTema.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const esClaroNow = document.body.classList.contains('light-mode');
    localStorage.setItem('temaClaro', esClaroNow);
});