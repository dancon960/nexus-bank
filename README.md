🏦 Nexus Bank - Fintech Landing Page
Este proyecto es una Landing Page interactiva para un banco digital ficticio, desarrollada como parte del Grado Superior en DAM. El objetivo principal fue implementar una estructura web, un diseño moderno "Mobile First" y un flujo de despliegue continuo (CI/CD).

🚀 Tecnologías y Herramientas

• Frontend: HTML5 semántico, CSS3 (Variables :root, Flexbox, Media Queries).

• Control de versiones: Git & GitHub.

• Despliegue: Vercel (CI/CD automático desde repositorio).

🛠️ Características Destacadas

• Diseño Responsivo: Adaptado para dispositivos móviles y escritorio.

• Interfaz de Usuario (UI): Estética minimalista con modo oscuro y componentes interactivos (Modales).

• Estructura DevOps: Configuración de entorno de producción real mediante integración de GitHub con Vercel.

---

Este proyecto es la base para una futura implementación Fullstack con integración en AWS.

## 🆕 Evolución Fullstack: Integración con Node.js & Express

En esta fase del proyecto, se ha trascendido el entorno del navegador para implementar una **Arquitectura de Servidor** robusta, eliminando la persistencia en `LocalStorage` en favor de una API real.

### ⚙️ Backend (Capa de Servidor)
Ubicado en la carpeta `/server`, el backend se ha diseñado bajo una **Arquitectura por Capas** para garantizar la mantenibilidad:
* **Capa de Rutas (Routes):** Definición semántica de endpoints bajo el estándar RESTful (`/api/v1/tasks`).
* **Capa de Controladores (Controllers):** Gestión del flujo request-response y **Validación de Frontera de Red** (validación estricta de datos entrantes).
* **Capa de Servicios (Services):** Lógica de negocio pura, desacoplada de la infraestructura de Express.
* **Gestión de Errores:** Middleware global con mapeo semántico de códigos HTTP (400, 404, 500).

### 🌐 Conectividad Frontend (Fase D)
* **Transparencia de Red:** Implementación de `fetch` con funciones asíncronas (`async/await`) para la comunicación con el servidor.
* **Gestión de Estados de UI:** La interfaz ahora gestiona visualmente los estados de **Carga (Loading)**, **Éxito** y **Error de Red**, proporcionando feedback en tiempo real al usuario durante la comunicación con la API.

## 🛠️ Cómo arrancar el entorno de desarrollo

1.  **Servidor:** * `cd server`
    * `npm install`
    * `npm run dev` (Requiere archivo `.env` con `PORT=3000`)
2.  **Cliente:**
    * Abrir `index.html` (Asegúrate de que el servidor esté corriendo para habilitar el acceso al Simulador).