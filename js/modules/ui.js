/**
 * Módulo de Interfaz de Usuario (UI)
 * Maneja lo que el usuario ve en pantalla
 */

export const ui = {
    renderMovimiento(mov) {
        const isExpense = mov.cantidad < 0;
        return `
            <div class="flex justify-between items-center p-4 bg-zinc-800/50 rounded-xl border border-zinc-800 dark:bg-white dark:border-zinc-200">
                <div>
                    <p class="font-bold">${mov.titulo}</p>
                    <p class="text-xs text-zinc-500">${mov.fecha}</p>
                </div>
                <div class="flex items-center gap-4">
                    <span class="font-black ${isExpense ? 'text-red-400' : 'text-green-400'}">${mov.cantidad.toFixed(2)}€</span>
                    <button onclick="window.eliminarMovimientoGlobal('${mov.id}')" class="text-zinc-600 hover:text-white">✕</button>
                </div>
            </div>`;
    },

    actualizarStats(stats) {
        document.getElementById('statTotal').innerText = `${stats.total.toFixed(2)}€`;
        document.getElementById('statIngresos').innerText = `${stats.ingresos.toFixed(2)}€`;
        document.getElementById('statGastos').innerText = `${stats.gastos.toFixed(2)}€`;
    },

    mostrarBeneficios(lista, info) {
        let html = "<ul class='space-y-3'>";
        info.forEach(benefit => {
            html += `<li class="flex items-center gap-3 text-zinc-400 dark:text-zinc-600">
                        <span class="text-green-500 font-bold">✓</span> ${benefit}
                     </li>`;
        });
        html += "</ul>";
        lista.innerHTML = html;
    }
};