# SSME-HCG: Sistema del Servicio Médico de Empleados del Hospital Civil de Guadalajara

Este repositorio contiene el código fuente completo para la aplicación SSME, incluyendo todos los microservicios del backend y la aplicación de frontend.

## 🏛️ Arquitectura

SSME está construido sobre una **arquitectura de microservicios** orquestada con Docker Compose y una moderna **aplicación de página única (SPA)** en el frontend.

-   **Backend:** 4 microservicios escritos en Python con FastAPI (Autenticación, Expedientes Clínicos, Agendamiento, Inferencia IA).
-   **Frontend:** Una aplicación React construida con Vite, TypeScript, y Tailwind CSS.

Para una descripción detallada de la arquitectura, patrones y decisiones de diseño, consulta nuestro **[Manual de Arquitectura](./docs/ARCHITECTURE.md)**.

## 🚀 Guía de Inicio Rápido (Desarrollo Local)

Sigue estos pasos para levantar el entorno de desarrollo completo.

### Prerrequisitos

-   Docker y Docker Compose
-   Node.js (v18 o superior) y npm

### 1. Configuración del Backend

Los servicios del backend se ejecutan dentro de contenedores de Docker.

```bash
# 1. Clona el repositorio
git clone <url-del-repositorio>
cd ssme-hcg

# 2. Configura las variables de entorno
# Copia el archivo de ejemplo. No se necesitan cambios para el desarrollo local básico.
cp .env.example .env

# 3. Construye y levanta los contenedores
sudo docker compose up --build
```

La API estará disponible a través del gateway en http://localhost:80.

### 2. Configuración del Frontend

La aplicación de frontend se ejecuta localmente para una mejor experiencia de desarrollo.

```bash
# 1. Navega al directorio del frontend (desde la raíz del proyecto)
cd ssme-frontend

# 2. Instala las dependencias
npm install

# 3. Configura las variables de entorno
# Copia el archivo de ejemplo. La URL base por defecto ya apunta a tu entorno local.
cp .env.example .env.local

# 4. Inicia el servidor de desarrollo
npm run dev
```

La aplicación frontend estará disponible en http://localhost:5173.

## 🤝 Contribuir

¡Nos encanta recibir contribuciones! Antes de empezar, por favor lee nuestra Guía del Contribuidor para entender nuestro flujo de trabajo y estándares de código.