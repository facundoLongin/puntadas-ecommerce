# Roadmap

Este archivo organiza el proyecto por etapas.

## Que Es Un MVP

MVP significa "Minimum Viable Product" o "Producto Minimo Viable".

Es la primera version util del sistema: no tiene todo lo imaginable, pero si lo minimo necesario para que el negocio pueda usarlo, resolver un problema concreto y validar si vamos por buen camino.

Un buen MVP:

- Resuelve el problema principal.
- Evita funciones secundarias.
- Se puede construir rapido.
- Permite recibir feedback real.
- Sirve como base para crecer.

## Etapa 0 - Definicion

Estado: en progreso.

Objetivo:

- Entender el negocio.
- Definir usuarios.
- Definir problema principal.
- Definir MVP.
- Elegir stack tecnico.

## Etapa 1 - MVP

Estado: en progreso.

Contenido propuesto:

- Estructura monorepo con backend y frontend.
- Header principal con logo, buscador, ayuda, mi cuenta, carrito y navegacion.
- Pagina de productos con grilla, filtros y ordenamiento.
- Pagina de detalle de producto.
- Pagina de guia de medidas.
- Datos demo ficticios.
- Backend por capas con endpoint inicial de productos.
- README, `.gitignore` y `.env.example`.

## Etapa 2 - Version 1

Estado: pendiente.

Contenido propuesto:

- Deploy de frontend y backend.
- Base de datos real con migraciones.
- Persistencia real de usuarios, sesiones, productos, carrito y pedidos.
- Checkout seguro o derivacion formal a WhatsApp/pagos.
- Panel administrativo con roles.
- Tests end-to-end con navegador real.
- Monitoreo y logs sin datos sensibles.

## Futuras Mejoras

- Panel administrativo.
- Autenticacion persistente y segura.
- Persistencia real.
- Carrito completo.
- Integracion con WhatsApp o pagos.
- Deploy de produccion.
