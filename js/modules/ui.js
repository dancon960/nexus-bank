/**
 * Módulo de Interfaz de Usuario (UI)
 * Funciones para actualizar la interfaz visual
 */
const ui = {
    // Genera el HTML para un solo movimiento
    renderMovimiento(mov) {
        const isExpense = mov.cantidad < 0;
        return `
            <div class="flex justify-between items-center p-4 bg-zinc-800/50 rounded-xl border border-zinc-800 dark:bg-white dark:border-zinc-200">
                <div>
                    <p class="font-bold">${mov.titulo}</p>
                    <p class="text-xs text-zinc-500">${mov.fecha}</p>
                </div>
                <div class="flex items-center gap-4">
                    <span class="font-black ${isExpense ? 'text-red-400' : 'text-green-400'}">
                        ${mov.cantidad.toFixed(2)}€
                    </span>
                    <button onclick="window.eliminarMovimientoGlobal('${mov.id}')" class="text-zinc-600 hover:text-white">
                        ✕
                    </button>
                </div>
            </div>`;
    },

    // Actualiza los cuadros de texto de las estadísticas
    actualizarStats(stats) {
        const elTotal = document.getElementById('statTotal');
        const elIngresos = document.getElementById('statIngresos');
        const elGastos = document.getElementById('statGastos');

        if (elTotal) elTotal.innerText = `${stats.total.toFixed(2)}€`;
        if (elIngresos) elIngresos.innerText = `${stats.ingresos.toFixed(2)}€`;
        if (elGastos) elGastos.innerText = `${stats.gastos.toFixed(2)}€`;
    }
};