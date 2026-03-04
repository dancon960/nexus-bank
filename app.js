// Pillamos los elementos de la sección de tarjetas
const inputTarjeta = document.getElementById('taskInput');
const btnAnadir = document.getElementById('addTaskBtn');
const listaTarjetas = document.getElementById('taskList');

// Al hacer click, guardamos la tarjeta en la lista
btnAnadir.addEventListener('click', () => {
    const nombreTarjeta = inputTarjeta.value;
    
    // Si el cuadro está vacío, no hacemos nada
    if (nombreTarjeta === '') return; 

    crearItemTarjeta(nombreTarjeta);
    guardarEnNavegador(); // Para que no se borre al refrescar la web
    inputTarjeta.value = ''; // Limpiar el cuadro al terminar
});

// Esta función monta el elemento visual (el LI) con su botón de borrar
function crearItemTarjeta(texto) {
    const li = document.createElement('li');
    li.textContent = texto;

    const btnQuitar = document.createElement('button');
    btnQuitar.textContent = 'Quitar';
    
    btnQuitar.onclick = () => {
        li.remove();
        guardarEnNavegador(); // Actualizar el storage al borrar
    };

    li.appendChild(btnQuitar);
    listaTarjetas.appendChild(li);
}

// Guarda la lista en formato JSON para que sea persistente
function guardarEnNavegador() {
    const datos = [];
    document.querySelectorAll('#taskList li').forEach(li => {
        // Guardamos solo el texto de la tarjeta, sin el texto del botón
        datos.push(li.firstChild.textContent);
    });
    localStorage.setItem('misTarjetasSeleccionadas', JSON.stringify(datos));
}

// Al cargar la página, recuperamos lo que hubiera guardado
window.onload = () => {
    const recuperadas = JSON.parse(localStorage.getItem('misTarjetasSeleccionadas'));
    if (recuperadas) {
        recuperadas.forEach(t => crearItemTarjeta(t));
    }
};