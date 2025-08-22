# Guía para Contribuidores de SSME

¡Gracias por tu interés en contribuir a SSME! Esta guía te ayudará a empezar.

## Flujo de Trabajo con Git

Seguimos un flujo de trabajo basado en ramas de funcionalidad para mantener el historial limpio y organizado.

### Nomenclatura de Ramas

Usa los siguientes prefijos para nombrar tus ramas:

-   **feature/**: Para nuevas funcionalidades (ej. `feature/real-time-chat`).
-   **fix/**: Para la corrección de errores (ej. `fix/login-button-disabled-state`).
-   **chore/**: Para tareas que no son ni features ni fixes (ej. `chore/update-react-version`).

### Proceso de Pull Request (PR)

1.  **Crea un Issue:** Antes de empezar a trabajar, asegúrate de que haya un issue en GitHub que describa la funcionalidad o el error.
2.  **Crea tu Rama:** Crea tu rama a partir de la rama `main` siguiendo la nomenclatura anterior.
3.  **Desarrolla:** Escribe tu código, siguiendo los estándares del proyecto.
4.  **Añade Pruebas:** Cualquier nueva funcionalidad debe ir acompañada de pruebas unitarias o de integración que la validen.
5.  **Abre el PR:** Al abrir el Pull Request, enlaza el issue que resuelve y proporciona una descripción clara de los cambios.
6.  **Pasa las Comprobaciones:** El pipeline de CI/CD ejecutará automáticamente el `lint` y las `pruebas`. Un PR no se podrá fusionar si estas comprobaciones fallan.
7.  **Revisión y Fusión:** El PR debe ser revisado y aprobado por al menos otro miembro del equipo antes de ser fusionado a `main`.

## Estándares de Código

-   **Linting y Formato:** Usamos ESLint y Prettier. Asegúrate de que tu editor esté configurado para formatear el código al guardar.
-   **Patrones de Diseño:** Sigue los patrones establecidos en el [Manual de Arquitectura](./docs/ARCHITECTURE.md).

## Cómo Añadir una Nueva Funcionalidad (Checklist)

-   [ ] He creado/asignado un issue para esta funcionalidad.
-   [ ] He creado una nueva rama (`feature/...`) a partir de `main`.
-   [ ] He definido los tipos de API necesarios en `/src/types/`.
-   [ ] He creado los hooks de TanStack Query (`useQuery`/`useMutation`) en el directorio de la feature.
-   [ ] He construido los componentes de React necesarios.
-   [ ] He añadido pruebas unitarias/integración para la nueva funcionalidad.
-   [ ] He protegido los nuevos componentes/rutas con el sistema de RBAC si es necesario.
-   [ ] He actualizado la documentación (`ARCHITECTURE.md`) si mis cambios introducen un nuevo patrón.
