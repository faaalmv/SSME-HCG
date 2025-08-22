# Manual de Arquitectura de SSME Frontend

Este documento describe la arquitectura, los principios y los patrones de diseño utilizados en la aplicación frontend de SSME.

## 1. Manifiesto de Ingeniería Creativa

La construcción de SSME se guía por una serie de principios clave diseñados para crear una experiencia de usuario superior y un código base mantenible:

-   **Experiencia de Usuario (UX) Primero:** Cada decisión técnica se toma con el objetivo de crear una interfaz fluida, intuitiva y que no interrumpa el flujo de trabajo del profesional clínico.
-   **UI Optimista:** La aplicación responde instantáneamente a las acciones del usuario, actualizando la interfaz de manera optimista mientras las operaciones de red se completan en segundo plano. Esto crea una percepción de velocidad y reactividad inigualable.
-   **Seguridad por Diseño:** La seguridad no es una ocurrencia tardía. Se integra en cada capa, desde la autenticación robusta con JWT y refresh tokens hasta un control de acceso granular basado en roles (RBAC).
-   **Estado Centralizado y Predecible:** Separamos rigurosamente el estado del servidor (manejado por TanStack Query) del estado global de la UI (manejado por Zustand), creando un flujo de datos claro y fácil de depurar.

## 2. Estructura de Directorios

La organización del código está diseñada para la escalabilidad y la mantenibilidad, agrupando el código por funcionalidad (`features`).

/src
├── components/      # Componentes de UI genéricos y reutilizables (ErrorBoundary, etc.)
├── features/        # El corazón de la aplicación, cada "feature" es un módulo autocontenido.
│   ├── auth/        # Lógica de autenticación (login, registro, RBAC).
│   ├── clinical-records/ # Gestión de expedientes.
│   ├── scheduling/  # Gestión de citas.
│   └── ...          # (Otras features futuras)
├── hooks/           # Hooks personalizados y reutilizables (ej. useDebounce).
├── lib/             # Módulos de bajo nivel y configuración (axios, permissions, logger).
├── pages/           # Componentes de página genéricos (ej. NotFoundPage).
├── router/          # Lógica de enrutamiento (ProtectedRoute).
├── stores/          # Stores globales de Zustand (auth, theme, etc.).
└── types/           # Definiciones de tipos y esquemas de validación (API, auth).