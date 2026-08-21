# Cloudflare

Guia operativa para desplegar Puntadas en Cloudflare sin publicar datos reales ni secretos.

## Estado Actual

- Frontend listo para Cloudflare Pages como export estatico de Next.js.
- API Worker inicial listo para `health` y productos demo.
- Autenticacion en Worker pendiente hasta incorporar D1 u otra persistencia real.
- El backend Express local sigue siendo la referencia completa para desarrollo de cuentas en memoria.

## Servicios A Usar

- Cloudflare Pages para el frontend.
- Cloudflare Workers para la API.
- Cloudflare D1 en etapa siguiente para usuarios, sesiones, productos y pedidos persistentes.

## Frontend En Pages

Configuracion sugerida al crear el proyecto en Cloudflare Pages desde GitHub:

```text
Framework preset: Next.js (Static HTML Export)
Root directory: /
Build command: npm run build:cloudflare:frontend
Build output directory: frontend/out
```

Variables de entorno publicas sugeridas:

```text
NEXT_PUBLIC_SITE_URL=https://<tu-proyecto>.pages.dev
NEXT_PUBLIC_API_BASE_URL=https://<tu-worker>.<tu-subdominio>.workers.dev/api
```

`NEXT_PUBLIC_*` queda visible en el navegador. No usar estas variables para secretos.

## API En Workers

Configuracion local versionada:

```text
backend/wrangler.toml
```

Comandos previstos:

```bash
npm run build:cloudflare:api
npx wrangler deploy --config backend/wrangler.toml
```

El Worker versiona `FRONTEND_ORIGIN` con el dominio actual de Pages para limitar CORS:

```text
FRONTEND_ORIGIN=https://<tu-proyecto>.pages.dev
```

## Limitaciones De Esta Etapa

- El Worker no persiste usuarios ni sesiones.
- Los endpoints de auth del Worker responden que la autenticacion requiere la etapa D1.
- El flujo completo de registro/login sigue funcionando localmente con Express y memoria.
- Para una prueba publica completa de cuentas y compra, primero hay que implementar D1 y sesiones persistentes.

## Seguridad

- No subir tokens de Cloudflare, API keys ni archivos `.env` reales.
- Configurar secretos y variables privadas solo en el panel de Cloudflare.
- Usar datos ficticios para pruebas publicas.
- Revisar `docs/PRIVACY.md` antes de conectar una base de datos real o publicar capturas.
