# abeeFlow Web - Formulario de Contacto

Web page para abeeFlow con formulario de contacto funcional que envía emails usando Gmail, desplegable en Vercel.

## Configuración de Gmail App Password

Para poder enviar emails con Gmail, necesitas generar una "App Password":

1. Ve a tu cuenta de Google: https://myaccount.google.com/
2. Busca "Seguridad" en el menú lateral
3. Activa la "Verificación en 2 pasos" si aún no la tienes activa
4. Una vez activada, busca "Contraseñas de aplicaciones"
5. Genera una nueva contraseña para "Correo" y "Otro (personalizado)"
6. Nombra la aplicación "abeeFlow Web"
7. Copia la contraseña de 16 caracteres que te genera (ej: `xxxx xxxx xxxx xxxx`)

## Despliegue en Vercel (Recomendado)

### 1. Instalar Vercel CLI (opcional)

```bash
npm install -g vercel
```

### 2. Conectar tu proyecto a Vercel

Hay dos opciones:

**Opción A - Desde el Dashboard de Vercel (más fácil):**
1. Ve a https://vercel.com/
2. Haz clic en "Add New" → "Project"
3. Importa tu repositorio de GitHub/GitLab/Bitbucket
4. Vercel detectará automáticamente la configuración

**Opción B - Desde la terminal:**
```bash
vercel
```

### 3. Configurar Variables de Entorno en Vercel

En el dashboard de Vercel (o durante el despliegue):

1. Ve a Settings → Environment Variables
2. Agrega las siguientes variables:

```
GMAIL_USER=tu-email@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
RECIPIENT_EMAIL=contacto@abeeflow.com
```

**Importante:** No incluyas `PORT` en Vercel (se configura automáticamente).

### 4. Desplegar

Si usas Git, simplemente haz push a tu repositorio y Vercel desplegará automáticamente:

```bash
git add .
git commit -m "Deploy to Vercel"
git push
```

O desde la terminal con Vercel CLI:

```bash
vercel --prod
```

Tu sitio estará disponible en: `https://tu-proyecto.vercel.app`

## Desarrollo Local

### 1. Instalar dependencias

```bash
npm install
```

### 2. Crear archivo .env local

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus datos:

```env
PORT=3000
GMAIL_USER=tu-email@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
RECIPIENT_EMAIL=contacto@abeeflow.com
```

### 3. Ejecutar el servidor local

```bash
npm run server
```

El servidor estará corriendo en http://localhost:3000

### 4. Probar el formulario

1. Abre http://localhost:3000 en tu navegador
2. Scroll hasta el formulario de contacto
3. Completa los campos:
   - Nombre completo (requerido)
   - Empresa (opcional)
   - Email corporativo (requerido)
   - Mensaje (requerido)
4. Haz clic en "Agendar sesión"
5. Deberías recibir un email en el `RECIPIENT_EMAIL` configurado

## Estructura del proyecto

```
abeeflow-web/
├── api/
│   └── contact.js          # Función serverless de Vercel
├── index.html              # Página principal con formulario
├── server.js               # Servidor local (solo para desarrollo)
├── vercel.json             # Configuración de Vercel
├── .env                    # Variables locales (no en git)
├── .env.example            # Plantilla de configuración
├── package.json            # Dependencias del proyecto
└── README.md              # Este archivo
```

## Diferencias entre Local y Vercel

- **Local:** Usa `server.js` (Express tradicional) → `npm run server`
- **Vercel:** Usa `api/contact.js` (función serverless) → despliegue automático

El formulario HTML funciona con ambos sin cambios.

## Troubleshooting

### Error: "Invalid login: 535-5.7.8 Username and Password not accepted"
- Verifica que el `GMAIL_USER` sea correcto
- Asegúrate de haber generado una App Password correctamente
- Verifica que la verificación en 2 pasos esté activa en tu cuenta de Google
- En Vercel, verifica que las variables de entorno estén configuradas correctamente

### El formulario no envía datos en Vercel
- Verifica que las variables de entorno estén configuradas en Vercel Dashboard
- Revisa los logs en Vercel Dashboard → Functions
- Asegúrate de que el despliegue esté completo

### No recibo el email
- Revisa la carpeta de spam
- Verifica que el `RECIPIENT_EMAIL` esté correcto
- En Vercel, revisa los logs de la función en el Dashboard
- Verifica que la App Password sea válida

### Error en desarrollo local
- Verifica que el archivo `.env` exista y tenga las variables correctas
- Asegúrate de que el servidor esté corriendo (`npm run server`)
- Revisa la consola del navegador (F12) para errores

## Notas de seguridad

- El archivo `.env` está excluido del repositorio git (.gitignore)
- Nunca compartas tu App Password de Gmail
- La App Password solo funciona si tienes la verificación en 2 pasos activa
- En Vercel, las variables de entorno están encriptadas y seguras
- No subas el archivo `.env` a Git (ya está en .gitignore)

## Testing en Vercel

Una vez desplegado, puedes probar el formulario en producción:

1. Ve a tu URL de Vercel (ej: `https://tu-proyecto.vercel.app`)
2. Scroll hasta el formulario
3. Envía un mensaje de prueba
4. Revisa los logs en Vercel Dashboard si hay algún problema

## Variables de Entorno

| Variable | Descripción | Local | Vercel |
|----------|-------------|-------|--------|
| `PORT` | Puerto del servidor | ✅ | ❌ (automático) |
| `GMAIL_USER` | Email de Gmail | ✅ | ✅ |
| `GMAIL_APP_PASSWORD` | App Password de Gmail | ✅ | ✅ |
| `RECIPIENT_EMAIL` | Email receptor | ✅ | ✅ |
