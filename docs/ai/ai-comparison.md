# Comparativa de Asistentes de IA

Este documento detalla la comparativa realizada entre Gemini, ChatGPT y Claude para el desarrollo del proyecto Nexus Bank.

## 1. Explicación de Conceptos Técnicos

He solicitado a los asistentes que expliquen tres conceptos clave. Estos son los resultados:

| Concepto | Gemini | ChatGPT | Claude |
| :--- | :--- | :--- | :--- |
| **DOM** | Usa metáforas excelentes como "la casa y el obrero". Muy intuitivo. | Explicación técnica muy precisa sobre la estructura de árbol. | Muy equilibrado, centrado en la jerarquía de nodos. |
| **Hoisting** | Explicación rápida y directa sobre el "levantamiento" de declaraciones. | Detalló muy bien la diferencia de comportamiento entre var, let y const. | Proporcionó los ejemplos de código más claros para visualizar el error. |
| **Event Loop** | Usó la metáfora del "camarero" que gestiona pedidos. El más fácil de entender. | Explicación académica sobre Call Stack y Task Queue. Muy profunda. | Se centró en la prioridad de microtareas. Nivel muy avanzado. |

## 2. Detección de Errores (Debugging)

He pasado tres funciones con errores intencionales: reasignación de una constante (`const`), concatenación de strings (`"50" + 10`) y variables fuera de ámbito (`scope`).

* **Gemini:** Identificó los 3 errores al instante. Destacó por explicar el error de lógica del string de forma muy sencilla.
* **ChatGPT:** Detectó los fallos y añadió sugerencias de buenas prácticas para evitar errores de tipo en el futuro.
* **Claude:** Fue el más rápido en proporcionar el código corregido con una sintaxis moderna y limpia.

## 3. Generación de Código

Pedí la implementación de tres funciones: un calculador de intereses 4% TAE, un filtro de búsqueda para movimientos y un conmutador de modo oscuro.

* **Calidad de Gemini:** Código muy compatible con mi proyecto actual, fácil de integrar sin dependencias extra.
* **Calidad de ChatGPT:** Código muy robusto, incluyó validaciones para asegurarse de que los inputs fueran números válidos.
* **Calidad de Claude:** La mejor integración con Tailwind CSS. Propuso clases de diseño que encajaban perfectamente con la estética Apple.

## Conclusión Final
Tras las pruebas, he decidido utilizar **Gemini** para la comprensión de conceptos y resolución de dudas rápidas, y **Claude/ChatGPT** a través de **Cursor** para la generación de bloques de código complejos y refactorización, ya que ofrecen una estructura más técnica y segura.