# Privacidad Y Seguridad

Este proyecto esta pensado para poder mostrarse como portfolio publico sin exponer informacion real del negocio ni de sus usuarios.

## Regla Principal

El repositorio publico muestra el sistema, no los datos reales del negocio.

## No Publicar Nunca

- Archivos `.env` reales.
- API keys, tokens, passwords o credenciales.
- URLs privadas con credenciales embebidas.
- Backups de base de datos.
- Exports de clientes, turnos, pedidos, pagos o conversaciones.
- Logs con datos personales.
- Nombres reales de clientes.
- Telefonos reales.
- Emails reales.
- Direcciones reales.
- Facturacion o informacion financiera real.
- Conversaciones reales de WhatsApp, Instagram, email u otros canales.
- Fotos privadas del negocio, empleados o clientes sin permiso explicito.
- Identificadores internos que permitan vincular datos con personas reales.

## Permitido En El Repo Publico

- Codigo fuente.
- Documentacion tecnica.
- README profesional.
- Arquitectura.
- Tests.
- Datos demo inventados.
- Capturas con datos ficticios.
- `.env.example` con placeholders.
- Scripts de desarrollo que no contengan secretos.

## Cuentas En Memoria

Durante desarrollo, el backend puede mantener usuarios y sesiones en memoria.
Estos datos se pierden al detener el servidor y no deben exportarse, commitearse ni usarse en capturas publicas si contienen informacion real.
Para demos de portfolio, crear cuentas con datos ficticios.

## Donde Viven Los Datos Reales

Los datos reales deben vivir fuera del repositorio:

- Base de datos privada.
- Base D1 privada configurada en Cloudflare, cuando se implemente persistencia real.
- Storage privado para archivos o imagenes.
- Variables de entorno configuradas en la plataforma de deploy.
- Backups privados.
- Herramientas administrativas protegidas por login y permisos.

## Checklist Antes De Subir A GitHub

- [ ] `.env` esta en `.gitignore`.
- [ ] No hay archivos `.env` reales trackeados.
- [ ] `.env.example` solo contiene placeholders.
- [ ] No hay claves API, tokens, passwords ni credenciales.
- [ ] No hay datos reales de clientes, empleadas, proveedoras o administradoras.
- [ ] No hay telefonos, emails, direcciones ni redes privadas reales.
- [ ] No hay backups, exports ni dumps de base de datos.
- [ ] No hay logs con informacion sensible.
- [ ] Los datos de seed/demo son ficticios.
- [ ] Las capturas o imagenes publicas usan datos ficticios o tienen permiso.
- [ ] El README aclara que los datos reales no forman parte del repositorio.
- [ ] El backend valida permisos y roles para informacion privada.
- [ ] El frontend no contiene secretos ni reglas de seguridad criticas como unica barrera.
- [ ] Variables y secretos de Cloudflare estan configurados en Cloudflare, no en archivos commiteados.
- [ ] `backend/wrangler.toml` no contiene tokens, ids privados sensibles ni credenciales reales.

## Si Se Filtra Informacion Sensible

Si por error aparece informacion sensible en el repositorio:

1. Detener publicacion o deploy.
2. Eliminar el dato del codigo actual.
3. Revocar y rotar cualquier secreto expuesto.
4. Revisar historial Git si el dato llego a commitearse.
5. Documentar la correccion en `docs/DECISIONS.md` si afecta al proyecto.
