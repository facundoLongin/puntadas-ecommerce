# Portfolio

Este proyecto puede presentarse como trabajo real de portfolio, siempre cuidando privacidad y seguridad.

## Enfoque Publico

El repositorio publico debe mostrar:

- Problema que resuelve.
- Alcance del MVP.
- Arquitectura.
- Stack tecnico.
- Capturas con datos demo.
- Flujo principal de uso.
- Decisiones de producto y tecnica.
- Tests o verificaciones relevantes.

## Texto Sugerido Para README

```md
Proyecto desarrollado para un emprendimiento real.

Este repositorio contiene el codigo fuente, documentacion tecnica y datos de demostracion.
Los datos reales del negocio, usuarios, clientes, credenciales y configuraciones privadas no forman parte del repositorio.
```

## Datos Demo

Usar nombres y valores ficticios, por ejemplo:

- Cliente: Ana Demo.
- Telefono: +54 11 0000-0000.
- Email: ana.demo@example.com.
- Servicio: Arreglo de ruedo.
- Estado: Pendiente.

## Reglas Para Capturas

- Usar datos ficticios.
- No mostrar URLs privadas con tokens.
- No mostrar paneles con informacion real.
- No mostrar emails, telefonos o direcciones reales.
- Si se usan imagenes del negocio, confirmar permiso antes de publicarlas.

## Opciones De Publicacion

### Repo publico unico

Codigo y documentacion visibles. Produccion usa base de datos y variables privadas.

### Repo publico de portfolio + repo privado de produccion

El repo publico muestra una version demo. El repo privado puede contener integraciones o configuraciones especificas no publicables.

## Decision Actual

Trabajar inicialmente como repo publico seguro, sin datos reales ni secretos. Si el proyecto crece o maneja informacion sensible compleja, evaluar separar una version privada de produccion.
