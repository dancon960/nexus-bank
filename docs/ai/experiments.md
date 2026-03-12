# Experimentos con IA en Programación

En este documento registro las pruebas comparativas realizadas entre la programación tradicional y la asistida por IA.

## 1. Problemas de Programación (Algoritmia)

He resuelto tres problemas típicos de lógica para comparar resultados:

| Tarea | Tiempo sin IA | Tiempo con IA | Diferencia de Calidad |
| :--- | :--- | :--- | :--- |
| **Invertir un Array** | 5 min | < 1 min | Idéntica. Es un problema muy estándar. |
| **Validar un Email** | 15 min | < 1 min | La IA usó una expresión regular (Regex) mucho más completa. |
| **Formatear Moneda** | 10 min | < 1 min | La IA aplicó `Intl.NumberFormat`, una solución más profesional. |

## 2. Tareas del Proyecto Nexus Bank

He aplicado el mismo experimento a tres tareas reales de mi aplicación:

### Experimento A: Buscador de movimientos
* **Sin IA:** Me costó cuadrar que el buscador ignorara las tildes y las mayúsculas/minúsculas. Me llevó unos 25 minutos.
* **Con IA:** Le pedí la lógica a Cursor y en 2 minutos tenía una función que usa `.normalize("NFD")` para las tildes. Mucho más eficiente.

### Experimento B: Diseño de Tarjetas con Tailwind
* **Sin IA:** Perdiendo mucho tiempo mirando la documentación para buscar nombres de clases de bordes y sombras.
* **Con IA:** Describí el estilo ("diseño tipo Apple, minimalista y oscuro") y la IA generó todas las clases de golpe. Ahorré unos 40 minutos.

### Experimento C: Persistencia en LocalStorage
* **Sin IA:** Tuve errores al intentar recuperar datos vacíos (null).
* **Con IA:** La IA implementó un manejo de errores (try/catch) que previene que la web se quede en blanco.

## Conclusión de los experimentos
La IA reduce el tiempo de desarrollo en un 80% en tareas repetitivas o de diseño. Sin embargo, en la resolución de problemas lógicos propios de mi app, sigo necesitando revisar el código para asegurarme de que la integración es correcta.