/**
 * Módulo de Lógica de Negocio
 * Lógica de cálculos y filtros
 */
function calcularEstadisticas(movimientos) {
    let total = 0;
    let ingresos = 0;
    let gastos = 0;

    movimientos.forEach(mov => {
        const amount = parseFloat(mov.cantidad);
        total += amount;
        if (amount < 0) {
            gastos += Math.abs(amount);
        } else {
            ingresos += amount;
        }
    });

    return { total, ingresos, gastos };
}

function filtrarPorTipo(movimientos, tipo) {
    if (tipo === 'todos') return movimientos;
    return movimientos.filter(mov => 
        tipo === 'gasto' ? mov.cantidad < 0 : mov.cantidad >= 0
    );
}