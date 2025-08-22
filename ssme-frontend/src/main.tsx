import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Sentry from "@sentry/react";
import App from './App.tsx';
import './index.css';

// Solo inicializar Sentry en producción para no generar ruido durante el desarrollo.
if (import.meta.env.PROD) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [
      // Habilita el monitoreo de rendimiento
      Sentry.browserTracingIntegration(),
      // Habilita el replay de sesiones para entender el contexto de los errores
      Sentry.replayIntegration(),
    ],
    // Ajusta esta tasa en producción según tus necesidades
    tracesSampleRate: 1.0, 
    // Ajusta esta tasa para capturar replays de sesiones
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    environment: import.meta.env.MODE,
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);