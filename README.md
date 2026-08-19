# Puntadas

Proyecto web para un emprendimiento real de productos textiles y deco home.

Este repositorio contiene codigo fuente, documentacion tecnica y datos de demostracion.
Los datos reales del negocio, usuarios, clientes, credenciales y configuraciones privadas no forman parte del repositorio.

## Estructura

```text
backend/   API Node.js + TypeScript organizada por capas
frontend/  Interfaz Next.js + TypeScript + Tailwind CSS
docs/      Documentacion de producto, arquitectura, privacidad y roadmap
```

## Desarrollo

```bash
npm install
npm run dev
```

Frontend local: `http://localhost:3000`

Backend local: `http://localhost:4000`

## Verificacion

```bash
npm test
npm run build
npm run lint --workspace frontend
```

Con el frontend levantado en `http://localhost:3000`, tambien se puede correr:

```bash
npm run test:quality
```

Ese chequeo revisa metadata SEO basica y estructura accesible en rutas clave.

## Privacidad

Antes de publicar cambios, revisar `docs/PRIVACY.md`.
