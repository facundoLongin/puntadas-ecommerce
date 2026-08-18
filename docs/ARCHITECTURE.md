# Arquitectura

Este archivo describe como esta construido el proyecto y como se conectan sus partes.

## Estado Actual

Arquitectura definida como monorepo con dos aplicaciones principales:

- `backend/`: API y reglas de negocio organizadas por capas.
- `frontend/`: interfaz web orientada a clientes.

## Stack Tecnico

- Frontend: Next.js, TypeScript, Tailwind CSS.
- Backend: Node.js, TypeScript, Express.
- Base de datos: por definir. Inicialmente repositorios en memoria con datos demo.
- Autenticacion: por definir. No incluida en el primer corte publico.
- Hosting/deploy: por definir.

## Estructura Del Proyecto

```text
/
  AGENTS.md
  README.md
  package.json
  .gitignore
  .env.example
  backend/
  frontend/
  docs/
    PROJECT.md
    REQUIREMENTS.md
    ARCHITECTURE.md
    DECISIONS.md
    ROADMAP.md
    TASKS.md
    GLOSSARY.md
```

## Backend

```text
backend/
  src/
    domain/
      product/
    application/
      services/
      use-cases/
    infrastructure/
      persistence/
      repositories/
    interfaces/
      http/
        controllers/
        routers/
        middlewares/
    shared/
      errors/
      validation/
      config/
```

### Capas

- `domain`: tipos, entidades y reglas puras del negocio.
- `application`: casos de uso y servicios que coordinan reglas.
- `infrastructure`: persistencia concreta, datos demo, base de datos futura.
- `interfaces/http`: controllers, routers y middlewares HTTP.
- `shared`: errores, config, validacion y utilidades transversales.

### Estado Implementado

- API Express inicial.
- Endpoint `GET /health`.
- Endpoint `GET /api/products`.
- Endpoint `GET /api/products/:slug`.
- Repositorio en memoria con productos demo ficticios.
- Manejo centralizado de errores.
- Validacion de query params con Zod.

## Frontend

```text
frontend/
  src/
    app/
    components/
      layout/
      products/
      ui/
    features/
      products/
    lib/
    types/
```

### Convenciones Frontend

- Componentes chicos y reutilizables.
- Logica de productos/filtros en `features/products` o `lib`, no duplicada en componentes visuales.
- Componentes `ui` genericos para botones, inputs, selects, checkboxes, drawers y badges.
- Componentes de dominio visual en `components/products`.
- Layout global en `components/layout`.

### Estado Implementado

- Layout global con header y footer.
- Home.
- Productos con grilla, filtros y ordenamiento.
- Detalle de producto por slug.
- Guia de medidas.
- Paginas base de contacto, quienes somos, formas de pago y preguntas frecuentes.
- Componentes reutilizables de UI, layout y productos.
- Imagenes de producto servidas desde `frontend/public/images/products/`.

## Flujo General

1. El cliente navega el frontend.
2. El frontend solicita productos a la API o usa datos demo durante el primer corte.
3. El backend resuelve casos de uso desde servicios.
4. Los servicios consultan repositorios por contrato.
5. La infraestructura implementa esos repositorios con datos demo o base de datos real.
6. Controllers y middlewares convierten errores de aplicacion en respuestas HTTP claras.

## Convenciones

- Documentar decisiones relevantes.
- Mantener nombres claros y consistentes.
- Preferir componentes/modulos pequenos y faciles de probar.
- Evitar duplicacion de logica.
- Evitar dependencias directas desde dominio hacia infraestructura.
- Mantener errores controlados en `shared/errors`.
