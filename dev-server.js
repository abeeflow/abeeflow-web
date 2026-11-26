// Servidor para trabajar en local: la web, /api/chat y /api/lead en un mismo
// puerto. En producción no se usa: Vercel sirve la web y ejecuta api/*.js.
import express from 'express';
import { createServer as createViteServer } from 'vite';
import chat from './api/chat.js';
import lead from './api/lead.js';

const port = process.env.PORT || 5173;
const app = express();
const server = app.listen(port, () => {
  console.log(`Abeeflow en http://localhost:${port}`);
});

app.all('/api/chat', express.json(), chat);
app.all('/api/lead', express.json(), lead);

// Vite sirve la web y la recarga sola cuando cambias un archivo.
const vite = await createViteServer({
  server: { middlewareMode: true, hmr: { server } },
});
app.use(vite.middlewares);
