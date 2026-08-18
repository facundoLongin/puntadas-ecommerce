# Instrucciones Para Cody

Este archivo contiene instrucciones permanentes para trabajar en este proyecto.

## Contexto Inicial

Antes de implementar cambios importantes, leer:

- `docs/PROJECT.md`
- `docs/REQUIREMENTS.md`
- `docs/ARCHITECTURE.md`
- `docs/TASKS.md`
- `docs/DECISIONS.md`
- `docs/PRIVACY.md`
- `docs/PORTFOLIO.md`
- `docs/ASSETS.md`

## Forma De Trabajo

- Mantener la documentacion actualizada cuando cambien requisitos, arquitectura, decisiones o tareas.
- Priorizar una experiencia simple, clara y mobile-first.
- Preferir cambios pequenos y verificables.
- No hacer refactors grandes sin una razon clara.
- Registrar decisiones tecnicas importantes en `docs/DECISIONS.md`.
- Registrar avance y pendientes en `docs/TASKS.md`.
- Si hay dudas de negocio, documentar el supuesto antes de implementar.

## Seguridad Y Privacidad

- Asumir que el repositorio puede ser publico.
- Nunca agregar al repositorio datos reales del negocio o de sus usuarios.
- Nunca agregar secretos, tokens, credenciales, passwords, claves API, archivos `.env` reales, backups, exports o logs con datos sensibles.
- Usar datos demo/ficticios para ejemplos, semillas, capturas y documentacion publica.
- Mantener `.env.example` sin valores reales.
- Registrar assets publicos en `docs/ASSETS.md`, incluyendo origen y notas de uso.
- Antes de preparar cambios para GitHub, revisar `docs/PRIVACY.md` y completar el checklist de publicacion.
- Si una tarea pide manejar informacion real del negocio, guardar esa informacion fuera del repositorio y documentar solo la estructura o el comportamiento necesario.
- Si aparece informacion sensible en archivos del proyecto, avisar y corregir antes de continuar con publicacion o deploy.

## Objetivo Del Contexto

El proyecto debe poder retomarse leyendo pocos archivos. La documentacion debe explicar que existe, por que existe, como funciona y que falta.
