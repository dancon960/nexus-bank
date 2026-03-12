# Flujo de trabajo con Cursor

En este documento registro mi experiencia utilizando Cursor como editor principal para el desarrollo de Nexus Bank, sustituyendo a VS Code para aprovechar sus funciones de IA integrada.

## 1. Exploración de la Interfaz
Tras instalar Cursor, lo primero que destaca es que mantiene la esencia de VS Code, por lo que la curva de aprendizaje ha sido nula. He utilizado principalmente:
* **Chat Contextual (`Ctrl + L`)**: Para preguntar dudas sobre archivos específicos.
* **Barra de edición inline (`Ctrl + K`)**: Para modificar trozos de código directamente en el editor.
* **Composer (`Ctrl + I`)**: Para realizar cambios que afectaban tanto al HTML como al JS al mismo tiempo.

## 2. Atajos de Teclado Frecuentes
Estos son los comandos que más he repetido para agilizar el trabajo:
* `Ctrl + K`: Abrir el prompt de edición rápida sobre una selección.
* `Ctrl + L`: Abrir el chat lateral para consultas generales del proyecto.
* `Ctrl + I`: Abrir el modo Composer para generar archivos completos o cambios masivos.
* `Ctrl + Enter`: Aceptar las sugerencias de código que propone la IA.

## 3. Ejemplos de Mejora en el Proyecto
He documentado dos casos reales donde Cursor ha sido clave:

1. **Refactorización del Modo Oscuro**: Seleccioné el bloque del botón de modo oscuro y usé `Ctrl + K` pidiendo: "Haz que este botón alterne la clase 'dark' en el elemento raíz y guarde la preferencia en LocalStorage". Cursor escribió la lógica completa en segundos.
2. **Sincronización de IDs**: Al crear la sección de movimientos, Cursor detectó automáticamente los IDs que había puesto en el HTML y me sugirió los `getElementById` correctos en el `app.js` sin que tuviera que ir saltando de un archivo a otro.

## 4. Uso de MCP (Model Context Protocol)
He configurado un servidor MCP de tipo **filesystem**. Esto ha permitido que la IA tenga un índice completo de toda mi carpeta `docs/ai`, facilitando que pueda redactar resúmenes cruzando información de distintos documentos de texto del repositorio.