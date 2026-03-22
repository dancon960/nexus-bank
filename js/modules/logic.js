/**
 * Módulo de Lógica de Negocio
 * Lógica de la calculadora de rentabilidad
 */
function calcularRentabilidad(principal, aporte, anos, interesAnual = 0.04) {
    const meses = anos * 12;
    const r = interesAnual / 12; // Interés mensual
    
    // Fórmula: Capital Final = P(1+r)^n + PMT * [((1+r)^n - 1) / r]
    const capitalFinal = principal * Math.pow(1 + r, meses) + 
                         aporte * ((Math.pow(1 + r, meses) - 1) / r);
    
    const invertido = principal + (aporte * meses);
    const intereses = capitalFinal - invertido;

    return {
        total: capitalFinal,
        ganancia: intereses
    };
}