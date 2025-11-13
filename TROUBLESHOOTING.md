# Solución de problemas - npm run dev

## Cambios realizados

1. **Simplificada la configuración de Vite** - Se removió el plugin experimental de React Compiler que podía causar problemas
2. **Verificados todos los componentes** - Todos los componentes están correctamente exportados

## Pasos para diagnosticar

### 1. Verificar que las dependencias estén instaladas

```powershell
npm install
```

### 2. Limpiar caché y reinstalar (si es necesario)

```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### 3. Verificar que el puerto 5173 esté disponible

Vite usa el puerto 5173 por defecto. Si está ocupado, puedes cambiarlo en `vite.config.ts`:

```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000  // o cualquier otro puerto
  }
})
```

### 4. Ejecutar con más información de debug

```powershell
npm run dev -- --debug
```

### 5. Verificar errores en la consola

Abre la consola del navegador (F12) y revisa si hay errores de JavaScript.

## Errores comunes

### Error: "Cannot find module"
- Ejecuta `npm install` para reinstalar dependencias

### Error: "Port already in use"
- Cambia el puerto en `vite.config.ts` o cierra el proceso que está usando el puerto

### Error: "Failed to resolve import"
- Verifica que todos los archivos de componentes existan en `src/components/`
- Verifica que las importaciones en `App.tsx` sean correctas

### El servidor inicia pero la página está en blanco
- Revisa la consola del navegador (F12)
- Verifica que `index.html` tenga el `<div id="root"></div>`
- Verifica que `src/main.tsx` esté correctamente configurado

## Estructura esperada

```
src/
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Benefits.tsx
│   ├── Cases.tsx
│   ├── Process.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── services/
│   └── contactService.ts
├── App.tsx
├── main.tsx
└── index.css
```

## Si nada funciona

1. Verifica la versión de Node.js (debe ser >= 18):
   ```powershell
   node --version
   ```

2. Verifica la versión de npm:
   ```powershell
   npm --version
   ```

3. Intenta crear un proyecto nuevo de prueba:
   ```powershell
   npm create vite@latest test-app -- --template react-ts
   cd test-app
   npm install
   npm run dev
   ```

Si el proyecto de prueba funciona, el problema es específico de este proyecto.

