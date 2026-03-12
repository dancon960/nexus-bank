# Ingeniería de Prompts

En este documento registro las técnicas de "prompting" que he utilizado para comunicarme de forma efectiva con la IA y obtener el mejor código para Nexus Bank.

## 1. Técnicas de Prompting Utilizadas

### A. Definición de Rol (Role Prompting)
En lugar de pedir cosas genéricas, he asignado un rol específico a la IA.
* **Prompt:** "Actúa como un desarrollador Senior experto en accesibilidad y Tailwind CSS. Revisa mi archivo index.html."
* **Resultado:** La IA se centró en detalles técnicos como el contraste de colores y etiquetas ARIA que antes pasaban desapercibidas.

### B. Razonamiento Paso a Paso (Chain of Thought)
Para funciones complejas, pedí a la IA que explicara la lógica antes de programar.
* **Prompt:** "Explica paso a paso cómo vamos a filtrar los movimientos por tipo (ingreso/gasto) y luego escribe el código."
* **Resultado:** Esto evitó errores de lógica y me ayudó a entender mejor cómo funciona el método `.filter()`.

### C. Few-Shot Prompting (Ejemplos previos)
Le di a la IA un ejemplo de cómo quería las tarjetas de mi web para que las siguientes fueran iguales.
* **Prompt:** "Si esta es mi tarjeta de 'Interés', genera una similar para 'Seguridad' siguiendo el mismo esquema de clases de Tailwind."
* **Resultado:** Mantuve una coherencia visual perfecta en todo el sitio.

## 2. Listado de 10 Prompts Útiles

1. "Refactoriza esta función de LocalStorage para que sea más robusta y maneje errores si el JSON está corrupto."
2. "Añade comentarios JSDoc a todas mis funciones explicando qué hace cada parámetro."
3. "Busca posibles vulnerabilidades de seguridad en este formulario de login simulado."
4. "Convierte este diseño de tres columnas a una sola columna para dispositivos móviles usando Tailwind."
5. "Explícame la diferencia entre usar una función tradicional y una arrow function en este manejador de eventos."
6. "Optimiza este bucle para que la aplicación no se ralentice si el usuario tiene cientos de movimientos guardados."
7. "Genera una paleta de colores en modo oscuro que combine con un gris zinc muy oscuro (#18181b)."
8. "Crea una validación para que el campo de cantidad solo acepte números y no texto."
9. "Añade un efecto de escala suave (hover:scale) a todas las tarjetas de información."
10. "Actúa como un tester de QA y dime 5 casos de prueba extremos que podrían romper mi aplicación."

## 3. Conclusión
La clave del éxito no ha sido pedir "hazme una web", sino guiar a la IA con restricciones claras y pidiendo explicaciones de cada bloque de código generado.