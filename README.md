# Abeeflow web

Sitio de Abeeflow: una sola página en español e inglés, con tema claro y oscuro y un chat que responde consultas de visitantes.

Hecho con React, TypeScript y Vite. Se publica en Vercel.

## Requisitos

- Node.js 22 o superior
- Una API key de NVIDIA para el chat. Se crea gratis en https://build.nvidia.com

## Correr en local

```bash
npm install
cp .env.example .env
npm run dev
```

Antes de `npm run dev`, abre `.env` y pega tu key en `NVIDIA_API_KEY`. Sin la key la web funciona igual, pero el chat responde con un error.

La web queda en http://localhost:5173, con el chat incluido.

Para usar otro puerto: `PORT=3000 npm run dev`.

## Otros comandos

| Comando | Qué hace |
| --- | --- |
| `npm run build` | Revisa los tipos y genera la versión de producción en `dist/` |
| `npm run preview` | Sirve `dist/` para revisarla. El chat no funciona en este modo |
| `npm run lint` | Busca errores con ESLint |

## Cómo está organizado

| Ruta | Contenido |
| --- | --- |
| `index.html` | Página base y etiquetas de SEO |
| `src/App.tsx` | Orden de las secciones de la página |
| `src/components/` | Una sección o pieza visual por archivo, cada una con su CSS |
| `src/i18n/translations.ts` | Todos los textos, en español e inglés |
| `src/hooks/` y `src/lib/` | Lógica compartida: tema, scroll suave, animaciones |
| `api/chat.js` | Backend del chat. Vercel lo publica en `/api/chat` |
| `dev-server.js` | Servidor local. Sirve la web y el chat juntos |
| `vercel.json` | Cabeceras de seguridad y caché en producción |

## El chat

El botón flotante abre el chat (`src/components/ChatWidget.tsx`). Cada mensaje va a `/api/chat`, que consulta un modelo de NVIDIA y devuelve la respuesta.

En `api/chat.js` se cambia todo lo del asistente:

- `SYSTEM_PROMPT`: qué sabe, cómo habla y qué reglas sigue.
- `MODELS`: los modelos, en orden de preferencia. Si el primero falla, responde el siguiente.
- `MAX_MESSAGES`: largo máximo de una conversación. Al llegar al límite, el chat invita a seguir por WhatsApp.

## Publicar en Vercel

1. En el proyecto de Vercel, ve a Settings > Environment Variables y agrega `NVIDIA_API_KEY`.
2. Haz push a `main`. Vercel construye y publica solo.

El archivo `.env` no se sube al repositorio. La key de producción vive solo en Vercel.
