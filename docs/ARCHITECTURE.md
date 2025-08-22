# Manual de Arquitectura de SSME Frontend

Este documento describe la arquitectura, los principios y los patrones de diseño utilizados en la aplicación frontend de SSME.

## 1. Manifiesto de Ingeniería Creativa

La construcción de SSME se guía por una serie de principios clave diseñados para crear una experiencia de usuario superior y un código base mantenible:

-   **Experiencia de Usuario (UX) Primero:** Cada decisión técnica se toma con el objetivo de crear una interfaz fluida, intuitiva y que no interrumpa el flujo de trabajo del profesional clínico.
-   **UI Optimista:** La aplicación responde instantáneamente a las acciones del usuario, actualizando la interfaz de manera optimista mientras las operaciones de red se completan en segundo plano. Esto crea una percepción de velocidad y reactividad inigualable.
-   **Seguridad por Diseño:** La seguridad no es una ocurrencia tardía. Se integra en cada capa, desde la autenticación robusta con JWT y refresh tokens hasta un control de acceso granular basado en roles (RBAC).
-   **Estado Centralizado y Predecible:** Separamos rigurosamente el estado del servidor (manejado por TanStack Query) del estado global de la UI (manejado por Zustand), creando un flujo de datos claro y fácil de depurar.
