# Decisiones

Este archivo registra decisiones importantes del proyecto y su razon.

## Formato

```text
Fecha:
Decision:
Contexto:
Alternativas consideradas:
Razon:
Consecuencias:
```

## Decisiones Registradas

### 2026-08-11 - Crear documentacion base del proyecto

Decision: mantener contexto del proyecto en archivos dentro del repo.

Contexto: el proyecto necesita poder retomarse sin repetir requisitos ni gastar tokens reconstruyendo conversaciones anteriores.

Razon: centralizar la informacion en archivos permite que Cody lea el estado del proyecto rapidamente.

Consecuencias: la documentacion debe actualizarse cuando cambien requisitos, arquitectura, roadmap o tareas.

### 2026-08-11 - Preparar el proyecto como repo publico seguro

Decision: construir el proyecto con mentalidad de repositorio publico de portfolio, manteniendo datos reales, secretos y configuraciones privadas fuera del repo.

Contexto: el proyecto sera usado por un negocio real y tambien se quiere mostrar como parte del CV/portfolio.

Alternativas consideradas: repo publico completo, repo privado completo, repo publico de portfolio separado de un repo privado de produccion.

Razon: un repo publico aporta valor profesional si muestra codigo, arquitectura y decisiones, pero la informacion real del negocio debe vivir en servicios privados y protegidos.

Consecuencias: todo ejemplo, seed, captura o documento publico debe usar datos ficticios. Antes de subir a GitHub se debe revisar `docs/PRIVACY.md`.

### 2026-08-18 - Separar backend y frontend con arquitectura por capas

Decision: organizar el proyecto como monorepo con `backend/` y `frontend/`.

Contexto: el proyecto debe ser mantenible, claro para portfolio y preparado para crecer sin mezclar UI, reglas de negocio y persistencia.

Alternativas consideradas: frontend unico con API interna, backend y frontend separados, aplicacion estatica con datos locales.

Razon: separar backend y frontend permite mostrar una arquitectura mas profesional, controlar mejor reglas y permisos, y evitar acoplamiento innecesario.

Consecuencias: el backend tendra capas de dominio, aplicacion, infraestructura e interfaces HTTP. El frontend tendra componentes reutilizables y logica de filtros separada de la vista.

### 2026-08-18 - Estetica inicial de Puntadas

Decision: usar fondo blanco, botones beige y detalles sutiles verde oliva/militar.

Contexto: las referencias visuales apuntan a deco home/e-commerce limpio, con header completo, buscador y filtros laterales.

Razon: esta paleta da una sensacion calida y sobria, compatible con textiles y hogar.

Consecuencias: el diseno no debe volverse monocromatico ni recargado. El verde oliva se usara solo como acento.

### 2026-08-18 - Primer corte con datos demo y componentes reutilizables

Decision: implementar el primer corte con productos demo ficticios, filtros locales reutilizables y backend preparado para futura persistencia real.

Contexto: se necesita avanzar con una version visible sin exponer informacion real ni bloquear el diseno por decisiones pendientes de compra/carrito/admin.

Razon: permite validar experiencia, estructura y estetica con bajo riesgo, manteniendo la arquitectura lista para crecer.

Consecuencias: frontend y backend tienen datos demo iniciales. Cuando se conecte persistencia real, se debe evitar duplicar reglas y consolidar contratos si aparece logica compartida relevante.

### 2026-08-19 - Carrito demo con precio por medida

Decision: usar carrito demo en frontend como accion principal inicial y modelar precios por medida mediante variantes ficticias.

Contexto: el negocio pidio que antes de agregar un producto al carrito se elija la medida y que el precio cambie segun esa seleccion.

Alternativas consideradas: boton de compra directo, consulta por WhatsApp sin carrito, carrito completo con checkout real.

Razon: el carrito demo permite validar la experiencia principal sin manejar pedidos reales, clientes ni pagos. Las variantes por medida preparan el modelo para reglas de precio mas reales en una etapa posterior.

Consecuencias: los productos demo incluyen `measureVariants`. El estado del carrito vive en el navegador y no debe considerarse persistencia real de pedidos.

### 2026-08-19 - Acceso para flujos de carrito

Decision: permitir navegacion publica sin cuenta, pero requerir una sesion para agregar productos al carrito o avanzar con compra.

Contexto: el negocio quiere que cualquier persona pueda revisar la pagina, pero que las acciones de compra queden asociadas a una cuenta.

Alternativas consideradas: permitir carrito anonimo, bloquear toda la navegacion, implementar autenticacion real completa.

Razon: la sesion valida el flujo y la experiencia sin bloquear la navegacion publica.

Consecuencias: el frontend incluye `features/auth` y paginas `/ingresar` y `/registro`. En produccion se debera usar persistencia real y politicas de seguridad completas.

### 2026-08-19 - Acceso visible en header

Decision: mostrar botones visibles de ingresar y registrarse en el header cuando no hay sesion, y mostrar el nombre del usuario cuando la sesion esta activa.

Contexto: el icono de perfil podia no ser evidente para personas nuevas que quieren registrarse o ingresar.

Razon: las acciones visibles reducen friccion y hacen mas claro que se necesita una cuenta para comprar.

Consecuencias: el header ocupa mas espacio, por lo que sus controles deben mantenerse compactos y adaptables en mobile.

### 2026-08-19 - Usuarios en memoria para desarrollo

Decision: reemplazar la cuenta demo local por usuarios y sesiones en memoria del backend.

Contexto: se necesita crear una cuenta, cerrar sesion y volver a ingresar con la misma cuenta mientras el programa siga levantado.

Alternativas consideradas: mantener usuario demo fijo en frontend, guardar usuarios en `localStorage`, conectar una base de datos real.

Razon: memoria backend respeta mejor la arquitectura por capas, evita persistencia accidental de datos personales en el repo y permite validar un flujo cercano al real.

Consecuencias: al detener el backend se pierden usuarios y sesiones. El frontend guarda solo un token de sesion local para recuperar la sesion mientras el backend siga activo.

### 2026-08-19 - Errores de validacion explicitos

Decision: normalizar errores de validacion con campo, etiqueta, mensaje y ayuda para corregirlos.

Contexto: el mensaje generico "Parametros invalidos" no alcanza para que una persona sepa que dato corregir al registrarse o ingresar.

Razon: los formularios de cuenta necesitan feedback accionable por campo para reducir friccion y evitar prueba/error.

Consecuencias: el middleware de errores transforma errores de Zod en detalles consumibles por el frontend. El frontend muestra esos detalles en el formulario.

### 2026-08-19 - Base de tests y auditoria de calidad

Decision: agregar tests automatizados con `node:test` y una auditoria local de SEO/accesibilidad basica.

Contexto: el proyecto apunta a desplegarse con cuentas, compras y datos sensibles, por lo que necesita verificacion repetible antes de seguir creciendo.

Alternativas consideradas: no agregar tests todavia, usar un framework mas grande, o empezar con tests nativos y checks livianos.

Razon: `node:test` reduce dependencias y permite cubrir reglas criticas ya. La auditoria local suma una barrera temprana para SEO y accesibilidad sin incorporar todavia Playwright.

Consecuencias: se agregan scripts `npm test` y `npm run test:quality`. En una etapa posterior conviene sumar tests end-to-end con navegador real y auditoria de accesibilidad mas profunda.
