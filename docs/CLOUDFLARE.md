# Cloudflare

Guia operativa para desplegar Puntadas en Cloudflare sin publicar datos reales ni secretos.

## Estado Actual

- Frontend listo para Cloudflare Pages como export estatico de Next.js.
- API Worker inicial deployada con `health` y productos demo.
- Base D1 `puntadas-db` creada y enlazada al Worker como `DB`.
- Autenticacion en Worker pendiente de aplicar migraciones y redeploy con D1.
- El backend Express local sigue siendo la referencia completa para desarrollo de cuentas en memoria.

## URLs Actuales

```text
Frontend Pages: https://puntadas-ecommerce.pages.dev
Worker API: https://puntadas-api.facundo-longin.workers.dev
```

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

Binding D1 actual:

```text
binding: DB
database_name: puntadas-db
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

- La base D1 existe, pero falta aplicar migraciones y redeployar el Worker con el binding activo.
- El flujo completo de registro/login sigue funcionando localmente con Express y memoria.
- Para una prueba publica completa de cuentas y compra, falta verificar registro/login contra D1 deployado.

## Seguridad

- No subir tokens de Cloudflare, API keys ni archivos `.env` reales.
- Configurar secretos y variables privadas solo en el panel de Cloudflare.
- Usar datos ficticios para pruebas publicas.
- Revisar `docs/PRIVACY.md` antes de conectar una base de datos real o publicar capturas.
