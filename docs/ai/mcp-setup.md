Model Context Protocol (MCP) es un sistema que permite a la IA conectarse directamente con herramientas externas o con mi sistema de archivos de forma más profunda. En lugar de solo "ver" el código, puede ejecutar acciones como buscar archivos específicos o leer carpetas enteras con más precisión.
## 5. Pruebas de funcionamiento y Consultas MCP

Una vez configurado el acceso al sistema de archivos, se han realizado una serie de consultas para validar que la IA de Cursor puede interactuar con el contexto completo del proyecto Nexus Bank de manera eficiente.

### 5.1. Consultas realizadas al Servidor/Contexto
A continuación se detallan las cinco consultas clave para verificar la integración:

1.  **Exploración de estructura:**
    * **Consulta:** *"¿Puedes listarme todos los archivos que hay en la carpeta `docs/ai`?"*
    * **Resultado:** La IA identificó correctamente archivos como `ai-comparison.md`, `mcp-setup.md` y `cursor-workflow.md`, demostrando acceso total a la documentación.

2.  **Búsqueda de lógica persistente:**
    * **Consulta:** *"Busca en todo el proyecto dónde estoy utilizando la palabra `localStorage`."*
    * **Resultado:** Se localizaron con precisión las funciones de gestión del tema oscuro y el guardado de datos del contrato en `app.js`.

3.  **Auditoría de Arquitectura:**
    * **Consulta:** *"Analiza la estructura de carpetas de Nexus Bank y dime si sigue un orden lógico."*
    * **Resultado:** La IA sugirió una refactorización para separar los archivos por responsabilidades (carpetas `/css` y `/js`), mejorando la escalabilidad.

4.  **Detección de dependencias activas:**
    * **Consulta:** *"¿Hay algún archivo CSS que no esté siendo utilizado en mi `index.html`?"*
    * **Resultado:** Verificación exitosa de que `animaciones.css` (generado previamente con Composer) estaba correctamente enlazado en el `<head>`.

5.  **Resumen ejecutivo de documentación:**
    * **Consulta:** *"Resume el contenido de todos los archivos Markdown de la carpeta docs."*
    * **Resultado:** La IA generó un resumen coherente de todo el proceso de aprendizaje y configuración realizado durante la práctica.

---

## 6. Utilidad de MCP en proyectos reales

El Model Context Protocol (MCP) no es solo una herramienta de lectura; en un entorno de desarrollo profesional, su uso es crítico por los siguientes motivos:

* **Revisiones de Código Masivas:** Permite a la IA realizar auditorías de seguridad buscando vulnerabilidades en cientos de archivos a la vez.
* **Conexión con Herramientas Extern